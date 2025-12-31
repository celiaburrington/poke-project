import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Container,
  FormGroup,
  FormLabel,
  FormSelect,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Pokemon } from "../../types/pokemon.types";
import { Link, useLocation } from "react-router";
import getSpriteURL from "../../utils";

/**
 * Pokedex component displays Pokémon results from a User's search.
 */
export default function Pokedex({ pokemon }: { pokemon: Pokemon[] }) {
  const location = useLocation();
  const [disableNext, setDisableNext] = useState<boolean>(false);
  const [disablePrev, setDisablePrev] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [monsPerPage, setMonsPerPage] = useState<number>(20);
  const [mons, setMons] = useState<Pokemon[]>([]);

  /**
   * Function to handle advancing to the next page of results.
   */
  const nextPage = () => {
    if (!disableNext) {
      const newOffset = offset + monsPerPage;
      setOffset(newOffset);
      // window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /**
   * Function to handle returning to the previous page of results.
   */
  const previousPage = () => {
    if (!disablePrev) {
      const newOffset = offset - monsPerPage;
      setOffset(newOffset);
      // window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /**
   * Function to handle a change in the number of Pokémon to display per page.
   */
  const setPageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);

    if (isNaN(newSize)) {
      return;
    }

    setMonsPerPage(newSize);
  };

  useEffect(() => {
    const newMons = pokemon.slice(offset, offset + monsPerPage);
    setMons(newMons);

    setDisableNext(offset + monsPerPage >= pokemon.length);
    setDisablePrev(offset === 0);
  }, [pokemon, offset, monsPerPage]);

  return (
    <Container id="pp-pokedex">
      <FormGroup>
        <FormLabel>Pokémon Per Page</FormLabel>
        <FormSelect className="w-50" defaultValue="20" onChange={setPageSize}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </FormSelect>
      </FormGroup>
      <br />
      <ListGroup>
        {mons.map((entry) => (
          <ListGroupItem
            as={Link}
            to={`/Details/${entry.api_id}`}
            state={{ from: location }}
            key={entry.api_id}
            className="d-flex align-items-center justify-content-between bg-light"
          >
            <div className="d-flex flex-column ms-5">
              <span className="text-capitalize fw-bold">{entry.name}</span>
              <span className="">#{entry.api_id}</span>
            </div>
            <div>
              <img
                className="me-5"
                src={getSpriteURL(entry.api_id)}
                alt={entry.name}
              />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <br />
      <Button
        className="btn-primary float-start"
        onClick={previousPage}
        disabled={disablePrev}
      >
        Previous
      </Button>
      <Button
        className="btn-primary float-end"
        onClick={nextPage}
        disabled={disableNext}
      >
        Next
      </Button>
      <br />
      <br />
    </Container>
  );
}
