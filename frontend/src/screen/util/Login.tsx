import { useState, useEffect } from "react";
import "../../sass/screens/utils/login.scss";
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
    <>
      <div className="login">
        <div className="login__inner">
          <div className="login__inner__header">
            <div className="login__inner__header__topHeader">Platform Name</div>
            <div className="login__inner__header__bottomHeader">
              Login to the platform
            </div>
          </div>
          <div className="login__inner__form">
            <form action="#" className="login__inner__form__login">
              <div className="login__inner__form__login__email">
                <label htmlFor="userEmail">Email</label>
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
              <div className="login__inner__form__login__password">
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
              <div className="login__inner__form__login__registerLink">
                New User?
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register Now.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
