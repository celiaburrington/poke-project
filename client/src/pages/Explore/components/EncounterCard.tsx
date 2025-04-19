import { Card, Col } from "react-bootstrap";
import { Pokemon } from "../../../types/pokemon.types";

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
  return (
    <Col style={{ width: "150px" }}>
      <Card bg="light" border="dark">
        <Card.Img src={sprite} variant="top" width="100" />
        {pokemon && (
          <Card.Text className="mb-2 text-center overflow-hidden">
            <small>
              #{pokemon.api_id} {pokemon.name}
            </small>
          </Card.Text>
        )}
      </Card>
    </Col>
  );
}
