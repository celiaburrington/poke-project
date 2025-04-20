import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { PokemonDetails } from "../../types/pokemon.types";
import { Encounter } from "../../types/encounter.types";
import EncounterLogText from "./components/EncounterLogText";
import EvolutionLine from "./components/EvolutionLine";
import PokedexTextEntries from "./components/PokedexTextEntries";
import { useAppSelector } from "../../hooks/useTypedRedux";
import { Link } from "react-router-dom";

export default function DetailsPage({
  details,
  encounters,
  userEncounters,
}: {
  details: PokemonDetails;
  encounters: Encounter[];
  userEncounters: Encounter[];
}) {
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  return (
    <div className="pp-details">
      <Row xs={1} md={3} className="g-2 mb-2">
        <Col style={{ width: "300px" }}>
          <Card>
            <Card.Img src={details.sprites.official} variant="top" />
          </Card>
        </Col>
        <Col>
          <Card style={{ height: "292px" }}>
            <Card.Header>National Dex #{details.api_id}</Card.Header>
            <Card.Body>
              {details.genus}
              <br />
              <br />
              {details.generation}
              <br />
              <br />
              {details.types.map((type) => (
                <>
                  <img
                    className="me-1"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-iii/emerald/${type.api_id}.png`}
                    width={50}
                  />
                </>
              ))}
              <br />
              <br />
              <Card border="danger">
                {currentUser && (
                  <Card.Body>
                    You've encountered this Pokémon {userEncounters.length}{" "}
                    times.
                  </Card.Body>
                )}
                {!currentUser && (
                  <Link to="/Login">
                    <Card.Body>Login to search for this Pokémon!</Card.Body>
                  </Link>
                )}
              </Card>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Latest Encounters</Card.Header>
            <ListGroup variant="flush">
              {encounters.slice(0, 3).map((e, idx) => (
                <ListGroup.Item>
                  <EncounterLogText encounter={e} key={idx} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {userEncounters.length !== 0 && (
        <EvolutionLine evoChain={details.evolution_chain} />
      )}
      {userEncounters.length !== 0 && <PokedexTextEntries details={details} />}
    </div>
  );
}
