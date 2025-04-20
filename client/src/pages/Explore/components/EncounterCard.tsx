import { Card, Col } from "react-bootstrap";
import { Pokemon } from "../../../types/pokemon.types";
import { Link, useLocation } from "react-router";

/**
 * An EncounterCard component that displays a Pokémon's sprite and name.
 */
export default function EncounterCard({
  sprite,
  pokemon,
}: {
  sprite: string;
  pokemon?: Pokemon;
}) {
  const location = useLocation();

  if (pokemon) {
    return (
      <Col className="mb-2" style={{ width: "150px" }}>
        <Link
          to={{
            pathname: `/Details/${pokemon.api_id}`,
          }}
          state={{ from: location }}
        >
          <Card bg="light" border="dark">
            <Card.Img src={sprite} variant="top" width="100" />
            <Card.Text className="mb-2 text-center overflow-hidden text-uppercase text-bold">
              <small>
                <b>{pokemon.name}</b>
              </small>
            </Card.Text>
          </Card>
        </Link>
      </Col>
    );
  } else {
    return (
      <Col style={{ width: "150px" }}>
        <Card bg="light" border="dark">
          <Card.Img src={sprite} variant="top" width="100" />
        </Card>
      </Col>
    );
  }
}
