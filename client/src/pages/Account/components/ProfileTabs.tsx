import { useState } from "react";
import { Nav, Row } from "react-bootstrap";
import { Encounter } from "../../../types/encounter.types";
import EncounterLog from "../../Home/EncounterLog";
import { Pokemon } from "../../../types/pokemon.types";
import EncounterCard from "../../Explore/components/EncounterCard";

export default function ProfileTabs({
  encounters,
  favorites,
}: {
  encounters: Encounter[];
  favorites: Pokemon[];
}) {
  const [tab, setTab] = useState<boolean>(false);
  return (
    <>
      <Nav variant="pills" defaultActiveKey="favorites">
        <Nav.Item>
          <Nav.Link
            eventKey="favorites"
            active={!tab}
            onClick={() => setTab(false)}
          >
            Favorites
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="encounters"
            active={tab}
            onClick={() => setTab(true)}
          >
            Encounters
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {!tab && (
        <div className="mt-3">
          {favorites.length === 0 && (
            <div className="alert alert-warning">No favorite Pokémon</div>
          )}
          <Row xs={6} sm={6} md={4} lg={4} xl={2} className="g-2">
            {favorites.map((p, idx) => (
              <EncounterCard key={idx} pokemon={p} />
            ))}
          </Row>
        </div>
      )}
      {tab && (
        <div className="mt-3">
          {encounters.length === 0 && (
            <div className="alert alert-warning">No recent encounters....</div>
          )}
          {encounters.map((e, idx) => (
            <EncounterLog key={idx} encounter={e} />
          ))}
          {/* <Link to="Encounters">
          <Button className="btn-primary">See All Encounters</Button>
        </Link> */}
        </div>
      )}
    </>
  );
}
