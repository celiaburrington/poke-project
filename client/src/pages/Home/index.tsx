import {
  Alert,
  Button,
  Card,
  CardGroup,
  Container,
  Row,
} from "react-bootstrap";
import { Link } from "react-router";
import { useAppSelector } from "../../hooks/useTypedRedux";
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
      {/* <h1 className="float-start">PokéProject</h1>
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
      )} */}
      {/* {currentUser?.role === UserRole.Admin && (
        <Link to="/ManageEncounters">
          <Button className="btn-warning m-2 float-end">
            Manage Encounters
          </Button>
        </Link>
      )} */}
      {/* <br />
      <br /> */}
      {/* <hr /> */}
      <Alert variant="info">
        Disclaimer: This is a non-commercial, fan-made educational project
        created solely for the purpose of learning web development. It is not
        affiliated with or endorsed by Nintendo, Game Freak, or The Pokémon
        Company. All assets and data used are for educational demonstration
        purposes only.
      </Alert>
      <CardGroup>
        <Card>
          <Card.Header className="fw-bold">Encounter Wild Pokémon</Card.Header>
          <Card.Body>
            <Card.Text className="mb-4">
              Travel to a random location and see which Pokémon you encounter in
              the wild! Each discovery unlocks more info in your Pokédex.
            </Card.Text>
            <Link to="/Explore">
              <Button className="btn-primary">Go Explore!!</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header className="fw-bold">Search the Pokédex</Card.Header>
          <Card.Body>
            <Card.Text className="mb-4">
              Look up Pokémon by name or filter by type and generation. Check
              out hidden info after you’ve encountered a Pokémon!
            </Card.Text>
            <Link to="/Search">
              <Button className="btn-primary">To the Pokédex</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header className="fw-bold">Track Your Progress</Card.Header>
          <Card.Body>
            <Card.Text className="mb-4">
              View all your encounters and favorite Pokémon on your profile
              page. See how far you’ve come on your journey to catch ’em all!
            </Card.Text>
            <Link to="/Profile">
              <Button className="btn-primary">Check It Out</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
      <br />
      {currentUser && (
        <>
          <h4>Your Last Encounters</h4>
          {userEncounters.length === 0 && (
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
      <Card>
        <Card.Header className="text-center">
          Pokémon and All Respective Names are Trademark and © of Nintendo
          1996-2025
        </Card.Header>
      </Card>
    </Container>
  );
}
