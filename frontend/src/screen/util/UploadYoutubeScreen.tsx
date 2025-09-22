import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateCourseMutation } from "../../store/slices/coursesApiSlice";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../sass/screens/utils/uploadYoutubeScreen.scss";

// Converts a "MM:SS" string to total seconds
const parseDurationToSeconds = (durationStr) => {
  if (!durationStr || !durationStr.includes(":")) {
    return 0; // Return 0 if format is invalid or empty
  }
  const [minutes, seconds] = durationStr.split(":").map(Number);
  if (isNaN(minutes) || isNaN(seconds)) {
    return 0;
  }
  return minutes * 60 + seconds;
};

export default function UploadYoutubeScreen() {
  // State for text inputs
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [duration, setDuration] = useState("");

  const navigate = useNavigate();
  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const durationInSeconds = parseDurationToSeconds(duration);
      await createCourse({
        name,
        semester,
        topic,
        description,
        thumbnail: thumbnailUrl,
        videoUrl: videoUrl,
        duration: durationInSeconds,
      }).unwrap();

      toast.success("Course successfully created!");
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Header />
      <div className="upload__video">
        <div className="upload__video__main">
          <div className="upload__video__header">Upload Video</div>
          <div className="upload__video__form">
            <form onSubmit={submitHandler}>
              <div className="upload__video__form__courseName">
                <label htmlFor="courseName">Course Name</label>
                <input
                  value={name}
                  type="text"
                  name="courseName"
                  required
                  placeholder="Enter Course name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="upload__video__form__courseDetails">
                <label htmlFor="semester">Semester</label>
                <input
                  value={semester}
                  type="text"
                  name="semester"
                  required
                  placeholder="Enter Semester"
                  onChange={(e) => setSemester(e.target.value)}
                />
              </div>
              <div className="upload__video__form__courseTopic">
                <label htmlFor="topic">Topic</label>
                <input
                  value={topic}
                  type="text"
                  name="topic"
                  required
                  placeholder="Enter Course Topic"
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              {/* New input for Thumbnail URL */}
              <div className="upload__video__form__thumbnailUrl">
                <label htmlFor="thumbnailUrl">Thumbnail Image URL</label>
                <input
                  value={thumbnailUrl}
                  type="text"
                  name="thumbnailUrl"
                  required
                  placeholder="Paste image URL for thumbnail"
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                />
              </div>

              {/* Input for YouTube URL */}
              <div className="upload__video__form__youtubeURL">
                <label htmlFor="videoUrl">Youtube Link</label>
                <input
                  value={videoUrl}
                  type="text"
                  name="videoUrl"
                  required
                  placeholder="Paste YouTube video link here"
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>

              <div className="upload__video__form__duration">
                <label htmlFor="duration">Duration (MM:SS)</label>
                <input
                  value={duration}
                  type="text"
                  name="duration"
                  placeholder="e.g: 10:35"
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="upload__video__form__description">
                <label htmlFor="description">Video Description</label>
                <textarea
                  id="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="upload__video__edit">
                <button
                  type="submit"
                  className="upload__video__edit__button"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
