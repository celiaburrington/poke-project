import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

/**
 * Explore page allowing a User to navigate to a random Location.
 */
export default function Explore() {
  // TODO: fetch locations from server
  const tmpLocations = ["Forest", "Volcano", "Town", "Glacier"];
  const navigate = useNavigate();

  return (
    <Container id="pp-explore">
      <h1>Explore the World of Pokémon!</h1>
      <hr />
      <Button
        className="btn-primary"
        onClick={() => {
          const location = Math.floor(Math.random() * tmpLocations.length);
          navigate(tmpLocations[location]);
        }}
      >
        Go Explore!!
      </Button>
    </Container>
  );
}
