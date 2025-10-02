import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../store/slices/usersApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import "../../sass/screens/utils/register.scss";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Frontend Validation Logic
  const frontendValidationCheck = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email must be a valid address, e.g me@mydomain.com";
    }
    if (password.length < 8) {
      newErrors.password = `
                Password must be alphanumeric, (@ _ - . allowed)
                and must be 8-20 characters`;
    }
    if (newErrors.password !== newErrors.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    // If there are any errors, stop the submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    frontendValidationCheck();
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/home");
    } catch (err) {
      // toast.error(err?.data?.message || err.error);
      toast.error("Fill in the Details");
    }
  };

  const handlePasswordCheck = () => {
    if (confirmPassword && password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match." });
    } else {
      // If they do match, clear the specific error
      const newErrors = { ...errors };
      delete newErrors.confirmPassword;
      setErrors(newErrors);
    }
  };

  return (
    <div className="register">
      <div className="landing__image">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/src/assets/vid2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="register__main">
        <div className="register__inner">
          <div className="register__inner__header">
            <div className="register__inner__header__topHeader">Axium</div>
            <div className="register__inner__header__bottomHeader">
              Register to the world of Axium!
            </div>
          </div>
        </div>

        <div className="register__form">
          <form onSubmit={submitHandler}>
            <div className="register__form__userName">
              <label htmlFor="userName">Name</label>
              <input
                value={name}
                type="text"
                name="userName"
                placeholder=" "
                onChange={(e) => {
                  setName(e.target.value);
                  // Clear the error for this field when the user types
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                autoComplete="off"
              />
              <p className={`error-message ${errors.name ? "visible" : ""}`}>
                {errors.name || "Name is required."}
              </p>
            </div>
            <div className="register__form__userEmail">
              <label htmlFor="userEmail">Email Address</label>
              <input
                value={email}
                type="email"
                name="userEmail"
                placeholder=" "
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                autoComplete="off"
                pattern="^([a-z0-9][._]?)+[a-z0-9]@[a-z0-9]+(\.?[a-z0-9]){2}\.(com?|net|org)+(\.[a-z0-9]{2,4})?"
              />
              <p className={`error-message ${errors.email ? "visible" : ""}`}>
                {errors.email ||
                  "Email must be a valid address, e.g me@mydomain.com"}
              </p>
            </div>
            <div className="register__form__userPassword">
              <label htmlFor="userPassword">Password</label>
              <input
                value={password}
                type="password"
                name="userPassword"
                // required
                placeholder=" "
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
                autoComplete="off"
                pattern="^([\w@-_\.]{8,20})$"
              />

              <p
                className={`error-message ${errors.password ? "visible" : ""}`}
              >
                {errors.password ||
                  ` Password must be alphanumeric, (@ _ - . allowed)
                and must be 8-20 characters`}
              </p>
            </div>
            <div className="register__form__userPassword">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                // required
                placeholder=" "
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handlePasswordCheck}
                autoComplete="off"
                pattern="^([\w@-_\.]{8,20})$"
              />
              <p
                className={`error-message ${
                  errors.confirmPassword ? "visible" : ""
                }`}
              >
                {errors.confirmPassword || "Passwords do not match."}
              </p>
            </div>

            <div className="register__edit">
              <button
                type="submit"
                className="register__edit__button"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>

            <div className="register__loginLink">
              Already have an account? <Link to="/">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
