import { Button, Card } from "react-bootstrap";
import { Location } from "../../../types/location.types";
import { useNavigate } from "react-router";

/**
 * AdminNavigation component allowing an admin user to navigate to specific Locations.
 */
export default function AdminNavigation({
  locations,
}: {
  locations: Location[];
}) {
  const navigate = useNavigate();

  return (
    <>
      <br />
      <br />
      <Card>
        <Card.Header as="h6">Admin Navigation</Card.Header>
        <Card.Body>
          {locations.map((location) => (
            <Button
              key={location.name}
              className="btn-primary m-2"
              onClick={() => {
                navigate(location.name.replace(/\s/g, ""));
              }}
            >
              {location.name}
            </Button>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}
