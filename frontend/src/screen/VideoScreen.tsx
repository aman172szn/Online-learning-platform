import ReactPlayer from "react-player"; // More optimized import for YouTube
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../sass/screens/videoScreen.scss";

export default function VideoScreen() {
  // A known-working public YouTube URL for testing
  const videoUrl = "https://www.youtube.com/watch?v=LXb3EKWsInQ";

  return (
    <div className="videoScreen">
      <Header />
      <div className="video_current">Currently Playing: Test Video</div>
      <div className="videoScreen_inner">
        <div className="videoScreen_video">
          <ReactPlayer
            className="react-player"
            src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            width="70%"
            height="70%"
            controls={true}
            playing={false}
            muted={true}
            onError={(e) => console.error("onError", e)}
          />
        </div>
        {/* <div className="chatBot">ChatBot Here</div> */}
      </div>
      <Footer />
    </div>
  );
}
