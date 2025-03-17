import { ChangeEvent, useState } from "react";
import {
  Button,
  Container,
  FormGroup,
  FormLabel,
  FormSelect,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

/**
 * Pokedex component displays Pokémon results from a User's search.
 */
export default function Pokedex() {
  // TODO: Retrieve this from database
  const DEX_TOTAL = 1025;
  const dexIDs = new Array(DEX_TOTAL).fill(0).map((_x, idx) => {
    return {
      id: idx + 1,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        idx + 1
      }.png`,
    };
  });

  const [disableNext, setDisableNext] = useState<boolean>(false);
  const [disablePrev, setDisablePrev] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [monsPerPage, setMonsPerPage] = useState<number>(20);
  const [mons, setMons] = useState(dexIDs.slice(offset, monsPerPage));

  /**
   * Sets the Next button's disable value based on the given offset and 'mons per page values
   *
   * @param newOffset offset to use for check
   * @param newMonsPerPage Pokémon per page count to use for check
   * @returns void
   */
  const checkDisableNext = (newOffset: number, newMonsPerPage: number) => {
    if (newOffset <= DEX_TOTAL - newMonsPerPage) {
      setDisableNext(false);
      return;
    }
    setDisableNext(true);
  };

  /**
   * Sets the Previous button's disable value based on the given offset and 'mons per page values
   *
   * @param newOffset offset to use for check
   * @param newMonsPerPage Pokémon per page count to use for check
   * @returns void
   */
  const checkDisablePrev = (newOffset: number, newMonsPerPage: number) => {
    if (newOffset >= newMonsPerPage) {
      setDisablePrev(false);
      return;
    }
    setDisablePrev(true);
  };

  /**
   * Function to handle advancing to the next page of results.
   */
  const nextPage = () => {
    if (!disableNext) {
      const newOffset = offset + monsPerPage;
      setOffset(newOffset);
      setMons(dexIDs.slice(newOffset, newOffset + monsPerPage));
      checkDisableNext(newOffset, monsPerPage);
      checkDisablePrev(newOffset, monsPerPage);
    }
  };

  /**
   * Function to handle returning to the previous page of results.
   */
  const previousPage = () => {
    if (!disablePrev) {
      const newOffset = offset - monsPerPage;
      setOffset(newOffset);
      setMons(dexIDs.slice(newOffset, newOffset + monsPerPage));
      checkDisableNext(newOffset, monsPerPage);
      checkDisablePrev(newOffset, monsPerPage);
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
    setMons(dexIDs.slice(offset, offset + newSize));
    checkDisableNext(offset, newSize);
    checkDisablePrev(offset, newSize);
  };

  return (
    <Container id="pp-pokedex">
      <FormGroup>
        <FormLabel>Pokémon Per Page</FormLabel>
        <FormSelect defaultValue="20" onChange={setPageSize}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </FormSelect>
      </FormGroup>
      <br />
      <ListGroup>
        {mons.map((entry, i) => (
          <ListGroupItem key={i}>
            {entry.id}
            <img src={entry.sprite}></img>
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
    </Container>
  );
}
