import { Container, FormControl, FormSelect } from "react-bootstrap";
import useExplore from "../../hooks/useExplore";
import AdminEncounterList from "./components/AdminEncounterList";
import { useEffect, useState } from "react";
import { Location } from "../../types/location.types";
import { Pokemon } from "../../types/pokemon.types";
import {
  addMonToLocation,
  removeMonFromLocation,
} from "../../services/locationService";

export default function ManageEncounters() {
  const { locations } = useExplore();
  const [locId, setLocId] = useState<string>("");
  const [loc, setLoc] = useState<Location>();
  const [name, setName] = useState("");

  const handleDelete = async (p: Pokemon) => {
    if (!p._id) {
      return;
    }
    try {
      const updatedLoc = await removeMonFromLocation(locId, p._id);
      setLoc(updatedLoc);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      const updatedLoc = await addMonToLocation(locId, name);
      setLoc(updatedLoc);
      setName("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const maybeLoc = locations.find((l) => l._id === locId);
    if (maybeLoc) {
      setLoc(maybeLoc);
    }
  }, [locId, locations]);

  return (
    <Container>
      <h3>Manage Encounters</h3>
      <FormSelect
        defaultValue=""
        onChange={(e) => setLocId(e.target.value)}
        className="mb-3 mt-3 w-50"
      >
        <option value="" disabled>
          Location
        </option>
        {locations.map((l) => (
          <option value={l._id}>{l.name}</option>
        ))}
      </FormSelect>
      {loc && (
        <div key={loc.name}>
          <h5>{loc.name}</h5>
          <FormControl
            type="text"
            placeholder="Add Pokémon by name"
            className="w-50 mb-3"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
          ></FormControl>
          <AdminEncounterList
            pokemon={loc.encounter_list}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </Container>
  );
}
