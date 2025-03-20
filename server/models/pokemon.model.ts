import mongoose, { Model } from 'mongoose';
import pokemonSchema from './schema/pokemon.schema';
import { Pokemon } from '../types/pokemon.types';

/**
 * Mongoose model for the `Pokemon` collection.
 *
 * @type {Model<Pokemon>}
 */
const PokemonModel: Model<Pokemon> = mongoose.model<Pokemon>('Pokemon', pokemonSchema);

export default PokemonModel;
