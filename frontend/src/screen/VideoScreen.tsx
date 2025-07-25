import Header from "../components/Header"
import Footer from "../components/Footer"
import '../sass/Screen/videoScreen.scss'

export default function VideoScreen(){
    return(
        <div className="videoScreen">
            <Header/>
            <h2 className="video_current">Currently Playing</h2>
            <div className="videoScreen_inner">
            <div className="videoScreen_video">Video Player Here</div>
            <div className="chatBot">ChatBot Here</div>
            </div>
            <Footer/>
        </div>
    )
}