import mongoose from 'mongoose';
import UserModel from './models/user.model';
import { User, UserRole } from './types/user.types';
import { Encounter } from './types/encounter.types';
import { Pokemon } from './types/pokemon.types';
import PokemonModel from './models/pokemon.model';
import ENCOUNTER_LISTS from './data/encounterLists';
import LOCATIONS from './data/locations';
import { Location, LocationName } from './types/location.types';
import LocationModel from './models/location.model';
import EncounterModel from './models/encounter.model';

// Pass URL of mongoDB instance as first argument(e.g., mongodb://127.0.0.1:27017/poke_project)
const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

type PokedexAPIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

/**
 * Fetch all Pokémon species available from PokéAPI.
 *
 * @returns A Promise that resolves to a list of fetched pokemon.
 * @throws An error if unable to fetch from PokéAPI.
 */
async function fetchAPIPokedex(): Promise<Pokemon[]> {
  const results = [];
  let url: string | null = 'https://pokeapi.co/api/v2/pokemon-species/';

  while (url != null) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching from PokéAPI');
    }

    const json: PokedexAPIResponse = await response.json();
    results.push(...json.results);
    url = json.next;
  }

  // converts the API results in to a list of Pokemon
  const pokemonList = results.map(elt => {
    const splitUrl = elt.url.split('/').filter(str => str !== '');
    return {
      api_id: parseInt(splitUrl[splitUrl.length - 1], 10),
      name: elt.name,
    };
  });

  return pokemonList;
}

/**
 * Creates a new Pokemon document in the database.
 *
 * @param api_id
 * @param name
 *
 * @returns A Promise that resolves to the created Pokemon document.
 * @throws An error if any of the parameters are invalid.
 */
async function pokemonCreate(api_id: number, name: string): Promise<Pokemon> {
  if (api_id <= 0 || name === '') throw new Error('Invalid Pokemon');
  const pokemonDetail: Pokemon = {
    api_id,
    name,
  };
  return await PokemonModel.create(pokemonDetail);
}

/**
 * Creates a new Pokemon for every Pokémon available from PokéAPI.
 *
 * @returns A Promise that resolves to the created Pokemon document.
 * @throws An error if unable to fetch from PokéAPI or if an error occurs while adding Pokemon.
 */
async function addPokedex(): Promise<Pokemon[]> {
  const toAdd = await fetchAPIPokedex();

  const createPokemon = toAdd.map((pokemon: Pokemon) =>
    pokemonCreate(pokemon.api_id, pokemon.name),
  );
  const results = await Promise.all(createPokemon);

  return results;
}

/**
 * Creates a new Location document in the database.
 *
 * @param name
 * @param description
 * @param encounter_list
 *
 * @returns A Promise that resolves to the created Location document.
 * @throws An error if any of the parameters are invalid.
 */
async function locationCreate(
  name: LocationName,
  description: string,
  encounter_list: Pokemon[],
): Promise<Location> {
  if (name === null || description === '') throw new Error('Invalid Location Format');
  const locationDetail: Location = {
    name,
    description,
    encounter_list,
  };
  return await LocationModel.create(locationDetail);
}

/**
 * Creates a new Encounter document in the database.
 *
 * @param user
 * @param pokemon
 * @param location
 * @param encountered_at
 *
 * @returns A Promise that resolves to the created Encounter document.
 * @throws An error if any of the parameters are invalid.
 */
async function encounterCreate(
  user: User,
  pokemon: Pokemon,
  location: Location,
  encountered_at: Date = new Date(),
): Promise<Encounter> {
  if (
    pokemon === null ||
    pokemon === undefined ||
    location === null ||
    location === undefined ||
    user === null ||
    user === undefined
  )
    throw new Error('Invalid Encounter Format');
  const encounterDetail: Encounter = {
    user,
    pokemon,
    location,
    encountered_at,
  };
  return await EncounterModel.create(encounterDetail);
}

/**
 * Creates a new User document in the database.
 *
 * @param username
 * @param password
 * @param role
 * @param first_name
 * @param last_name
 * @param email
 * @param bio
 *
 * @returns A Promise that resolves to the created User document.
 * @throws An error if any of the parameters are invalid.
 */
async function userCreate(
  username: string,
  password: string,
  role: UserRole,
  first_name?: string,
  last_name?: string,
  email?: string,
  bio?: string,
): Promise<User> {
  if (username === '' || password === '') throw new Error('Invalid User Format');
  const userDetail: User = {
    username,
    password,
    role,
    date_joined: new Date(),
    first_name,
    last_name,
    email,
    bio,
  };
  return await UserModel.create(userDetail);
}

/**
 * Populates the database with mock data. Logs errors to the console.
 */
