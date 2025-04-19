import { Button, Form, FormControl, FormSelect } from "react-bootstrap";
import { SafeUser, UserRole, UserUpdates } from "../../../types/user.types";
import { BiSave } from "react-icons/bi";

export default function EditProfile({
  profile,
  saveProfile,
  updates,
  setUpdates,
}: {
  profile: SafeUser;
  saveProfile: () => void;
  updates: UserUpdates;
  setUpdates: (u: UserUpdates) => void;
}) {
  return (
    <>
      <Form>
        <FormControl
          defaultValue={profile.username}
          placeholder="Unique username"
          id="pp-username"
          className="mb-2 w-50"
          onChange={(e) => setUpdates({ ...updates, username: e.target.value })}
        />
        <FormControl
          as="textarea"
          placeholder="Profile bio..."
          rows={3}
          defaultValue={profile.bio}
          id="pp-bio"
          className="mb-2 w-50"
          onChange={(e) => setUpdates({ ...updates, bio: e.target.value })}
        />
        <FormControl
          defaultValue={profile.first_name}
          placeholder="First name"
          id="pp-firstname"
          className="mb-2 w-50"
          onChange={(e) =>
            setUpdates({ ...updates, first_name: e.target.value })
          }
        />
        <FormControl
          defaultValue={profile.last_name}
          id="pp-lastname"
          placeholder="Last name"
          className="mb-2 w-50"
          onChange={(e) =>
            setUpdates({ ...updates, last_name: e.target.value })
          }
        />
        <FormControl
          defaultValue={profile.email}
          id="pp-email"
          placeholder="example@mail.com"
          className="mb-2 w-50"
          onChange={(e) => setUpdates({ ...updates, email: e.target.value })}
        />
        {profile.role === UserRole.Admin && (
          <FormSelect
            defaultValue={profile.role}
            onChange={(e) =>
              setUpdates({
                ...updates,
                role:
                  e.target.value === UserRole.NewUser
                    ? UserRole.NewUser
                    : UserRole.Admin,
              })
            }
            className="mb-2 w-50"
          >
            <option value={UserRole.NewUser}>New User</option>
            <option value={UserRole.Admin}>Admin</option>
          </FormSelect>
        )}
      </Form>
      <Button className="btn-primary me-2 mt-2" onClick={() => saveProfile()}>
        <BiSave className="mb-1 me-1" />
        Save
      </Button>
    </>
  );
}
