import { LRUCache } from 'lru-cache';
import { distance } from 'fastest-levenshtein';
import PokemonModel from '../models/pokemon.model';
import SpeciesAPIResponse, {
  EvolutionAPIResponse,
  EvolutionChainAPIResponse,
  GenerationAPIResponse,
  PokemonAPIResponse,
  TypesAPIResponse,
} from '../types/api.types';
import { EvolutionChain, PokedexOrder, Pokemon, PokemonDetails } from '../types/pokemon.types';
import {
  evolutionCache,
  generationCache,
  pokemonCache,
  speciesCache,
  typesCache,
} from '../utils/cache';

const SPECIES_ALTS = [
  'deoxys-normal',
  'wormadam-plant',
  'giratina-altered',
  'shaymin-land',
  'basculin-red-striped',
  'darmanitan-standard',
  'tornadus-incarnate',
  'thundurus-incarnate',
  'landorus-incarnate',
  'keldeo-ordinary',
  'meloetta-aria',
  'meowstic-male',
  'aegislash-shield',
  'pumpkaboo-average',
  'gourgeist-average',
  'zygarde-50',
  'oricorio-baile',
  'lycanroc-midday',
  'wishiwashi-solo',
  'minior-red-meteor',
  'mimikyu-disguised',
  'toxtricity-amped',
  'eiscue-ice',
  'indeedee-male',
  'morpeko-full-belly',
  'urshifu-single-strike',
  'basculegion-male',
  'enamorus-incarnate',
  'oinkologne-male',
  'maushold-family-of-four',
  'squawkabilly-green-plumage',
  'palafin-zero',
  'tatsugiri-curly',
  'dudunsparce-two-segment',
];

const getEvolutionLine = (chain: EvolutionChainAPIResponse) => {
  const splitUrl = chain.species.url.split('/').filter(str => str !== '');
  const entry: EvolutionChain = {
    name: chain.species.name,
    api_id: parseInt(splitUrl[splitUrl.length - 1], 10),
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitUrl[splitUrl.length - 1]}.png`,
    evolves_to: chain.evolves_to.map(link => getEvolutionLine(link)),
  };
  return entry;
};

const getDataFromAPI = async <T extends object>(
  key: string,
  cache: LRUCache<string, T>,
  url: string,
): Promise<T | { error: string }> => {
  const cachedPokemon = cache.get(key);
  if (cachedPokemon) {
    // eslint-disable-next-line no-console
    console.log(`cache entry found with key ${key}`);
    return cachedPokemon;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();
    cache.set(key, data);
    // eslint-disable-next-line no-console
    console.log(`cache entry created with key ${key}, data from ${url}`);
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const getPokemonDetails = async (
  api_id: string,
): Promise<PokemonDetails | { error: string }> => {
  try {
    const pokemon = await PokemonModel.findOne({ api_id });

    if (!pokemon) {
      throw Error();
    }

    const pokemonResponse = (await getDataFromAPI(
      api_id,
      pokemonCache,
      `https://pokeapi.co/api/v2/pokemon/${api_id}`,
    )) as PokemonAPIResponse | { error: string };

    if ('error' in pokemonResponse) {
      throw Error();
    }

    const speciesResponse = (await getDataFromAPI(
      api_id,
      speciesCache,
      pokemonResponse.species.url,
    )) as SpeciesAPIResponse | { error: string };

    if ('error' in speciesResponse) {
      throw Error();
    }

    const evolutionPromise = getDataFromAPI(
      api_id,
      evolutionCache,
      speciesResponse.evolution_chain.url,
    );

    const generationPromise = getDataFromAPI(
      api_id,
      generationCache,
      speciesResponse.generation.url,
    );

    const promises = [evolutionPromise, generationPromise];
    const results = await Promise.all(promises);

    const evolutionResponse = results[0] as EvolutionAPIResponse | { error: string };
    const generationResponse = results[1] as GenerationAPIResponse | { error: string };

    if ('error' in evolutionResponse || 'error' in generationResponse) {
      throw Error();
    }

    const details: PokemonDetails = {
      _id: pokemon._id,
      api_id: pokemon.api_id,
      name: pokemon.name,
      formatedName: speciesResponse.names.find(e => e.language.name === 'en')?.name || '',
      sprites: {
        default: pokemonResponse.sprites.front_default,
        shiny: pokemonResponse.sprites.front_shiny,
        official: pokemonResponse.sprites.other['official-artwork'].front_default,
      },
      stats: pokemonResponse.stats.map(stat => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      })),
      types: pokemonResponse.types.map(type => {
        const splitUrl = type.type.url.split('/').filter(str => str !== '');
        return {
          slot: type.slot,
          name: type.type.name,
          api_id: parseInt(splitUrl[splitUrl.length - 1], 10),
        };
      }),
      evolution_chain: getEvolutionLine(evolutionResponse.chain),
      flavor_text_entries: speciesResponse.flavor_text_entries
        .filter(entry => entry.language.name === 'en')
        .map(entry => ({
          flavor_text: entry.flavor_text,
          version: entry.version.name,
        })),
      genus: speciesResponse.genera.find(g => g.language.name === 'en')?.genus || '',
      generation: generationResponse.names.find(g => g.language.name === 'en')?.name || '',
      is_legendary: speciesResponse.is_legendary,
      is_mythical: speciesResponse.is_mythical,
    };

    return details;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const getPokedex = async (): Promise<Pokemon[]> => {
  try {
    const allPokemon = await PokemonModel.find().sort({ api_id: 1 });

    if (!allPokemon) {
      return [];
    }

    return allPokemon;
  } catch (error) {
    return [];
  }
};

export const filterPokemonByName = (
  name: string,
  order: PokedexOrder,
  plist: Pokemon[],
): Pokemon[] => {
  const regex = new RegExp(name);
  if (order === 'bestMatch') {
    return plist
      .map(p => ({
        p,
        dist: p.name === name ? -1 : distance(p.name, name.toLowerCase()),
      }))
      .filter(p => regex.test(p.p.name) || p.dist <= 2)
      .sort((p1, p2) => p1.dist - p2.dist)
      .map(p => p.p);
  }

  return plist.filter(p => regex.test(p.name) || distance(p.name, name.toLowerCase()) <= 2);
};

export const filterPokemonByType = async (type: string, plist: Pokemon[]): Promise<Pokemon[]> => {
  try {
    const typeResponse = (await getDataFromAPI(
      type,
      typesCache,
      `https://pokeapi.co/api/v2/type/${type}`,
    )) as TypesAPIResponse | { error: string };

    if ('error' in typeResponse) {
      return plist;
    }

    const names = typeResponse.pokemon.map(entry => {
      if (SPECIES_ALTS.includes(entry.pokemon.name)) {
        return entry.pokemon.name.split('-')[0];
      }
      return entry.pokemon.name;
    });
    return plist.filter(p => names.includes(p.name));
  } catch (error) {
    return [];
  }
};

export const filterPokemonByGeneration = async (
  generation: string,
  plist: Pokemon[],
): Promise<Pokemon[]> => {
  try {
    const genResponse = (await getDataFromAPI(
      generation,
      typesCache,
      `https://pokeapi.co/api/v2/generation/${generation}`,
    )) as GenerationAPIResponse | { error: string };

    if ('error' in genResponse) {
      return plist;
    }

    const names = genResponse.pokemon_species.map(entry => entry.name);
    return plist.filter(p => names.includes(p.name));
  } catch (error) {
    return [];
  }
};