const populate = async () => {
  try {
    // Add all Pokémon from PokéAPI.
    const pokedex = await addPokedex();

    // Populate Location encounter lists.
    const populateEncounterList = (encounterList: number[]): Pokemon[] => {
      const populatedList = encounterList.map(id => {
        const p = pokedex.find((pokemon: Pokemon) => pokemon.api_id === id);
        if (!p) {
          throw new Error(`Undefined pokémon ID: ${id}`);
        }
        return p;
      });

      return populatedList;
    };

    const populatedEncounterLists = ENCOUNTER_LISTS.map(list => populateEncounterList(list));
    // Create the Locations in the db using the populated encounter lists.
    const promiseLocs = LOCATIONS.map((loc, i) =>
      locationCreate(loc.name, loc.description, populatedEncounterLists[i]),
    );
    const locations = await Promise.all(promiseLocs);

    // Create Users
    const U1 = await userCreate(
      'admin',
      'password',
      UserRole.Admin,
      'Admin',
      'Account',
      'admin@account.mail',
      'Admin account with full feature access for all the fun.',
    );
    const U2 = await userCreate('pixelmon', 'qwerty123', UserRole.NewUser);
    const U3 = await userCreate('iron_man', 'stark123', UserRole.NewUser);

    // Create Encounters
    const E1 = await encounterCreate(U2, pokedex[1], locations[0], new Date('2025-03-20T14:30:00'));
    const E2 = await encounterCreate(U2, pokedex[11], locations[1]);
    const E3 = await encounterCreate(U2, pokedex[574], locations[2]);
    const E4 = await encounterCreate(U1, pokedex[708], locations[3]);
    const E5 = await encounterCreate(U1, pokedex[286], locations[4]);
    const E6 = await encounterCreate(
      U1,
      pokedex[65],
      locations[5],
      new Date('2025-01-01T01:01:00'),
    );
    const E7 = await encounterCreate(
      U1,
      pokedex[109],
      locations[6],
      new Date('2025-03-02T10:16:00'),
    );
    const E8 = await encounterCreate(U1, pokedex[81], locations[7]);
    const E9 = await encounterCreate(
      U1,
      pokedex[428],
      locations[8],
      new Date('2025-02-20T14:34:00'),
    );
    const E10 = await encounterCreate(U1, pokedex[334], locations[9]);
    const E11 = await encounterCreate(
      U1,
      pokedex[416],
      locations[10],
      new Date('2024-12-20T14:30:00'),
    );
    const E12 = await encounterCreate(
      U1,
      pokedex[157],
      locations[11],
      new Date('2024-11-16T06:45:00'),
    );
    const E13 = await encounterCreate(U1, pokedex[705], locations[12]);
    const E14 = await encounterCreate(U1, pokedex[78], locations[13]);
    const E15 = await encounterCreate(
      U1,
      pokedex[687],
      locations[14],
      new Date('2025-03-06T21:06:00'),
    );
    const E16 = await encounterCreate(U1, pokedex[254], locations[15]);
    const E17 = await encounterCreate(U1, pokedex[349], locations[16]);
    const E18 = await encounterCreate(U1, pokedex[224], locations[17]);
    const E19 = await encounterCreate(U1, pokedex[447], locations[18]);
    const E20 = await encounterCreate(U1, pokedex[146], locations[19]);
    const E21 = await encounterCreate(
      U1,
      pokedex[467],
      locations[20],
      new Date('2025-02-14T19:52:00'),
    );
    const E22 = await encounterCreate(U1, pokedex[634], locations[21]);
    const E23 = await encounterCreate(
      U1,
      pokedex[306],
      locations[22],
      new Date('2025-03-06T16:10:00'),
    );
    const E24 = await encounterCreate(
      U1,
      pokedex[168],
      locations[23],
      new Date('2025-03-06T07:49:00'),
    );
    const E25 = await encounterCreate(U1, pokedex[613], locations[24]);
    const E26 = await encounterCreate(U1, pokedex[329], locations[25]);
    const E27 = await encounterCreate(U1, pokedex[36], locations[26]);
    const EL1 = await encounterCreate(
      U1,
      pokedex[149],
      locations[8],
      new Date('2025-03-10T12:00:00'),
    );
    const EL2 = await encounterCreate(
      U1,
      pokedex[381],
      locations[16],
      new Date('2024-09-06T00:10:00'),
    );
    const EM1 = await encounterCreate(
      U1,
      pokedex[489],
      locations[13],
      new Date('2025-01-25T17:18:00'),
    );
    const EM2 = await encounterCreate(
      U1,
      pokedex[150],
      locations[2],
      new Date('2025-03-19T04:04:00'),
    );

    console.log('Database populated');
  } catch (err) {
    console.log('ERROR: ' + err);
  } finally {
    if (db) db.close();
    console.log('done');
  }
};

populate();

console.log('Processing ...');
