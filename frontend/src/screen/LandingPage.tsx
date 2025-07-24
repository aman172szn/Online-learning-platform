import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <Link to={"/register"}> "New User? Register" </Link>
      </div>
    </div>
  );
};

export default LandingPage;
