import { Button, Container } from "react-bootstrap";
import { Location } from "../../types/location.types";
import { FaLocationArrow } from "react-icons/fa6";
import EncounterCard from "./components/EncounterCard";
import { Encounter } from "../../types/encounter.types";
import { useState } from "react";
import { randomEncounter } from "../../services/encounterService";
import { Link } from "react-router-dom";

export default function LocationPage({
  location,
  goExplore,
}: {
  location: Location;
  goExplore: () => void;
}) {
  const [areaEncounter, setAreaEncounter] = useState<Encounter | null>(null);

  /**
   * Gets a random encounter from the current location's encounter list.
   */
  const getRandomEncounter = async () => {
    try {
      const rand = await randomEncounter(location);
      setAreaEncounter(rand);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Reset the encounter state variable.
   */
  const resetLocationEncounter = () => {
    setAreaEncounter(null);
  };

  // TODO: Handle blocking user from refreshing the page at same location.

  return (
    <Container>
      <h3 className="mt-2">{location.name}</h3>
      {location.description}
      <hr />
      {!areaEncounter && (
        <>
          <button
            className="border-0 bg-transparent pp-get-encounter"
            onClick={getRandomEncounter}
          >
            <EncounterCard key={0} />
          </button>
          <br />
        </>
      )}
      {areaEncounter && (
        <div className="pp-get-encounter">
          <EncounterCard key={0} pokemon={areaEncounter.pokemon} />
        </div>
      )}
      <Button
        className="btn-primary mt-3"
        onClick={() => {
          goExplore();
          resetLocationEncounter();
        }}
      >
        Keep Exploring <FaLocationArrow className="mb-1" />
      </Button>
      <Link to="/Home">
        <Button className="btn-danger mt-3 ms-1">Return Home</Button>
      </Link>
    </Container>
  );
}
