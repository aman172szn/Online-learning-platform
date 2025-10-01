// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   useCreateCourseMutation,
//   useUploadThumbnailMutation,
//   useUploadVideoMutation,
// } from "../../store/slices/coursesApiSlice";
// import Footer from "../../components/Footer";
// import Header from "../../components/Header";
// import "../../sass/screens/utils/uploadFileScreen.scss";
// import { FaUpload, FaVideo } from "react-icons/fa";
// import Modal from "../../components/Reusable/Modal";

// // Helper function to format file size
// const formatFileSize = (bytes) => {
//   if (bytes === 0) return "0 Bytes";
//   const k = 1024;
//   const sizes = ["Bytes", "KB", "MB", "GB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
// };

// export default function UploadFileScreen() {
//   // State for text inputs
//   const [name, setName] = useState("");
//   const [semester, setSemester] = useState("");
//   const [description, setDescription] = useState("");
//   const [topic, setTopic] = useState("");

//   // State for Modal
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // State for the files
//   const [thumbnailFile, setThumbnailFile] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState("");
//   const [videoFile, setVideoFile] = useState(null);

//   const navigate = useNavigate();

//   // Initialize Redux mutation hooks
//   const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
//   const [uploadThumbnail, { isLoading: isUploadingThumb }] =
//     useUploadThumbnailMutation();
//   const [uploadVideo, { isLoading: isUploadingVideo }] =
//     useUploadVideoMutation();

//   // Handler for thumbnail file selection
//   const thumbnailChangeHandler = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setThumbnailFile(file);
//       setThumbnailPreview(URL.createObjectURL(file));
//     }
//   };

//   // Handler for video file selection
//   const videoChangeHandler = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//     }
//   };

