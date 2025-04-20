import { LRUCache } from 'lru-cache';
import PokemonModel from '../models/pokemon.model';
import SpeciesAPIResponse, {
  EvolutionAPIResponse,
  EvolutionChainAPIResponse,
  GenerationAPIResponse,
  PokemonAPIResponse,
} from '../types/api.types';
import { EvolutionChain, PokemonDetails } from '../types/pokemon.types';
import { evolutionCache, generationCache, pokemonCache, speciesCache } from '../utils/cache';

export const getEvolutionLine = (chain: EvolutionChainAPIResponse) => {
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
