import { useState, useEffect } from "react";
import "../../sass/screens/utils/register.scss";
import FormContainer from "../../components/Reusable/FormContainer";
import Button from "../../components/Reusable/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import { toast } from "react-toastify";

const Login = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  const [formData, setFormData] = useState({
    userName: "",
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
    <div className="register">
      <div className="landing__image"></div>
      <div className="register__main">
        <div className="register__inner">
          <div className="register__inner__header">
            <div className="register__inner__header__topHeader">
              Platform Name
            </div>
            <div className="register__inner__header__bottomHeader">
              Register to the platform
            </div>
          </div>
        </div>

        <div className="register__form">
          <form action="#">
            <div className="register__form__userName">
              <label htmlFor="userName">Name</label>
              <input
                // value={formData?.name}
                value={formData?.userName}
                type="text"
                name="userName"
                required
                placeholder="Enter name"
                onChange={formControllerHandler}
                autoComplete="off"
              />
            </div>
            <div className="register__form__userEmail">
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
            <div className="register__form__userPassword">
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
              Register
            </Button>
            {/* {isLoading && <div>Getting User</div>} */}
            <div className="register__loginLink">
              Already have an account?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
