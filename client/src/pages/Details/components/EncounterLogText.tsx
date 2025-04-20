import { Card } from "react-bootstrap";
import { Encounter } from "../../../types/encounter.types";
import { Link } from "react-router-dom";

export default function EncounterLogText({
  encounter,
}: {
  encounter: Encounter;
}) {
  return (
    <>
      <Card className="mb-2 border-danger bg-light float-end">
        <Card.Body>
          Encountered by{" "}
          <Link to={`/Profile/${encounter.user._id}`} className="text-danger">
            {encounter.user.username}
          </Link>{" "}
          at {new Date(encounter.encountered_at).toLocaleString()}
        </Card.Body>
      </Card>
    </>
  );
}
