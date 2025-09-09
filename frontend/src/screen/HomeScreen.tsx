// import Header from "../components/Header";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../sass/screens/homeScreen.scss";

const HomeScreen = () => {
  return (
    <>
      <Header />
      <div className="homeScreen">
        <div className="homeScreen__user">
          <span>User</span>, Welcome.
        </div>
        <div className="upload">
          <div className="upload_button"> Upload Button </div>
        </div>
        <div className="homeScreen__video">
          <h2 className="video__title">Video List</h2>
          <div className="video__div">
            <div className="video__div1">
              <div className="video__list">
                <div className="__inner">Thumbnail 1</div>
                <div className="__inner">Thumbnail 2</div>
                <div className="__inner">Thumbnail 3</div>
                <div className="__inner">Thumbnail 4</div>
                <div className="__inner">Thumbnail 5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeScreen;
