import { useState, useEffect } from "react";
import "../sass/screens/loginScreen.scss";
import FormContainer from "../../components/Reusable/FormContainer";
import Button from "../../components/Reusable/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import { toast } from "react-toastify";

const Login = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const formControllerHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  return (
    <FormContainer>
      <div className="formContainer__headerLogin">Login User</div>
      <form action="#" className="formContainer__login">
        <div className="formContainer__userEmailLogin">
          <label htmlFor="userEmail">Email Address</label>
          <input
            value={formData.userEmail}
            type="email"
            name="userEmail"
            required
            placeholder="Enter email"
            onChange={formControllerHandler}
            autoComplete="off"
          />
        </div>
        <div className="formContainer__userPasswordLogin">
          <label htmlFor="userPassword">Password</label>
          <input
            value={formData.userPassword}
            type="password"
            name="userPassword"
            required
            placeholder="Enter password"
            onChange={formControllerHandler}
            autoComplete="off"
          />
        </div>
        <Button
          // onClick={(event) => submitHandler(event)}
          className="formContainer__loginBtn"
          secondary
          rounded
          // disabled={isLoading}
          // loading={isLoading}
        >
          Login In
        </Button>
        {/* {isLoading && <div>Getting User</div>} */}
        <div className="formContainer__registerLink">
          New Customer?{" "}
          {/* if user tries to checkout without logging in or register 
           redirect from shipping to login or register 
          else go to  /register  or /login*/}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default Login;
