import { SafeUser } from "../../../types/user.types";

/**
 * ProfileDetails component displaying information for the profile of the User that is currently logged in.
 */
const ProfileDetails = ({
  profile,
  isPublic,
}: {
  profile: SafeUser;
  isPublic: boolean;
}) => {
  return (
    <dl className="row pp-profile-details">
      <dt className="col-sm-3 mb-3">Username</dt>
      <dd className="col-sm-9 mb-3">{profile.username}</dd>

      <dt className="col-sm-3  mb-3">Bio</dt>
      <dd className="col-sm-9  mb-3">{profile.bio}</dd>

      {!isPublic && (
        <>
          <dt className="col-sm-3  mb-3">Name</dt>
          <dd className="col-sm-9  mb-3">
            {profile.first_name} {profile.last_name}
          </dd>
        </>
      )}

      {!isPublic && (
        <>
          <dt className="col-sm-3">Email</dt>
          <dd className="col-sm-9">{profile.email}</dd>
        </>
      )}

      <dt className="col-sm-3 mt-3">Date Joined</dt>
      <dd className="col-sm-9 mt-3">
        {new Date(profile.date_joined).toLocaleDateString()}
      </dd>
    </dl>
  );
};

export default ProfileDetails;
