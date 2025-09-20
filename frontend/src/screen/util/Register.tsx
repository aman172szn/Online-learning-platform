// import { useState, useEffect } from "react";
// import "../../sass/screens/utils/register.scss";
// import FormContainer from "../../components/Reusable/FormContainer";
// import Button from "../../components/Reusable/Button";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// // import { toast } from "react-toastify";

// const Login = () => {
//   const { search } = useLocation();
//   const searchParams = new URLSearchParams(search);
//   const redirect = searchParams.get("redirect") || "/";
//   const [formData, setFormData] = useState({
//     userName: "",
//     userEmail: "",
//     userPassword: "",
//   });
//   const formControllerHandler = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { value, name } = event.target;
//     setFormData((prevFormData) => {
//       return { ...prevFormData, [name]: value };
//     });
//   };

//   return (
//     <div className="register">
//       <div className="landing__image"></div>
//       <div className="register__main">
//         <div className="register__inner">
//           <div className="register__inner__header">
//             <div className="register__inner__header__topHeader">
//               Platform Name
//             </div>
//             <div className="register__inner__header__bottomHeader">
//               Register to the platform
//             </div>
//           </div>
//         </div>

//         <div className="register__form">
//           <form action="#">
//             <div className="register__form__userName">
//               <label htmlFor="userName">Name</label>
//               <input
//                 // value={formData?.name}
//                 value={formData?.userName}
//                 type="text"
//                 name="userName"
//                 required
//                 placeholder="Enter name"
//                 onChange={formControllerHandler}
//                 autoComplete="off"
//               />
//             </div>
//             <div className="register__form__userEmail">
//               <label htmlFor="userEmail">Email Address</label>
//               <input
//                 value={formData.userEmail}
//                 type="email"
//                 name="userEmail"
//                 required
//                 placeholder="Enter email"
//                 onChange={formControllerHandler}
//                 autoComplete="off"
//               />
//             </div>
//             <div className="register__form__userPassword">
//               <label htmlFor="userPassword">Password</label>
//               <input
//                 value={formData.userPassword}
//                 type="password"
//                 name="userPassword"
//                 required
//                 placeholder="Enter password"
//                 onChange={formControllerHandler}
//                 autoComplete="off"
//               />
//             </div>
//             {/* <Button
//               // onClick={(event) => submitHandler(event)}
//               className="formContainer__loginBtn"
//               secondary
//               rounded
//               // disabled={isLoading}
//               // loading={isLoading}
//             >
//               Register
//             </Button> */}
//             <div className="register__edit">
//               <div className="register__edit__button"> Upload Button </div>
//             </div>
//             {/* {isLoading && <div>Getting User</div>} */}
//             <div className="register__loginLink">
//               Already have an account?
//               <Link
//                 to={redirect ? `/register?redirect=${redirect}` : "/register"}
//               >
//                 Login
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/home");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
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
          <form onSubmit={submitHandler}>
            <div className="register__form__userName">
              <label htmlFor="userName">Name</label>
              <input
                value={name}
                type="text"
                name="userName"
                required
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="register__form__userEmail">
              <label htmlFor="userEmail">Email Address</label>
              <input
                value={email}
                type="email"
                name="userEmail"
                required
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="register__form__userPassword">
              <label htmlFor="userPassword">Password</label>
              <input
                value={password}
                type="password"
                name="userPassword"
                required
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="register__form__userPassword">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
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
