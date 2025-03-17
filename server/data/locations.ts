import { Location } from '../types/types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const locationNames: string[] = [
  // Forest
  'Forest',
  'Calm Clearing',
  'Mystic Grove',
  'Deep Dark Woods',
  'Jungle',
  // Town
  'Town',
  'Old Factory',
  'Abandoned Power Plant',
  'Solar Panel Farm',
  'Strange Ruins',
  // Plains
  'Meadow',
  'Flower Field',
  // Freshwater
  'River',
  'Swamp',
  // Ocean
  'Ocean',
  'Beach',
  'Volcano',
  'Deep Sea',
  'Glacier',
  // Mountains
  'Rocky Mountain',
  'Snowy Summit',
  "Bird's Eye Lookout",
  // Cave
  'Large Cave',
  'Craggy Canyon',
  'Abandoned Mine',
  'Frozen Cave',
  // Desert
  'Desert',
  'Oasis',
  'Desert Ruins',
  'Scorched Sands',
  'Red Dunes',
];

// Compute the location record using the index of each name as id to ensure unique ids.
const LOCATION_RECORD: Location[] = locationNames.map((name, index) => ({
  id: index,
  name,
}));

const locationMapper = (locationIndex: number): Location => {
  const location = LOCATION_RECORD.find((loc: Location) => loc.id === locationIndex);
  if (!location) {
    return {
      id: -1,
      name: '',
    };
  }
  return location;
};

const randomLocation = (): Location => {
  const maxID = locationNames.length - 1;
  const randomID = Math.floor(Math.random() * (maxID + 1));
  return locationMapper(randomID);
};

export { randomLocation, locationMapper, LOCATION_RECORD };
