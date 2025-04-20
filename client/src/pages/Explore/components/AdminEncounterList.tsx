import { Row } from "react-bootstrap";
import { Pokemon } from "../../../types/pokemon.types";
import EncounterCard from "./EncounterCard";

export default function AdminEncounterList({
  pokemon,
}: {
  pokemon: Pokemon[];
}) {
  return (
    <>
      <br />
      <br />
      <Row xs={1} md={5} className="g-3">
        {pokemon.map((p) => (
          <EncounterCard key={p.api_id} pokemon={p} />
        ))}
      </Row>
    </>
  );
}
