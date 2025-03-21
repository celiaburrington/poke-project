import { Button, Card, CardTitle, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

interface TestLocation {
  name: string;
  description: string;
  encounter_list: number[];
}

export default function LocationPage({ location }: { location: TestLocation }) {
  const pokeIDs = location.encounter_list.map((id) => {
    return {
      api_id: id,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });

  return (
    <Container>
      <Link to="/explore">
        <Button className="btn-primary">Back to Explore</Button>
      </Link>
      <h3>{location.name}</h3>
      {location.description}
      <hr />
      <Row xs={1} md={5} className="g-4">
        {pokeIDs.map((p) => (
          <Col style={{ width: "94px" }}>
            <Card>
              <Card.Img src={p.sprite} variant="top" width="100%" />
              <CardTitle>{p.api_id}</CardTitle>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
