import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {signIn} = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const user = form.username.value;

    signIn(user, () => navigate(fromPage, {replace: true}));
  }

  return (
    <div className="login">
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input name="username"></input>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;