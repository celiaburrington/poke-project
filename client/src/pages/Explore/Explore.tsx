import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Location } from "../../types/location.types";
import { useAppSelector } from "../../hooks/useTypedRedux";
import { UserRole } from "../../types/user.types";
import AdminNavigation from "./components/AdminNavigation";

/**
 * ExplorePage allowing a User to navigate to a random Location.
 */
export default function ExplorePage({
  locations,
  goExplore,
}: {
  locations: Location[];
  goExplore: () => void;
}) {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const isAdmin = currentUser?.role === UserRole.Admin;

  return (
    <Container id="pp-explore">
      <h3>Explore the World of Pokémon!</h3>
      <hr />
      <Button
        className="btn-danger me-2 float-end"
        onClick={() => {
          navigate("/Home");
        }}
      >
        Return Home
      </Button>
      <Button
        className="btn-primary"
        onClick={() => {
          goExplore();
        }}
      >
        Go Explore!!
      </Button>
      {isAdmin && <AdminNavigation locations={locations} />}
    </Container>
  );
}
