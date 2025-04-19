import { Button, Container, Row } from "react-bootstrap";
import { Location } from "../../types/location.types";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedRedux";
import { UserRole } from "../../types/user.types";
import EncounterCard from "./components/EncounterCard";

export default function LocationPage({
  location,
  goExplore,
}: {
  location: Location;
  goExplore: () => void;
}) {
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const isAdmin = currentUser?.role === UserRole.Admin;

  /**
   * Function to return the URL for a Pokémon's sprite image base on the Pokémon's API ID.
   *
   * @param api_id pokémon id
   * @param shiny shiny sprite?
   * @returns The sprite URL
   */
  const getSpriteURL = (api_id: number, shiny = false) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
      shiny ? "/shiny" : ""
    }/${api_id}.png`;
    // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${api_id}.png`;
  };

  return (
    <Container>
      <Button className="btn-primary" onClick={() => goExplore()}>
        Keep Exploring <FaLocationArrow />
      </Button>
      <h3 className="mt-2">{location.name}</h3>
      {location.description}
      <hr />
      <EncounterCard
        sprite="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/0.png"
        key={0}
      />
      <br />
      <Link to="/Home">
        <Button className="btn-danger">Return Home</Button>
      </Link>
      {/* TODO: Export to AdminEncounterList component */}
      {isAdmin && (
        <>
          <br />
          <br />
          <Row xs={1} md={5} className="g-3">
            {location.encounter_list.map((p) => (
              <EncounterCard
                key={p.api_id}
                sprite={getSpriteURL(p.api_id)}
                pokemon={p}
              />
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}
