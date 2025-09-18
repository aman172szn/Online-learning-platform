import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../sass/screens/uploadScreen.scss";
import { FaUpload } from "react-icons/fa";

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    courseName: "",
    youtubeURL: "",
    courseDetails: "",
    description: "",
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
      <div className="upload__video">
        <div className="upload__video__main">
          <div className="upload__video__header">Upload Video</div>
          <div className="upload__video__form">
            <form action="#">
              <div className="upload__video__form__courseName">
                <label htmlFor="courseName">Course Name</label>
                <input
                  value={formData?.courseName}
                  type="text"
                  name="courseName"
                  required
                  placeholder="Enter Course name"
                  onChange={formControllerHandler}
                  autoComplete="off"
                />
              </div>
              <div className="upload__video__form__courseDetails">
                <label htmlFor="courseDetails">Course Details</label>
                <input
                  value={formData?.courseDetails}
                  type="text"
                  name="courseDetails"
                  required
                  placeholder="Enter Course Details"
                  onChange={formControllerHandler}
                  autoComplete="off"
                />
              </div>
              <div className="upload__video__form__youtubeURL">
                <label htmlFor="youtubeURL">Youtube Link</label>
                <input
                  value={formData.youtubeURL}
                  type="text"
                  name="youtubeURL"
                  required
                  placeholder="Enter email"
                  onChange={formControllerHandler}
                  autoComplete="off"
                />
              </div>
              <div className="upload__video__form__description">
                <label htmlFor="description">Video Description</label>
                <input
                  value={formData.description}
                  type="text"
                  name="description"
                  required
                  placeholder="Enter Video Description"
                  onChange={formControllerHandler}
                  autoComplete="off"
                />
              </div>
              <div className="upload__video__form__thumbnail">
                <div className="upload__video__thumbnail__header">
                  Select Video
                  <span>
                    <FaUpload />
                  </span>
                </div>
                <div className="upload__video__thumbnail__icon">
                  <div className="upload__video__thumbnail__icon__img"></div>
                </div>
              </div>
              <div className="upload__video__edit">
                <div className="upload__video__edit__button">
                  {" "}
                  Upload Video{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
