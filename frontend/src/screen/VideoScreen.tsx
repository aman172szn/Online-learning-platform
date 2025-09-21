// import ReactPlayer from "react-player"; // More optimized import for YouTube
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import "../sass/screens/videoScreen.scss";

// export default function VideoScreen() {
//   // A known-working public YouTube URL for testing
//   const videoUrl = "https://www.youtube.com/watch?v=LXb3EKWsInQ";

//   return (
//     <div className="videoScreen">
//       <Header />
//       <div className="video_current">Currently Playing: Test Video</div>
//       <div className="videoScreen_inner">
//         <div className="videoScreen_video">
//           <ReactPlayer
//             className="react-player"
//             src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
//             width="70%"
//             height="70%"
//             controls={true}
//             playing={false}
//             muted={true}
//             onError={(e) => console.error("onError", e)}
//           />
//         </div>
//         {/* <div className="chatBot">ChatBot Here</div> */}
//       </div>
//       <Footer />
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetCourseDetailsQuery } from "../store/slices/coursesApiSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../sass/screens/videoScreen.scss";

const VideoScreen = () => {
  // 1. Get the course ID from the URL (e.g., /video/61ba42...)
  const { id: courseId } = useParams();

  // 2. Fetch the course data using the ID from Redux Toolkit Query
  const { data: course, isLoading, error } = useGetCourseDetailsQuery(courseId);

  // 3. Helper function to add Cloudinary optimization parameters to the video URL
  const getOptimizedVideoUrl = (originalUrl) => {
    if (!originalUrl) return "";
    // Split the URL at '/upload/'
    const parts = originalUrl.split("/upload/");
    // Insert optimization parameters (q_auto:good for quality, f_auto for format)
    return `${parts[0]}/upload/q_auto:good/f_auto/${parts[1]}`;
  };

  return (
    <>
      <Header />
      <div className="videoScreen__container">
        {isLoading ? (
          <p>Loading video...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error?.data?.message || error.error}</p>
        ) : course ? (
          // If course data is found, display the video and details
          <>
            <h1 className="video-title">{course.name}</h1>
            <div className="video-player-wrapper">
              <ReactPlayer
                className="react-player"
                src={getOptimizedVideoUrl(course.videoUrl)}
                controls={true}
                // Optionally start playing immediately or muted
                playing={false}
                muted={false}
              />
            </div>
            <div className="video-details">
              <h2>Topic: {course.topic}</h2>
              <p>
                <strong>Semester:</strong> {course.semester}
              </p>
              <p>
                <strong>Description:</strong> {course.description}
              </p>
              <p>
                <strong>Duration:</strong>{" "}
                {course.duration
                  ? `${Math.floor(course.duration / 60)}m ${Math.floor(
                      course.duration % 60
                    )}s`
                  : "N/A"}
              </p>
            </div>
          </>
        ) : (
          // If no course is found for the ID
          <p>Course not found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default VideoScreen;
