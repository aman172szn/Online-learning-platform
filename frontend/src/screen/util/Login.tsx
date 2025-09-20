// import { useState, useEffect } from "react";
// import "../../sass/screens/utils/login.scss";
// import Button from "../../components/Reusable/Button";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// // import { toast } from "react-toastify";

// const Login = () => {
//   const { search } = useLocation();
//   const searchParams = new URLSearchParams(search);
//   const redirect = searchParams.get("redirect") || "/";
//   const [formData, setFormData] = useState({
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
//     <>
//       <div className="login">
//         <div className="login__inner">
//           <div className="login__inner__header">
//             <div className="login__inner__header__topHeader">Platform Name</div>
//             <div className="login__inner__header__bottomHeader">
//               Login to the platform
//             </div>
//           </div>
//           <div className="login__inner__form">
//             <form action="#" className="login__inner__form__login">
//               <div className="login__inner__form__login__email">
//                 <label htmlFor="userEmail">Email</label>
//                 <input
//                   value={formData.userEmail}
//                   type="email"
//                   name="userEmail"
//                   required
//                   placeholder="Enter email"
//                   onChange={formControllerHandler}
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="login__inner__form__login__password">
//                 <label htmlFor="userPassword">Password</label>
//                 <input
//                   value={formData.userPassword}
//                   type="password"
//                   name="userPassword"
//                   required
//                   placeholder="Enter password"
//                   onChange={formControllerHandler}
//                   autoComplete="off"
//                 />
//               </div>
//               {/* <Button
//                 // onClick={(event) => submitHandler(event)}
//                 className="formContainer__loginBtn"
//                 secondary
//                 rounded
//                 // disabled={isLoading}
//                 // loading={isLoading}
//               >
//                 Login In
//               </Button> */}
//               {/* {isLoading && <div>Getting User</div>} */}
//               <div className="login__edit">
//                 <div className="login__edit__button"> Upload Button </div>
//               </div>

//               <div className="login__inner__form__login__registerLink">
//                 New User?
//                 <Link
//                   to={redirect ? `/register?redirect=${redirect}` : "/register"}
//                 >
//                   Register Now.
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../store/slices/usersApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import "../../sass/screens/utils/login.scss";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/home";

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="login">
      <div className="login__inner">
        <div className="login__inner__header">
          <div className="login__inner__header__topHeader">Platform Name</div>
          <div className="login__inner__header__bottomHeader">
            Login to the platform
          </div>
        </div>
        <div className="login__inner__form">
          <form onSubmit={submitHandler} className="login__inner__form__login">
            <div className="login__inner__form__login__email">
              <label htmlFor="userEmail">Email</label>
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
            <div className="login__inner__form__login__password">
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

            <div className="login__edit">
              <button
                type="submit"
                className="login__edit__button"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            <div className="login__inner__form__login__registerLink">
              New User?{" "}
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
  );
};

export default LoginScreen;
