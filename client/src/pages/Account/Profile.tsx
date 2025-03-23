import { Container } from "react-bootstrap";
import { useAppSelector } from "../../hooks/useTypedRedux";

/**
 * Profile page component for the profile of the User that is currently logged in.
 */
const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.accountReducer);

  if (!currentUser) {
    return (
      <Container>Error fetching current user from application state.</Container>
    );
  }

  return (
    <Container id="pp-profile">
      <h3>Profile Page</h3>
      <hr />
      {currentUser._id}
      <br />
      {currentUser.username}
      <br />
      {new Date(currentUser.date_joined).toISOString()}
    </Container>
  );
};

export default Profile;
