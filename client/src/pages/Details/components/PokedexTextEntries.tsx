import { Card } from "react-bootstrap";
import { PokemonDetails } from "../../../types/pokemon.types";

export default function PokedexTextEntries({
  details,
}: {
  details: PokemonDetails;
}) {
  return (
    <Card>
      <Card.Header>Pokédex Entries</Card.Header>
      <dl className="row">
        {details.flavor_text_entries.map((e) => (
          <>
            <dt className="col-sm-2 mt-3 ms-3">{e.version}</dt>
            <dd className="col-sm-9 mt-3 mb-2">{e.flavor_text}</dd>
          </>
        ))}
      </dl>
    </Card>
  );
}