//   // --- FULLY IMPLEMENTED SUBMIT HANDLER ---
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (!thumbnailFile || !videoFile) {
//       toast.error("Please select both a thumbnail and a video file.");
//       return;
//     }

//     try {
//       // Step 1: Upload Thumbnail
//       const thumbFormData = new FormData();
//       thumbFormData.append("image", thumbnailFile);
//       const thumbRes = await uploadThumbnail(thumbFormData).unwrap();
//       toast.info("Thumbnail uploaded...");

//       // Step 2: Upload Video
//       const videoFormData = new FormData();
//       videoFormData.append("video", videoFile);
//       const videoRes = await uploadVideo(videoFormData).unwrap();
//       toast.info("Video uploaded...");

//       // Step 3: Create the Course with all the data
//       await createCourse({
//         name,
//         semester,
//         description,
//         topic,
//         thumbnail: thumbRes.imageUrl,
//         videoUrl: videoRes.videoUrl,
//         duration: videoRes.duration,
//       }).unwrap();

//       toast.success("Course successfully created!");
//       navigate("/home");
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   const isLoading = isCreating || isUploadingThumb || isUploadingVideo;

//   return (
//     <>
//       <Header />
//       <div className="upload__video">
//         <div className="upload__video__main">
//           <div className="upload__video__header">Upload Video</div>
//           <div className="upload__video__form">
//             <form onSubmit={submitHandler}>
//               <div className="upload__video__form__courseName">
//                 <label htmlFor="courseName">Course Name</label>
//                 <input
//                   value={name}
//                   type="text"
//                   name="courseName"
//                   required
//                   placeholder="Enter Course name"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="upload__video__form__courseDetails">
//                 <label htmlFor="semester">Semester</label>
//                 <input
//                   value={semester}
//                   type="text"
//                   name="semester"
//                   required
//                   placeholder="Enter Semester"
//                   onChange={(e) => setSemester(e.target.value)}
//                 />
//               </div>
//               <div className="upload__video__form__courseTopic">
//                 <label htmlFor="semester">Topic</label>
//                 <input
//                   value={topic}
//                   type="text"
//                   name="topic"
//                   required
//                   placeholder="Enter Course Topic"
//                   onChange={(e) => setTopic(e.target.value)}
//                 />
//               </div>
//               <div className="upload__video__form__description">
//                 <label htmlFor="description">Video Description</label>
//                 {/* <input
//                   value={description}
//                   type="text"
//                   name="description"
//                   required
//                   placeholder="Enter Video Description"
//                   onChange={(e) => setDescription(e.target.value)}
//                 /> */}
//                 <textarea
//                   id="description"
//                   placeholder="Enter description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={4}
//                   required
//                 ></textarea>
//               </div>

//               <div className="upload__video__form__main">
//                 <div className="upload__video__form__main__thumbnail">
//                   <label
//                     htmlFor="thumbnail-upload"
//                     className="upload__video__thumbnail__header"
//                   >
//                     Select Thumbnail <FaUpload />
//                   </label>
//                   <input
//                     id="thumbnail-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={thumbnailChangeHandler}
//                     style={{ display: "none" }}
//                   />
//                   <div className="upload__video__thumbnail__icon">
//                     <img
//                       src={thumbnailPreview}
//                       className="upload__video__thumbnail__icon__img"
//                     />
//                   </div>
//                   {isUploadingThumb && (
//                     <p className="uploading">Uploading...</p>
//                   )}
//                 </div>
//                 <div className="upload__video__form__main__selectVideo">
//                   <label
//                     htmlFor="video-upload"
//                     className="upload__video__form__main__selectVideo__header"
//                   >
//                     Select Video{" "}
//                     <span>
//                       {" "}
//                       <FaVideo />{" "}
//                     </span>
//                   </label>
//                   <input
//                     id="video-upload"
//                     type="file"
//                     accept="video/*"
//                     onChange={videoChangeHandler}
//                     style={{ display: "none" }}
//                   />
//                   {videoFile ? (
//                     <div className="upload__video__form__main__selectVideo__details">
//                       <p>{videoFile.name}</p>
//                       <p>{formatFileSize(videoFile.size)}</p>
//                     </div>
//                   ) : (
//                     <div className="upload__video__form__main__selectVideo__details">
//                       <p>File Name: </p>
//                       <p>File Size: </p>
//                     </div>
//                   )}
//                   {isUploadingVideo && (
//                     <p className="uploading">Uploading...</p>
//                   )}
//                 </div>
//               </div>

//               <div className="upload__video__edit">
//                 <button
//                   type="submit"
//                   className="upload__video__edit__button"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Uploading..." : "Upload Course"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateCourseMutation,
  useUploadThumbnailMutation,
  useUploadVideoMutation,
} from "../../store/slices/coursesApiSlice";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../sass/screens/utils/uploadFileScreen.scss";
import { FaUpload, FaVideo } from "react-icons/fa";
import Modal from "../../components/Reusable/Modal";

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function UploadFileScreen() {
  // State for text inputs
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // NEW STATE: To hold the current status message for the modal
  const [uploadStatus, setUploadStatus] = useState("");

  // State for the files
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const navigate = useNavigate();

  // Initialize Redux mutation hooks
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [uploadThumbnail, { isLoading: isUploadingThumb }] =
    useUploadThumbnailMutation();
  const [uploadVideo, { isLoading: isUploadingVideo }] =
    useUploadVideoMutation();

  // Handler for thumbnail file selection
  const thumbnailChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Handler for video file selection
  const videoChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!thumbnailFile || !videoFile) {
      toast.error("Please select both a thumbnail and a video file.");
      return;
    }

    // Open the modal right before starting the upload process
    setIsModalOpen(true);
    try {
      // Step 1: Upload Thumbnail
      setUploadStatus("Uploading thumbnail (1/3)");
      const thumbFormData = new FormData();
      thumbFormData.append("image", thumbnailFile);
      const thumbRes = await uploadThumbnail(thumbFormData).unwrap();

      // Step 2: Upload Video
      setUploadStatus("Uploading video (2/3)");
      const videoFormData = new FormData();
      videoFormData.append("video", videoFile);
      const videoRes = await uploadVideo(videoFormData).unwrap();

      // Step 3: Create the Course with all the data
      setUploadStatus("Finalizing course creation (3/3)");
      await createCourse({
        name,
        semester,
        description,
        topic,
        thumbnail: thumbRes.imageUrl,
        videoUrl: videoRes.videoUrl,
        duration: videoRes.duration,
      }).unwrap();

      toast.success("Course successfully created!");
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      // IMPORTANT: Close the modal whether the process succeeds or fails
      setIsModalOpen(false);
      setUploadStatus(""); // Reset status
    }
  };

  const isLoading = isCreating || isUploadingThumb || isUploadingVideo;

  return (
    <>
      <Header />
      {/* <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        style={{
          position: "absolute",
          top: "100px",
          left: "20px",
          zIndex: 9999,
        }}
      >
        Toggle Test Modal
      </button> */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="upload-progress-modal-content">
          <div className="spinner"></div>
          <h2>Uploading Course</h2>
          <p>{uploadStatus}</p>
          <p className="instruction">Please do not close this window.</p>
        </div>
      </Modal>
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
                <label htmlFor="semester">Topic</label>
                <input
                  value={topic}
                  type="text"
                  name="topic"
                  required
                  placeholder="Enter Course Topic"
                  onChange={(e) => setTopic(e.target.value)}
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

              <div className="upload__video__form__main">
                <div className="upload__video__form__main__thumbnail">
                  <label
                    htmlFor="thumbnail-upload"
                    className="upload__video__thumbnail__header"
                  >
                    Select Thumbnail <FaUpload />
                  </label>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={thumbnailChangeHandler}
                    style={{ display: "none" }}
                  />
                  <div className="upload__video__thumbnail__icon">
                    <img
                      src={thumbnailPreview}
                      className="upload__video__thumbnail__icon__img"
                    />
                  </div>
                </div>
                <div className="upload__video__form__main__selectVideo">
                  <label
                    htmlFor="video-upload"
                    className="upload__video__form__main__selectVideo__header"
                  >
                    Select Video{" "}
                    <span>
                      {" "}
                      <FaVideo />{" "}
                    </span>
                  </label>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={videoChangeHandler}
                    style={{ display: "none" }}
                  />
                  {videoFile ? (
                    <div className="upload__video__form__main__selectVideo__details">
                      <p style={{ overflow: "auto" }}>{videoFile.name}</p>
                      <p>{formatFileSize(videoFile.size)}</p>
                    </div>
                  ) : (
                    <div className="upload__video__form__main__selectVideo__details">
                      <p>File Name: </p>
                      <p>File Size: </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="upload__video__edit">
                <button
                  type="submit"
                  className="upload__video__edit__button"
                  disabled={isLoading}
                >
                  {isLoading ? "Uploading..." : "Upload Course"}
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
