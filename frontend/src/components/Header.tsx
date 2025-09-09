import "../sass/components/header.scss";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "./Reusable/Button";

export default function Header() {
  // for nav we add a new class which will make all li be block only when screen is medium
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const navBarExpandHandler = () => {
    setIsNavExpanded((prevIsNavExpanded) => !prevIsNavExpanded);
  };

  //? "expanded" is a class that will only be added if the display is a phone [medium media query]
  return (
    /* Sticky NAVBAR Parent*/
    <nav id="navbarParent">
      <ul className={isNavExpanded ? "navbar" : "navbar expanded"}>
        {/*DropDown li ONE*/}
        <li className="navbar__item">
          <Link to="/home" className="navbar__item__title">
            Home
          </Link>
        </li>
        {/* DropDown li Two*/}

        <li
          className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
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
          className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
        >
          <Link to="/" className="navbar__item__link">
            <div
              className="navbar__item__link__innerChild"
              style={{ display: "flex" }}
            >
              Logout
            </div>
          </Link>
        </li>
        {/* DropDown li Last [hamburger icon ] */}
        {/* <div onClick={navBarExpandHandler}> */}
        <Button className="navbar__item" onClick={navBarExpandHandler}>
          <IoMenuSharp />
        </Button>
        {/* </div> */}
      </ul>
      {/* NAVBAR PROGRESSION */}
      {/* <div className="header">
        <div className="progress-container">
          <div className="progress-bar" id="myBar"></div>
        </div>
      </div> */}
    </nav>
  );
}
