import { SafeUser } from "../../../types/user.types";

/**
 * ProfileDetails component displaying information for the profile of the User that is currently logged in.
 */
const ProfileDetails = ({ profile }: { profile: SafeUser }) => {
  return (
    <div className="pp-profile-details">
      <dl className="row">
        <dt className="col-sm-3 mb-3">Username</dt>
        <dd className="col-sm-9 mb-3">{profile.username}</dd>

        <dt className="col-sm-3  mb-3">Bio</dt>
        <dd className="col-sm-9  mb-3">{profile.bio}</dd>

        <dt className="col-sm-3  mb-3">Name</dt>
        <dd className="col-sm-9  mb-3">
          {profile.first_name} {profile.last_name}
        </dd>

        <dt className="col-sm-3  mb-3">Email</dt>
        <dd className="col-sm-9  mb-3">{profile.email}</dd>

        <dt className="col-sm-3">Date Joined</dt>
        <dd className="col-sm-9">
          {new Date(profile.date_joined).toLocaleDateString()}
        </dd>
      </dl>
    </div>
  );
};

export default ProfileDetails;
