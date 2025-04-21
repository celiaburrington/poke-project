import { LRUCache } from 'lru-cache';
import SpeciesAPIResponse, {
  EvolutionAPIResponse,
  GenerationAPIResponse,
  PokemonAPIResponse,
  TypesAPIResponse,
} from '../types/api.types';

function createTypedCache<T extends object>() {
  return new LRUCache<string, T>({
    max: 100,
    ttl: 1000 * 60 * 60,
  });
}

const pokemonCache = createTypedCache<PokemonAPIResponse>();
const speciesCache = createTypedCache<SpeciesAPIResponse>();
const generationCache = createTypedCache<GenerationAPIResponse>();
const evolutionCache = createTypedCache<EvolutionAPIResponse>();
const typesCache = createTypedCache<TypesAPIResponse>();

export { pokemonCache, speciesCache, generationCache, evolutionCache, typesCache };
