import Header from "../components/Header";
import Footer from "../components/Footer";
import "../sass/screens/videoScreen.scss";

export default function VideoScreen() {
  return (
    <div className="videoScreen">
      <Header />
      <div className="video_current">Currently Playing</div>
      <div className="videoScreen_inner">
        <div className="videoScreen_video">Video Player Here</div>
        <div className="chatBot">ChatBot Here</div>
      </div>
      <Footer />
    </div>
  );
}
