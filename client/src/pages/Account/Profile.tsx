import { Button, Container } from "react-bootstrap";
import { useAppSelector } from "../../hooks/useTypedRedux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SafeUser, UserUpdates } from "../../types/user.types";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/reducers/account.reducer";
import EditProfile from "./components/EditProfile";
import { logoutUser, updateCurrentUser } from "../../services/userService";
import ProfileDetails from "./components/ProfileDetails";
import { FaRegUser } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

/**
 * Profile page component for the profile of the User that is currently logged in.
 */
const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const [profile, setProfile] = useState<SafeUser>();
  const [updates, setUpdates] = useState<UserUpdates>({});
  const [editting, setEditting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Function sign out the current user by setting Redux currentUser state to null.
   */
  const signOut = async () => {
    try {
      await logoutUser();
      dispatch(setCurrentUser(null));
      navigate("/Home");
    } catch (error) {
      console.log(`${(error as Error).message}: please try again!`);
    }
  };

  /**
   * Function to update the current user's profile details.
   */
  const saveProfile = async () => {
    try {
      if (!currentUser?._id) {
        throw Error("Current user invalid");
      }
      const newUser = await updateCurrentUser(currentUser._id, updates);
      dispatch(setCurrentUser(newUser));
      setEditting(false);
    } catch (error) {
      console.log(`${(error as Error).message}: unable to update user.`);
    }
  };

  useEffect(() => {
    /**
     * Function to fetch the current user's profile data.
     */
    const fetchProfile = async () => {
      if (!currentUser) return navigate("/Login");
      setProfile(currentUser);
    };

    fetchProfile();
  }, [currentUser, navigate]);

  // Profile
  // Public details: Username, Bio, UserRole, date_joined, encounters.
  // Specific encounters shown as most recent 5-10, but includes link to Encounters page.
  // [Encounted <pokémon-name> in <location-name> <date>]
  // Private details: password, first and last name, email

  return (
    <Container id="pp-profile">
      <h3 className="float-start mt-3">
        <a href="#">Home</a> / <FaRegUser className="mb-2" /> Profile
      </h3>
      <Button className="btn-danger float-end mt-3" onClick={signOut}>
        Logout
        <MdLogout className="mb-1 ms-2" />
      </Button>
      <br />
      <br />
      <hr />
      {profile && !editting && <ProfileDetails profile={profile} />}
      {profile && editting && (
        <EditProfile
          profile={profile}
          updates={updates}
          setUpdates={setUpdates}
          saveProfile={saveProfile}
        />
      )}
      <Button
        className={`${!editting ? "btn-primary" : "btn-secondary"}`}
        onClick={() => {
          setEditting(!editting);
          setUpdates({});
        }}
      >
        {!editting && <BiSolidEdit className="mb-1 me-2 fs-5" />}
        {editting ? "Cancel" : "Edit"}
      </Button>
    </Container>
  );
};

export default Profile;
