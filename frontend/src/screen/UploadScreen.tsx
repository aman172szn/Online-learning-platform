import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../sass/screens/uploadScreen.scss"; // We'll reuse some styles

const UploadScreen = () => {
  return (
    <>
      <Header />
      <div className="upload-chooser">
        <div className="upload-chooser__main">
          <h1 className="upload-chooser__header">Choose Upload Method</h1>
          <div className="upload-chooser__options">
            <Link to="/upload/file" className="upload-chooser__option">
              <h2>Upload a Video File</h2>
              <p>
                Directly upload a video file (.mp4, .mov) and a thumbnail from
                your computer.
              </p>
            </Link>
            <Link to="/upload/youtube" className="upload-chooser__option">
              <h2>Use a YouTube Link</h2>
              <p>
                Upload a custom thumbnail and paste in a link to an existing
                YouTube video.
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadScreen;
