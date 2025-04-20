import { ChangeEvent, useState } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import { addUser } from "../../services/userService";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useTypedRedux";
import { UserRole } from "../../types/user.types";
import { setCurrentUser } from "../../store/reducers/account.reducer";

/**
 * Signup Component contains a form that allows the user to input a username and password to create a new account.
 */
const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signupErr, setSignupErr] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * Function to handle the input change event for username input.
   *
   * @param e - the event object.
   */
  const handleUsernameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  /**
   * Function to handle the input change event for password input.
   *
   * @param e - the event object.
   */
  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * Function to handle a signup form submission event.
   *
   * @param e - the event object.
   */
  const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const newUser = await addUser({
        username,
        password,
        role: UserRole.NewUser,
        date_joined: new Date(),
      });

      dispatch(setCurrentUser(newUser));

      navigate("/Profile");
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        typeof error.response.data === "string"
      ) {
        // get response to display unique username error message
        setSignupErr(error.response.data);
      } else {
        setSignupErr("Error signing up");
      }
    }
  };

  return (
    <Container className="pp-login">
      <h3>Create a new account</h3>
      <Form>
        <FormControl
          value={username}
          autoComplete="username"
          onChange={handleUsernameInputChange}
          placeholder="Enter a unique username"
          required
        />
        <br />
        <FormControl
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={handlePasswordInputChange}
          placeholder="Enter a password"
          required
        />
      </Form>
      <br />
      <Button className="btn-primary" onClick={handleSignUp}>
        Login
      </Button>
      {signupErr && <div className="alert alert-danger mb-2">{signupErr}</div>}
      {!signupErr && <br />}
      Already have an account? <Link to="/Login">Login</Link>
    </Container>
  );
};

export default Signup;
