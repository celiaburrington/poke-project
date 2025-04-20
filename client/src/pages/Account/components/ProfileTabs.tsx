import { useState } from "react";
import { Nav } from "react-bootstrap";
import { Encounter } from "../../../types/encounter.types";
import EncounterLog from "../../Home/EncounterLog";

export default function ProfileTabs({
  encounters,
}: {
  encounters: Encounter[];
}) {
  const [tab, setTab] = useState<boolean>(true);
  return (
    <>
      <Nav variant="pills" defaultActiveKey="encounters">
        <Nav.Item>
          <Nav.Link
            eventKey="encounters"
            active={tab}
            onClick={() => setTab(true)}
          >
            Encounters
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="favorites"
            active={!tab}
            onClick={() => setTab(false)}
          >
            Favorites
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {tab && (
        <div className="mt-3">
          <h5>Most Recent Encounters</h5>
          {encounters.map((e, idx) => (
            <EncounterLog key={idx} encounter={e} />
          ))}
          {/* <Link to="Encounters">
          <Button className="btn-primary">See All Encounters</Button>
        </Link> */}
        </div>
      )}
      {!tab && (
        <div className="mt-3">
          <h5>Favorites</h5>
        </div>
      )}
    </>
  );
}
