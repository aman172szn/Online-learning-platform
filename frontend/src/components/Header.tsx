// import "../sass/components/header.scss";
// import { useState } from "react";
// import { IoMenuSharp } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import Button from "./Reusable/Button";

// export default function Header() {
//   // for nav we add a new class which will make all li be block only when screen is medium
//   const [isNavExpanded, setIsNavExpanded] = useState(true);
//   const navBarExpandHandler = () => {
//     setIsNavExpanded((prevIsNavExpanded) => !prevIsNavExpanded);
//   };

//   //? "expanded" is a class that will only be added if the display is a phone [medium media query]
//   return (
//     /* Sticky NAVBAR Parent*/
//     <nav id="navbarParent">
//       <ul className={isNavExpanded ? "navbar" : "navbar expanded"}>
//         {/*DropDown li ONE*/}
//         <li className="navbar__item">
//           <Link to="/home" className="navbar__item__title">
//             Home
//           </Link>
//         </li>
//         {/* DropDown li Two*/}

//         <li
//           className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
//         >
//           <Link to="/profile" className="navbar__item__link">
//             <div
//               className="navbar__item__link__innerChild"
//               style={{ display: "flex" }}
//             >
//               Profile
//             </div>
//           </Link>
//         </li>
//         {/* logout */}
//         <li
//           className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
//         >
//           <Link to="/" className="navbar__item__link">
//             <div
//               className="navbar__item__link__innerChild"
//               style={{ display: "flex" }}
//             >
//               Logout
//             </div>
//           </Link>
//         </li>
//         {/* logout */}
//         {/* DropDown li Last [hamburger icon ] */}
//         {/* <div onClick={navBarExpandHandler}> */}
//         <Button className="navbar__item" onClick={navBarExpandHandler}>
//           <IoMenuSharp />
//         </Button>
//         {/* </div> */}
//       </ul>
//       {/* NAVBAR PROGRESSION */}
//       {/* <div className="header">
//         <div className="progress-container">
//           <div className="progress-bar" id="myBar"></div>
//         </div>
//       </div> */}
//     </nav>
//   );
// }

import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Reusable/Button";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../store/slices/usersApiSlice";
import { logout } from "../store/slices/authSlice";
import "../sass/components/header.scss";

export default function Header() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  // Get user info from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the logout API mutation function
  const [logoutApiCall] = useLogoutMutation();

  const navBarExpandHandler = () => {
    setIsNavExpanded((prevIsNavExpanded) => !prevIsNavExpanded);
  };

  // --- LOGOUT HANDLER ---
  const logoutHandler = async () => {
    try {
      // 1. Call the backend endpoint to clear the cookie
      await logoutApiCall().unwrap();
      // 2. Dispatch the logout action to clear frontend state (localStorage)
      dispatch(logout());
      // 3. Navigate the user to the login page
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav id="navbarParent">
      <ul className={isNavExpanded ? "navbar" : "navbar expanded"}>
        <li className="navbar__item">
          <Link to="/home" className="navbar__item__title">
            Home
          </Link>
        </li>
        {/* --- CONDITIONAL RENDERING --- */}
        {userInfo && userInfo.isAdmin && (
          <li
            className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
          >
            <Link to="/admin/users" className="navbar__item__link">
              Admin
            </Link>
          </li>
        )}
        {userInfo ? (
          // If user is logged in, show Profile and Logout links
          <>
            <li
              className={
                isNavExpanded ? "navbar__item" : "navbar__item expanded"
              }
            >
              <Link to="/profile" className="navbar__item__link">
                <div
                  className="navbar__item__link__innerChild"
                  style={{ display: "flex" }}
                >
                  Profile
                </div>
              </Link>
            </li>
            <li
              className={
                isNavExpanded ? "navbar__item" : "navbar__item expanded"
              }
            >
              {/* Changed from Link to a div with an onClick handler */}
              <div
                onClick={logoutHandler}
                className="navbar__item__link"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="navbar__item__link__innerChild"
                  style={{ display: "flex" }}
                >
                  Logout
                </div>
              </div>
            </li>
          </>
        ) : (
          // If user is not logged in, show a Sign In link
          <li
            className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
          >
            <Link to="/" className="navbar__item__link">
              <div
                className="navbar__item__link__innerChild"
                style={{ display: "flex" }}
              >
                Sign In
              </div>
            </Link>
          </li>
        )}

        <Button className="navbar__item" onClick={navBarExpandHandler}>
          <IoMenuSharp />
        </Button>
      </ul>
    </nav>
  );
}
