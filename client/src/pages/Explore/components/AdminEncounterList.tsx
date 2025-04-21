import { Button, Card, Col, Row } from "react-bootstrap";
import { Pokemon } from "../../../types/pokemon.types";
import { FaTrashCan } from "react-icons/fa6";

export default function AdminEncounterList({
  pokemon,
  handleDelete,
}: {
  pokemon: Pokemon[];
  handleDelete: (p: Pokemon) => void;
}) {
  const getSpriteURL = (api_id: number, shiny = false) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
      shiny ? "/shiny" : ""
    }/${api_id}.png`;
  };
  return (
    <>
      <Row xs={1} md={5} className="g-3">
        {pokemon.map((p) => (
          <>
            <Col className="mb-2" style={{ width: "150px" }}>
              <Card bg="light" border="dark">
                <Card.Img
                  src={getSpriteURL(p.api_id)}
                  variant="top"
                  width="100"
                />
                <Card.Body>
                  <Card.Text className="mb-2 text-center overflow-hidden text-uppercase text-bold">
                    <small>
                      <b>{p.name}</b>
                    </small>
                  </Card.Text>
                  <div className="text-center">
                    <Button
                      className="btn-danger"
                      onClick={() => handleDelete(p)}
                    >
                      <FaTrashCan />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </>
        ))}
      </Row>
    </>
  );
}
