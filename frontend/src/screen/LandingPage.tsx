// import { Link } from "react-router-dom";
import Login from "./util/Login";
import "../sass/screens/landingScreen.scss";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className="landing__image"></div>
      <div className="landing__main">
        {/* <div className="formContainer__headerLogin">Platform Name</div>
        <div className="formContainer__footerHeader">Login User</div>
        <div className="formContainer__footerHeader2">
          Login to the platform
        </div> */}
        <Login />
      </div>
    </div>
  );
};

export default LandingPage;
