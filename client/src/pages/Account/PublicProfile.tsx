import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { getUserById, getUsersEncounters } from "../../services/userService";
import { SafeUser } from "../../types/user.types";
import ProfileDetails from "./components/ProfileDetails";
import { FaRegUser } from "react-icons/fa6";
import { Encounter } from "../../types/encounter.types";
import ProfileTabs from "./components/ProfileTabs";
import { Pokemon } from "../../types/pokemon.types";
import { getUsersFavorites } from "../../services/favoriteService";

/**
 * Public Profile page component displaying the public details of a User's profile page.
 */
const PublicProfile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState<SafeUser>();
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    /**
     * Function to fetch the current user's profile data.
     */
    const fetchUserDetails = async () => {
      if (!uid) {
        return;
      }
      try {
        const userFromDb = await getUserById(uid);
        setUser(userFromDb);
        fetchEncouters();
        fetchFavorites();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchEncouters = async () => {
      try {
        if (!user?._id) {
          setEncounters([]);
          return;
        }
        const result = await getUsersEncounters(user._id);
        setEncounters(result);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFavorites = async () => {
      try {
        if (!user?._id) {
          setFavorites([]);
          return;
        }
        const result = await getUsersFavorites(user._id);
        setFavorites(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [uid, user?._id]);

  return (
    <Container className="pp-public-profile">
      <h3 className="float-start mt-3">
        <a href="#">Home</a> / <FaRegUser className="mb-2" /> Profile
      </h3>
      <br />
      <br />
      <br />
      {user && (
        <>
          <Card className="pp-profile-details bg-light">
            <Card.Header>User Details</Card.Header>
            <Card.Body>
              <ProfileDetails profile={user} isPublic={true} />
            </Card.Body>
          </Card>
          <br />
          <ProfileTabs encounters={encounters} favorites={favorites} />
        </>
      )}
      {!user && (
        <>
          <div className="alert alert-danger">
            User not found...
            <hr />
            <Link to="/Home" className="mt-2">
              <Button className="btn-danger">Return Home</Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default PublicProfile;
