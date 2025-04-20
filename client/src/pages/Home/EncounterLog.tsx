import "./EncounterLog.css";
import { Card } from "react-bootstrap";
import { Encounter } from "../../types/encounter.types";
import { Link } from "react-router-dom";
import EncounterCard from "../Explore/components/EncounterCard";

export default function EncounterLog({
  encounter,
  type = "banner",
}: {
  encounter: Encounter;
  type?: string;
}) {
  const getSpriteURL = (api_id: number, shiny = false) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
      shiny ? "/shiny" : ""
    }/${api_id}.png`;
  };

  if (type === "card") {
    return <EncounterCard pokemon={encounter.pokemon} />;
  } else if (type === "private") {
    return (
      <>
        <Card className="mb-2 border-danger bg-light d-none d-sm-block">
          <div className="pp-log-text">
            <img className="me-1" src={getSpriteURL(0)}></img>
            <span className="me-2">
              <Link
                to={`/Profile/${encounter.user._id}`}
                className="text-danger"
              >
                {encounter.user.username}
              </Link>{" "}
              encountered <span className="text-primary">?????</span> at{" "}
              {new Date(encounter.encountered_at).toLocaleString()}
            </span>
          </div>
        </Card>
        <Card className="mb-2 border-danger bg-light d-block d-sm-none">
          <div className="pp-log-text">
            <img src={getSpriteURL(0)} className="me-1"></img>
            <span className="me-4">
              Encountered by{" "}
              <Link
                to={`/Profile/${encounter.user._id}`}
                className="text-danger"
              >
                {encounter.user.username}
              </Link>
            </span>
          </div>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card className="mb-2 border-danger bg-light d-none d-md-block">
          <div>
            <Link
              to={`/Details/${encounter.pokemon.api_id}`}
              className="float-start ms-2"
            >
              <img src={getSpriteURL(encounter.pokemon.api_id)}></img>
            </Link>
            <div className="pp-log-text">
              <div>
                <Link
                  to={`/Profile/${encounter.user._id}`}
                  className="text-danger"
                >
                  {encounter.user.username}
                </Link>{" "}
                encountered{" "}
                <Link
                  to={`/Details/${encounter.pokemon.api_id}`}
                  className="text-primary"
                >
                  {encounter.pokemon.name.toLocaleUpperCase()}
                </Link>{" "}
                at {new Date(encounter.encountered_at).toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
        <Card className="mb-2 border-danger bg-light d-block d-md-none">
          <Link
            to={`/Details/${encounter.pokemon.api_id}`}
            className="float-start ms-2"
          >
            <img src={getSpriteURL(encounter.pokemon.api_id)}></img>
          </Link>
          <div className="pp-log-text">
            <div>
              Encountered by{" "}
              <Link
                to={`/Profile/${encounter.user._id}`}
                className="text-danger"
              >
                {encounter.user.username}
              </Link>
            </div>
          </div>
        </Card>
      </>
    );
  }
}
