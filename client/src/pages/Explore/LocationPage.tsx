import { Button, Container } from "react-bootstrap";
import { Location } from "../../types/location.types";
import { FaLocationArrow } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedRedux";
import { UserRole } from "../../types/user.types";
import EncounterCard from "./components/EncounterCard";
import AdminEncounterList from "./components/AdminEncounterList";
import { Encounter } from "../../types/encounter.types";
import { useState } from "react";
import { randomEncounter } from "../../services/encounterService";

export default function LocationPage({
  location,
  goExplore,
}: {
  location: Location;
  goExplore: () => void;
}) {
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const isAdmin = currentUser?.role === UserRole.Admin;
  const [disabled, setDisabled] = useState<boolean>(false);
  const [areaEncounter, setAreaEncounter] = useState<Encounter | null>(null);
  const locationURL = useLocation();

  /**
   * Function to return the URL for a Pokémon's sprite image base on the Pokémon's API ID.
   *
   * @param api_id pokémon id
   * @param shiny shiny sprite?
   * @returns The sprite URL
   */
  const getSpriteURL = (api_id: number, shiny = false) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
      shiny ? "/shiny" : ""
    }/${api_id}.png`;
  };

  const getRandomEncounter = async () => {
    try {
      const rand = await randomEncounter(location);
      setAreaEncounter(rand);
      setDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const resetLocationEncounter = () => {
    setAreaEncounter(null);
    setDisabled(false);
  };

  // TODO: Handle blocking user from refreshing the page at same location.

  return (
    <Container>
      <Button
        className="btn-primary"
        onClick={() => {
          goExplore();
          resetLocationEncounter();
        }}
      >
        Keep Exploring <FaLocationArrow />
      </Button>
      <h3 className="mt-2">{location.name}</h3>
      {location.description}
      <hr />
      {!areaEncounter && <EncounterCard sprite={getSpriteURL(0)} key={0} />}
      {areaEncounter && (
        <EncounterCard
          key={0}
          pokemon={areaEncounter.pokemon}
          sprite={getSpriteURL(areaEncounter.pokemon.api_id)}
        />
      )}
      <br />
      {!disabled && (
        <Button
          className="btn-primary me-2"
          onClick={() => getRandomEncounter()}
        >
          Encounter!
        </Button>
      )}
      {disabled && areaEncounter && (
        <Link
          to={{
            pathname: `/Details/${areaEncounter.pokemon.api_id}`,
          }}
          state={{ from: locationURL }}
        >
          <Button className="btn-primary me-2">See Details</Button>
        </Link>
      )}
      <Link to="/Home">
        <Button className="btn-danger">Return Home</Button>
      </Link>
      {isAdmin && (
        <AdminEncounterList
          pokemon={location.encounter_list}
          getSprite={getSpriteURL}
        />
      )}
    </Container>
  );
}
