import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import { Encounter } from "../../types/encounter.types";
import {
  getRecentPokemonEncounters,
  getUsersPokemonEncounters,
} from "../../services/encounterService";
import { PokemonDetails } from "../../types/pokemon.types";
import getPokemonDetails from "../../services/pokemonService";
import DetailsPage from "./DetailsPage";
import { useAppSelector } from "../../hooks/useTypedRedux";

export default function Details() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage: string = location.state?.from?.pathname ?? "/Home";
  const { currentUser } = useAppSelector((state) => state.accountReducer);

  const [details, setDetails] = useState<PokemonDetails>();
  const [usersEncounters, setUserEncounters] = useState<Encounter[]>([]);
  const [encounters, setEncounters] = useState<Encounter[]>([]);

  /**
   * Get's the appropriate back button based on where the user is navigating from.
   * @returns Bootstrap Button navigating back
   */
  const getBackButton = () => {
    if (fromPage.includes("Explore")) {
      return (
        <Button
          className="btn-danger float-end"
          onClick={() => navigate("/Explore")}
        >
          Continue Exploring
        </Button>
      );
    } else {
      return (
        <Button
          className="btn-danger float-end"
          onClick={() => navigate(fromPage)}
        >
          {fromPage.includes("Search") ? "Back to Search" : "Return Home"}
        </Button>
      );
    }
  };

  useEffect(() => {
    /**
     * Fetch a pokemon's details from the API
     */
    const fetchDetails = async () => {
      try {
        if (!pid) {
          return;
        }
        const pdets = await getPokemonDetails(pid);
        setDetails(pdets);
        await fetchUsersEncounters();
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * Fetch recent encounters for this Pokemon
     */
    const fetchPokemonEncounters = async () => {
      try {
        if (!pid) {
          setEncounters([]);
          return;
        }

        const encounts = await getRecentPokemonEncounters(pid);
        setEncounters(encounts);
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * Fetch recent encounters for by the current User for this Pokemon
     */
    const fetchUsersEncounters = async () => {
      try {
        if (!details?._id || !currentUser?._id) {
          setEncounters([]);
          return;
        }

        const encounts = await getUsersPokemonEncounters(
          currentUser._id,
          details._id
        );
        setUserEncounters(encounts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
    fetchPokemonEncounters();
  }, [currentUser?._id, details?._id, pid]);
  return (
    <Container className="pp-details-page">
      {getBackButton()}
      <Button className="btn-primary float-end me-2">Add to Favorites</Button>
      <h1>{details?.formatedName}</h1>
      <hr />
      {details && (
        <DetailsPage
          details={details}
          encounters={encounters}
          userEncounters={usersEncounters}
        />
      )}
    </Container>
  );
}
