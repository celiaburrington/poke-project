import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router";
import { useAppSelector } from "../../hooks/useTypedRedux";
import { FaRegUser } from "react-icons/fa6";

/**
 * PokéProject Home page component advertising web application features to anonymous Users,
 * and displaying recent site activity.
 */
export default function Home() {
  const { currentUser } = useAppSelector((state) => state.accountReducer);

  return (
    <Container id="pp-poke-project">
      <h1 className="float-start">PokéProject</h1>
      {currentUser ? (
        <Link to="/Profile">
          <Button className="btn-primary float-end m-2">
            <FaRegUser className="mb-1" /> Profile
          </Button>
        </Link>
      ) : (
        <Link to="/Login">
          <Button className="btn-primary float-end m-2">Login</Button>
        </Link>
      )}
      <br />
      <br />
      <hr />
      <Card>
        <Card.Header>Encounter Wild Pokémon</Card.Header>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to="/Explore">
            <Button className="btn-primary">Go Explore!!</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Search the Pokédex</Card.Header>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to="/Search">
            <Button className="btn-primary">Pokédex</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Track Your Progress</Card.Header>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to="/Profile">
            <Button className="btn-primary">???</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
