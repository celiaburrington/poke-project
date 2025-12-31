/**
 * Function to return the URL for a Pokémon's sprite image base on the Pokémon's API ID.
 *
 * @param api_id pokémon id
 * @param shiny shiny sprite?
 * @returns The sprite URL
 */
export default function getSpriteURL(api_id: number, shiny = false) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
    shiny ? "/shiny" : ""
  }/${api_id}.png`;
}
