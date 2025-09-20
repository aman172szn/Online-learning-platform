// import { useState } from "react";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import "../sass/screens/uploadScreen.scss";
// import { FaUpload, FaVideo } from "react-icons/fa"; // Added FaVideo icon
// import { toast } from "react-toastify";

// // Helper function to format file size
// const formatFileSize = (bytes) => {
//   if (bytes === 0) return "0 Bytes";
//   const k = 1024;
//   const sizes = ["Bytes", "KB", "MB", "GB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
// };

// export default function UploadScreen() {
//   // State for text inputs
//   const [courseName, setCourseName] = useState("");
//   const [courseSemester, setCourseSemester] = useState("");
//   const [description, setDescription] = useState("");

//   // State for the files
//   const [thumbnailFile, setThumbnailFile] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState("");
//   const [videoFile, setVideoFile] = useState(null);

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

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (!thumbnailFile || !videoFile) {
//       toast.error("Please select both a thumbnail and a video file.");
//       return;
//     }
//     // Logic to upload thumbnail, then video, then submit form data will go here
//     console.log("Submitting form with:", {
//       courseName,
//       courseSemester,
//       description,
//       thumbnailFile,
//       videoFile,
//     });
//     toast.info("Form submission logic not yet implemented.");
//   };

//   return (
//     <>
//       <Header />
//       <div className="upload__video">
//         <div className="upload__video__main">
//           <div className="upload__video__header">Upload Video</div>
//           <div className="upload__video__form">
//             <form onSubmit={submitHandler}>
//               {/* --- Text fields for Course Name, Details, Description --- */}
//               <div className="upload__video__form__courseName">
//                 <label htmlFor="courseName">Course Name</label>
//                 <input
//                   value={courseName}
//                   type="text"
//                   name="courseName"
//                   required
//                   placeholder="Enter Course name"
//                   onChange={(e) => setCourseName(e.target.value)}
//                 />
//               </div>
//               <div className="upload__video__form__courseDetails">
//                 <label htmlFor="courseSemester">Course Details</label>
//                 <input
//                   value={courseSemester}
//                   type="text"
//                   name="courseSemester"
//                   required
//                   placeholder="Enter Semester"
//                   onChange={(e) => setCourseSemester(e.g.target.value)}
//                 />
//               </div>
//               <div className="upload__video__form__description">
//                 <label htmlFor="description">Video Description</label>
//                 <input
//                   value={description}
//                   type="text"
//                   name="description"
//                   required
//                   placeholder="Enter Video Description"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               {/* --- Thumbnail Upload Input and Preview --- */}
//               <div className="upload__video__form__main">
//                 <div className="upload__video__form__main__thumbnail">
//                   <label
//                     htmlFor="thumbnail-upload"
//                     className="upload__video__thumbnail__header"
//                   >
//                     Select Thumbnail
//                     <span>
//                       {" "}
//                       <FaUpload />{" "}
//                     </span>
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
//                 </div>
//                 <div className="upload__video__form__main__selectVideo">
//                   <label
//                     htmlFor="video-upload"
//                     className="upload__video__form__main__selectVideo__header"
//                   >
//                     Select Video
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
//                 </div>
//               </div>

//               <div className="upload__video__edit">
//                 <button type="submit" className="upload__video__edit__button">
//                   Upload
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
} from "../store/slices/coursesApiSlice";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../sass/screens/uploadScreen.scss";
import { FaUpload, FaVideo } from "react-icons/fa";

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function UploadScreen() {
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const navigate = useNavigate();

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [uploadThumbnail, { isLoading: isUploadingThumb }] =
    useUploadThumbnailMutation();
  const [uploadVideo, { isLoading: isUploadingVideo }] =
    useUploadVideoMutation();

  const thumbnailChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

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

    try {
      // Step 1: Upload Thumbnail
      const thumbFormData = new FormData();
      thumbFormData.append("image", thumbnailFile);
      const thumbRes = await uploadThumbnail(thumbFormData).unwrap();
      toast.success(thumbRes.message);

      // Step 2: Upload Video
      const videoFormData = new FormData();
      videoFormData.append("video", videoFile);
      const videoRes = await uploadVideo(videoFormData).unwrap();
      toast.success(videoRes.message);

      // Step 3: Create the Course with all the data
      await createCourse({
        name,
        semester,
        description,
        thumbnail: thumbRes.imageUrl,
        videoUrl: videoRes.videoUrl,
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
              {/* Text fields for Course Name, Semester, Description */}
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
              <div className="upload__video__form__description">
                <label htmlFor="description">Video Description</label>
                <input
                  value={description}
                  type="text"
                  name="description"
                  required
                  placeholder="Enter Video Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Thumbnail and Video Upload sections */}
              <div className="upload__video__form__main">
                <div className="upload__video__form__main__thumbnail">
                  <label
                    htmlFor="thumbnail-upload"
                    className="upload__video__thumbnail__header"
                  >
                    Select Thumbnail{" "}
                    <span>
                      {" "}
                      <FaUpload />{" "}
                    </span>
                  </label>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={thumbnailChangeHandler}
                    style={{ display: "none" }}
                  />
                  <div className="upload__video__thumbnail__icon">
                    {thumbnailPreview && (
                      <img
                        src={thumbnailPreview}
                        className="upload__video__thumbnail__icon__img"
                      />
                    )}
                  </div>
                  {isUploadingThumb && <div>Uploading Thumbnail...</div>}
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
                  {videoFile && (
                    <div className="upload__video__form__main__selectVideo__details">
                      <p>{videoFile.name}</p>
                      <p>{formatFileSize(videoFile.size)}</p>
                    </div>
                  )}
                  {isUploadingVideo && <div>Uploading Video...</div>}
                </div>
              </div>

              <div className="upload__video__edit">
                <button
                  type="submit"
                  className="upload__video__edit__button"
                  disabled={isCreating || isUploadingThumb || isUploadingVideo}
                >
                  Upload Course
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
