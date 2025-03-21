import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { LOCATIONS } from "./testLocations";

/**
 * ExplorePage allowing a User to navigate to a random Location.
 */
export default function ExplorePage() {
  // TODO: fetch locations from server
  const navigate = useNavigate();

  return (
    <Container id="pp-explore">
      <h1>Explore the World of Pokémon!</h1>
      <hr />
      <Button
        className="btn-primary"
        onClick={() => {
          const location = Math.floor(Math.random() * LOCATIONS.length);
          navigate(LOCATIONS[location].name.replace(/\s/g, ""));
        }}
      >
        Go Explore!!
      </Button>
      <hr />
      {LOCATIONS.map((location) => (
        <Button
          className="btn-primary m-2"
          onClick={() => {
            navigate(location.name.replace(/\s/g, ""));
          }}
        >
          {location.name}
        </Button>
      ))}
    </Container>
  );
}
