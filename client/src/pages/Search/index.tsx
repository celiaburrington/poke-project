import { Container, FormControl } from "react-bootstrap";
import Pokedex from "./Pokedex";

// !!!!!!!!!!!!!!!!!!! <Form inline> bootstrap navbar page

/**
 * Search page component allows Users to search for specific Pokémon.
 * A User can view the full Pokédex, and filter results (TBD).
 */
export default function Search() {
  return (
    <Container>
      <h3>
        <a href="#">Home</a> / Search for a Pokémon
      </h3>
      <hr />
      <FormControl
        type="text"
        placeholder="Search by name or dex number"
      ></FormControl>
      <hr />
      <Pokedex />
    </Container>
  );
}
