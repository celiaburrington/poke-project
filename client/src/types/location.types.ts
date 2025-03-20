import { Pokemon } from "./pokemon.types";

/**
 * LocationName enum enumerating all locations currently possible to travel to.
 */
export enum LocationName {
  // Forest
  Forest = "Forest",
  CalmClearing = "Calm Clearing",
  MysticGrove = "Mystic Grove",
  DeepDarkWoods = "Deep Dark Woods",
  Jungle = "Jungle",
  // Town
  Town = "Town",
  AbandonedPowerPlant = "Abandoned Power Plant",
  SolarPanelFarm = "Solar Panel Farm",
  StrangeRuins = "Strange Ruins",
  // Plains
  Meadow = "Meadow",
  FlowerField = "Flower Field",
  // Freshwater
  River = "River",
  Swamp = "Swamp",
  // Ocean
  Ocean = "Ocean",
  Beach = "Beach",
  Volcano = "Volcano",
  DeepSea = "Deep Sea",
  Glacier = "Glacier",
  // Mountains
  RockyMountain = "Rocky Mountain",
  SnowySummit = "Snowy Summit",
  BirdsEyeLookout = "Bird's Eye Lookout",
  // Cave
  LargeCave = "Large Cave",
  CraggyCanyon = "Craggy Canyon",
  AbandonedMine = "Abandoned Mine",
  FrozenCave = "Frozen Cave",
  // Desert
  Desert = "Desert",
  ScorchedSands = "Scorched Sands",
}

/**
 * Interface representing a Location document where Pokémon can be encountered.
 *
 * - `name`: The locations's name.
 * - `description`: A text description of the location.
 * - `encounter_list`: The Pokemon possible to encounter in the location.
 */
export interface Location {
  _id?: string;
  name: LocationName;
  description: string;
  encounter_list: Pokemon[];
}
