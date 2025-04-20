import { Row } from "react-bootstrap";
import { Pokemon } from "../../../types/pokemon.types";
import EncounterCard from "./EncounterCard";

export default function AdminEncounterList({
  getSprite,
  pokemon,
}: {
  getSprite: (api_id: number) => string;
  pokemon: Pokemon[];
}) {
  return (
    <>
      <br />
      <br />
      <Row xs={1} md={5} className="g-3">
        {pokemon.map((p) => (
          <EncounterCard
            key={p.api_id}
            sprite={getSprite(p.api_id)}
            pokemon={p}
          />
        ))}
      </Row>
    </>
  );
}
