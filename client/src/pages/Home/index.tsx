import { Button, Container } from "react-bootstrap";
import { Link } from "react-router";

/**
 * PokéProject Home page component advertising web application features to anonymous Users,
 * and displaying recent site activity.
 */
export default function Home() {
  return (
    <Container id="pp-poke-project">
      <h1 className="float-start">PokéProject</h1>
      <Link to="/login">
        <Button className="btn-primary float-end mt-2">Login</Button>
      </Link>
      <br />
      <br />
      <hr />
      <Link to="/explore">
        <Button className="btn-primary">Go Explore!!</Button>
      </Link>
    </Container>
  );
}
