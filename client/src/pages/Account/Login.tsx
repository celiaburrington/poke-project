import { ChangeEvent, useState } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import { loginUser, userProfile } from "../../services/userService";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useTypedRedux";
import { setCurrentUser } from "../../store/reducers/account.reducer";

/**
 * Login Component contains a form that allows the user to input their username and password,
 * which is then submitted to the application's Redux store through the AccountReducer on success.
 */
const Login = () => {
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
   * Function to handle a login form submission event.
   *
   * @param event - the mouse event object.
   */
  const handleLogIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await loginUser({ username, password });

      const profile = await userProfile();
      dispatch(setCurrentUser(profile));

      navigate("/Home");
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
      <h3>Login to Pokémon Project</h3>
      <Form>
        <FormControl
          value={username}
          autoComplete="username"
          onChange={handleUsernameInputChange}
          placeholder="Enter your username"
          required
        />
        <br />
        <FormControl
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordInputChange}
          placeholder="Enter your password"
          required
        />
      </Form>
      <br />
      <Button className="btn-primary mb-2" onClick={handleLogIn}>
        Login
      </Button>
      {signupErr && <div className="alert alert-danger mb-2">{signupErr}</div>}
      {!signupErr && <br />}
      No account yet? <Link to="/Signup">Signup</Link>
    </Container>
  );
};

export default Login;
