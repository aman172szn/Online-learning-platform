import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  useGetCourseDetailsQuery,
  useGetCoursesQuery, // 1. Import the hook to get all courses
} from "../store/slices/coursesApiSlice";
import "../sass/screens/videoScreen.scss";
import { MediaController } from "media-chrome/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const VideoScreen = () => {
  const { id: courseId } = useParams();

  // Fetch details for the current video
  const { data: currentCourse, isLoading: isLoadingCurrent } =
    useGetCourseDetailsQuery(courseId);

  // Fetch the list of ALL courses
  const { data: allCourses, isLoading: isLoadingList } = useGetCoursesQuery({});

  const getOptimizedVideoUrl = (originalUrl) => {
    if (!originalUrl || !originalUrl.includes("cloudinary")) {
      return originalUrl;
    }
    const parts = originalUrl.split("/upload/");
    return `${parts[0]}/upload/q_auto:good/f_auto/${parts[1]}`;
  };

  // Filter the list to exclude the current video
  const otherCourses = allCourses?.filter(
    (course) => course._id !== currentCourse?._id
  );

  const formatDuration = (seconds) => {
    if (isNaN(seconds)) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <>
      <Header />
      <div className="video-screen">
        <div className="video-screen__layout">
          {/* --- Main Content (Video Player & Details) --- */}
          <div className="video-screen__main">
            {isLoadingCurrent ? (
              <p>Loading...</p>
            ) : currentCourse ? (
              <>
                <div className="video-player__wrapper">
                  <MediaController
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                    }}
                  >
                    <ReactPlayer
                      className="react-player"
                      src={getOptimizedVideoUrl(currentCourse.videoUrl)}
                      width="100%"
                      height="100%"
                      controls={true}
                      playing={false}
                    />
                  </MediaController>
                </div>
                <div className="video-details__header">
                  {currentCourse.name}
                  {currentCourse.user && (
                    <div className="course__teacher">
                      Prof. {currentCourse.user.name}
                    </div>
                  )}
                </div>
                <div className="video-details">
                  <p style={{ fontSize: "2rem" }}>{currentCourse.topic}</p>
                  <p style={{ fontSize: "1.1rem" }}>
                    {currentCourse.description}
                  </p>
                </div>
              </>
            ) : (
              <p>Video not found.</p>
            )}
          </div>

          {/* --- Sidebar --- */}
          <aside className="video-screen__sidebar">
            <h3 className="sidebar__title">More Videos</h3>
            <div className="sidebar__list">
              {isLoadingList ? (
                <p>Loading list...</p>
              ) : (
                otherCourses?.map((course) => (
                  <Link
                    to={`/video/${course._id}`}
                    key={course._id}
                    className="sidebar-item"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="sidebar-item__thumbnail"
                    />
                    <div className="sidebar-item__details">
                      <h4 className="sidebar-item__topic">{course.topic}</h4>
                      <p className="sidebar-item__title">{course.name}</p>
                      {course.user && (
                        <div className="sidebar-item__teacher">
                          Prof. {course.user.name}
                        </div>
                      )}
                    </div>
                    <p className="duration__pre">
                      {formatDuration(course.duration)}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoScreen;
