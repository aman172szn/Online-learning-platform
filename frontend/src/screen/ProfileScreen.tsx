import { useState, useEffect } from "react";
import "../sass/screens/profileScreen.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormContainer from "../components/Reusable/FormContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Reusable/Button";

const ProfileScreen = () => {
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
    <>
      <Header />
      <div className="profile">
        <div className="profile__div">
          <div className="profile__title">Edit Profile</div>
          <div className="profile__form">
            <form action="#">
              <div className="profile__form__userName">
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
              <div className="profile__form__userEmail">
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
              <div className="profile__form__userPassword">
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
              <div className="profile__edit">
                <div className="profile__edit__button"> Upload Button </div>
              </div>
              {/* <Button
                // onClick={(event) => submitHandler(event)}
                className="formContainer__loginBtn"
                secondary
                rounded
              >
                Update Profile
              </Button> */}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileScreen;
