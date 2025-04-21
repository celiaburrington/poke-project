import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import { Encounter } from "../../types/encounter.types";
import {
  getRecentPokemonEncounters,
  getUsersPokemonEncounters,
} from "../../services/encounterService";
import { Pokemon, PokemonDetails } from "../../types/pokemon.types";
import { getPokemonDetails } from "../../services/pokemonService";
import DetailsPage from "./DetailsPage";
import { useAppSelector } from "../../hooks/useTypedRedux";
import {
  addFavorite,
  deleteFavorite,
  getUsersFavorites,
} from "../../services/favoriteService";
import { Favorite } from "../../types/favorite.types";

export default function Details() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage: string = location.state?.from?.pathname ?? "/Home";
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [isFav, setIsFav] = useState<boolean>(false);

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
        <Button className="btn-danger float-end" onClick={() => navigate(-1)}>
          {fromPage.includes("Search") ? "Back to Search" : "Back"}
        </Button>
      );
    }
  };

  /**
   * Function to handle toggling the current pokemon as one of user's favorites
   */
  const handleFavoritesToggle = async () => {
    if (!currentUser) {
      navigate("/Login");
      return;
    }
    if (!isFav && details) {
      const pokemon: Pokemon = {
        _id: details._id,
        api_id: details.api_id,
        name: details.name,
      };
      const fav: Favorite = {
        user: currentUser,
        pokemon,
      };
      try {
        await addFavorite(fav);
        setIsFav(true);
      } catch (error) {
        console.log(error);
      }
    } else if (isFav && details?._id && currentUser._id) {
      try {
        await deleteFavorite(currentUser._id, details._id);
        setIsFav(false);
      } catch (error) {
        console.log(error);
      }
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
     * Fetch encounters by the current User for this Pokemon
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

    /**
     * Fetch the current Users favorites to determine if pokemon is favorited by current user
     */
    const isUsersFavorite = async () => {
      try {
        if (!pid || !currentUser?._id) {
          setIsFav(false);
          return;
        }

        const favs = await getUsersFavorites(currentUser._id);
        setIsFav(!!favs.find((p) => p.api_id === parseInt(pid)));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
    fetchPokemonEncounters();
    isUsersFavorite();
  }, [currentUser?._id, details?._id, pid]);

  return (
    <Container className="pp-details-page">
      {getBackButton()}
      <Button
        className={`btn-${isFav ? "warning" : "primary"} float-end me-2`}
        onClick={handleFavoritesToggle}
      >
        {isFav ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
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
