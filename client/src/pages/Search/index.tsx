import {
  Button,
  Card,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import Pokedex from "./Pokedex";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pokemon } from "../../types/pokemon.types";
import { search } from "../../services/pokemonService";

const TYPES = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

/**
 * Search page component allows Users to search for specific Pokémon.
 * A User can view the full Pokédex, and filter results (TBD).
 */
export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const nameParam = searchParams.get("name") ?? "";
  const typeParam = searchParams.get("type") ?? "";
  const generationParam = searchParams.get("generation") ?? "";
  const orderParam = searchParams.get("order") ?? "";

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [generation, setGeneration] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const results = await search(
          nameParam,
          typeParam,
          generationParam,
          orderParam
        );
        setPokemon(results);
      } catch (error) {
        console.log(error);
      }
    };

    getSearchResults();
  }, [generationParam, nameParam, orderParam, typeParam]);
  return (
    <Container>
      <h3>
        <a href="#">Home</a> / Search the Pokédex
      </h3>
      <hr />
      <Card bg="light">
        <Card.Body>
          <Form>
            <FormControl
              type="text"
              placeholder="Search by name"
              className="w-50"
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
            <FormSelect
              defaultValue=""
              onChange={(e) => setGeneration(e.target.value)}
              className="mb-2 mt-2 w-50"
            >
              <option value="">Filter by Generation</option>
              <option value="generation-i">Generation 1</option>
              <option value="generation-ii">Generation 2</option>
              <option value="generation-iii">Generation 3</option>
              <option value="generation-iv">Generation 4</option>
              <option value="generation-v">Generation 5</option>
              <option value="generation-vi">Generation 6</option>
              <option value="generation-vii">Generation 7</option>
              <option value="generation-viii">Generation 8</option>
              <option value="generation-ix">Generation 9</option>
            </FormSelect>
            <div className="row mt-2 mb-1">
              {TYPES.map((t, i) => (
                <div
                  className="col-3 col-md-2 d-flex justify-content-center mb-1"
                  key={i}
                >
                  <Button
                    className={`btn p-1 border-0 ${
                      type === t ? "btn-primary" : "bg-transparent"
                    }`}
                    onClick={() => setType(type === t ? "" : t)}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/legends-arceus/${
                        i + 1
                      }.png`}
                      alt={`icon-${i}`}
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              className="mt-2"
              onClick={() =>
                navigate(
                  `?${name ? `name=${encodeURIComponent(name)}` : ""}${
                    name && type ? "&" : ""
                  }${type ? `type=${type}` : ""}${
                    (name || type) && generation ? "&" : ""
                  }${generation ? `generation=${generation}` : ""}${
                    (name || type || generation) && order ? "&" : ""
                  }${order ? `order=${order}` : ""}`
                )
              }
            >
              Search
            </Button>
            <Button
              type="reset"
              className="mt-2 ms-2 btn-danger"
              onClick={() => {
                navigate("");
                setName("");
                setGeneration("");
                setType("");
                setOrder("");
              }}
            >
              Clear
            </Button>
            <FormCheck className="mt-2">
              <FormCheck.Input
                type="checkbox"
                checked={order === "bestMatch"}
                onChange={(e) => setOrder(e.target.checked ? "bestMatch" : "")}
              />
              <FormCheck.Label>Sort by best match</FormCheck.Label>
            </FormCheck>
          </Form>
        </Card.Body>
      </Card>
      <br />
      <Pokedex pokemon={pokemon} />
    </Container>
  );
}
