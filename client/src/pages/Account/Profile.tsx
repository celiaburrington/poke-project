import { Container } from "react-bootstrap";
import useUserContext from "../../hooks/useUserContext";

/**
 * Profile page component for the profile of the User that is currently logged in.
 */
const Profile = () => {
  const { user } = useUserContext();

  return (
    <Container id="pp-profile">
      <h3>Profile Page</h3>
      <hr />
      {user._id}
      <br />
      {user.username}
      <br />
      {new Date(user.date_joined).toISOString()}
    </Container>
  );
};

export default Profile;
