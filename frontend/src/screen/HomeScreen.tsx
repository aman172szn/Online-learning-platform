// import Header from "../components/Header";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../sass/Screen/homeScreen.scss'

const HomeScreen = () => {
  return (
    <>
      <Header />
      <div className="homeScreen">
        <h1>Hello User</h1>
        <div className="upload">
        <div className="upload_button">Upload Button </div>
        </div>
        <div className="homeScreen_video">
          <h2 className="video_title">Subject header</h2>
          <div className="video_list">
            <div className="_inner">Thumbnail 1</div>
            <div className="_inner">Thumbnail 2</div>
            <div className="_inner">Thumbnail 3</div>
            <div className="_inner">Thumbnail 4</div>
            <div className="_inner">Thumbnail 5</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeScreen;
