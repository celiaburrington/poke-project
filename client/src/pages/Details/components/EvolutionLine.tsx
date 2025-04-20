import { Card, Row, Col } from "react-bootstrap";
import { EvolutionChain } from "../../../types/pokemon.types";

export default function EvolutionLine({
  evoChain,
}: {
  evoChain: EvolutionChain;
}) {
  const displayEvolutionChain = (chain: EvolutionChain[]): JSX.Element => {
    return (
      <>
        {chain.map((link) => (
          <>
            <a href={`#/Details/${link.api_id}`}>
              <img src={link.sprite} />
            </a>
            {link.evolves_to.length > 0 && "->"}
            {displayEvolutionChain(link.evolves_to)}
          </>
        ))}
      </>
    );
  };

  return (
    <Card className="mb-2">
      <Card.Header>Evolution Line</Card.Header>
      <Row xs={1} md={3} className="g-2 mb-2">
        <Col>
          <a href={`#/Details/${evoChain.api_id}`}>
            <img src={evoChain.sprite} />
          </a>
          {evoChain.evolves_to.length > 0 && "->"}
          {displayEvolutionChain(evoChain.evolves_to)}
        </Col>
      </Row>
    </Card>
  );
}
