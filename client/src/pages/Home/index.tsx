import { Button, Card, CardGroup, Container, Row } from "react-bootstrap";
import { Link } from "react-router";
import { useAppSelector } from "../../hooks/useTypedRedux";
import { FaRegUser } from "react-icons/fa6";
import { Encounter } from "../../types/encounter.types";
import { useEffect, useState } from "react";
import { fetchEncounters } from "../../services/encounterService";
import EncounterLog from "./EncounterLog";
import { getUsersEncounters } from "../../services/userService";

/**
 * PokéProject Home page component advertising web application features to anonymous Users,
 * and displaying recent site activity.
 */
export default function Home() {
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [userEncounters, setUserEncounters] = useState<Encounter[]>([]);

  useEffect(() => {
    /**
     * Fetches the 10 most recent encounters from the server.
     */
    const newestEncounters = async () => {
      try {
        const encounts = await fetchEncounters();
        setEncounters(encounts);
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * Fetches a currently logged in user's encounters, displaying top 3.
     */
    const fetchUsersEncounters = async () => {
      try {
        if (!currentUser?._id) {
          setUserEncounters([]);
          return;
        }
        const encounts = await getUsersEncounters(currentUser._id);
        setUserEncounters(encounts.slice(0, 6));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersEncounters();
    newestEncounters();
  }, [currentUser?._id]);

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
      <CardGroup>
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
      </CardGroup>
      <br />
      {currentUser && (
        <>
          <h4>Your Last Encounters</h4>
          {encounters.length === 0 && (
            <div className="alert alert-primary">
              Go exploring to start filling up your Pokédex!
            </div>
          )}
          <Row xs={2} sm={2} md={3} lg={3} xl={6} className="g-2">
            {userEncounters.map((e: Encounter, idx) => (
              <EncounterLog encounter={e} type="card" key={idx} />
            ))}
          </Row>
        </>
      )}
      <h4>Recent Activity</h4>
      {encounters.length === 0 && (
        <div className="alert alert-warning">No recent encounters....</div>
      )}
      {encounters.map((e: Encounter, idx) => (
        <EncounterLog
          encounter={e}
          key={idx}
          type={currentUser ? "banner" : "private"}
        />
      ))}
    </Container>
  );
}
