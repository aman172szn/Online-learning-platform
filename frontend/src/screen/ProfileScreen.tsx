// import { useState, useEffect } from "react";
// import "../sass/screens/profileScreen.scss";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import FormContainer from "../components/Reusable/FormContainer";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Button from "../components/Reusable/Button";

// const ProfileScreen = () => {
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
//     <>
//       <Header />
//       <div className="profile">
//         <div className="profile__div">
//           <div className="profile__title">Edit Profile</div>
//           <div className="profile__form">
//             <form action="#">
//               <div className="profile__form__userName">
//                 <label htmlFor="userName">Name</label>
//                 <input
//                   // value={formData?.name}
//                   value={formData?.userName}
//                   type="text"
//                   name="userName"
//                   required
//                   placeholder="Enter name"
//                   onChange={formControllerHandler}
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="profile__form__userEmail">
//                 <label htmlFor="userEmail">Email Address</label>
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
//               <div className="profile__form__userPassword">
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
//               <div className="profile__edit">
//                 <div className="profile__edit__button"> Confirm </div>
//               </div>
//               {/* <Button
//                 // onClick={(event) => submitHandler(event)}
//                 className="formContainer__loginBtn"
//                 secondary
//                 rounded
//               >
//                 Update Profile
//               </Button> */}
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProfileScreen;

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../store/slices/authSlice";
import { useUpdateProfileMutation } from "../store/slices/usersApiSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../sass/screens/profileScreen.scss";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user info from the global auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Get the update function and loading state from the API slice
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Populate form with user data when component loads
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          // We pass all fields, the backend will only update what's provided
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        navigate("/home");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__div">
          <div className="profile__title">Edit Profile</div>
          <div className="profile__form">
            <form onSubmit={submitHandler}>
              <div className="profile__form__userName">
                <label htmlFor="userName">Name</label>
                <input
                  value={name}
                  type="text"
                  name="userName"
                  // required
                  placeholder="Enter name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  autoComplete="off"
                />
                <p className={`error-message-profile`}>{"Name is required."}</p>
              </div>
              <div className="profile__form__userEmail">
                <label htmlFor="userEmail">Email Address</label>
                <input
                  value={email}
                  type="email"
                  name="userEmail"
                  // required
                  placeholder="Enter email"
                  pattern="^([a-z0-9][._]?)+[a-z0-9]@[a-z0-9]+(\.?[a-z0-9]){2}\.(com?|net|org)+(\.[a-z0-9]{2,4})?"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="off"
                />
                <p className={`error-message-profile`}>
                  {"Email must be a valid address, e.g me@mydomain.com"}
                </p>
              </div>
              <div className="profile__form__userPassword">
                <label htmlFor="userPassword">New Password</label>
                <input
                  value={password}
                  type="password"
                  name="userPassword"
                  placeholder="Enter new password"
                  pattern="^([\w@-_\.]{8,20})$"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="off"
                />
                <p className={`error-message-profile`}>
                  {` Password must be alphanumeric, (@ _ - . allowed)
                and must be 8-20 characters`}
                </p>
              </div>
              <div className="profile__form__userPassword">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  value={confirmPassword}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  pattern={password}
                  autoComplete="off"
                />
                <p className={`error-message-profile`}>
                  {"Passwords do not match."}
                </p>
              </div>
              <div className="profile__edit">
                <button
                  type="submit"
                  className="profile__edit__button"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileScreen;
