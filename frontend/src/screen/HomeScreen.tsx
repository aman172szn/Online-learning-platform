// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   useGetCoursesQuery,
//   useDeleteCourseMutation,
// } from "../store/slices/coursesApiSlice";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import "../sass/screens/homeScreen.scss";
// import { toast } from "react-toastify";

// // Helper function to format duration
// const formatDuration = (seconds) => {
//   if (isNaN(seconds)) return "N/A";
//   const minutes = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${minutes}:${secs.toString().padStart(2, "0")}`;
// };

// const HomeScreen = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [semester, setSemester] = useState("");

//   const { data: courses, isLoading, error } = useGetCoursesQuery({ semester });
//   const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

//   const deleteHandler = async (e, id) => {
//     e.preventDefault();
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         await deleteCourse(id).unwrap();
//         toast.success("Course deleted");
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="homeScreen">
//         <div className="homeScreen__user">
//           <span>{userInfo ? userInfo.name : "User"}</span>, Welcome.
//         </div>

//         {userInfo && userInfo.isTeacher && (
//           <div className="upload">
//             <Link className="upload_button" to="/upload">
//               <div> Upload Button </div>
//             </Link>
//           </div>
//         )}

//         <div className="homeScreen__video">
//           <div className="video__header">
//             <h2 className="video__title">Video List</h2>
//             {courses && courses.length > 0 && (
//               <div className="filter-container">
//                 <label htmlFor="semester-filter">Filter by Semester: </label>
//                 <select
//                   id="semester-filter"
//                   value={semester}
//                   onChange={(e) => setSemester(e.target.value)}
//                 >
//                   <option value="">All</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//                   <option value="5">5</option>
//                   <option value="6">6</option>
//                   <option value="7">7</option>
//                   <option value="8">8</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <div className="video__div">
//             {isLoading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p style={{ color: "red" }}>
//                 {error?.data?.message || error.error}
//               </p>
//             ) : courses && courses.length > 0 ? (
//               <div className="video__list">
//                 {courses.map((course) => (
//                   <div className="course-card" key={course._id}>
//                     <Link
//                       to={`/video/${course._id}`}
//                       className="course-card-link"
//                     >
//                       <div className="video__list__inner">
//                         {userInfo &&
//                           userInfo.isTeacher &&
//                           userInfo._id === course.user && (
//                             <div className="course__card__actions">
//                               <Link to={`/edit-course/${course._id}`}>
//                                 <button className="btn-edit">Edit</button>
//                               </Link>
//                               <button
//                                 className="btn-delete"
//                                 onClick={(e) => deleteHandler(e, course._id)}
//                                 disabled={isDeleting}
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         <img src={course.thumbnail} alt={course.name} />
//                         <h4>Subject: {course.name}</h4>
//                         <p>Topic: {course.topic}</p>
//                         <p>Duration: {formatDuration(course.duration)}</p>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="no-courses-message">
//                 <h3>No class lectures have been uploaded yet.</h3>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default HomeScreen;

import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useGetCoursesQuery,
  useDeleteCourseMutation,
} from "../store/slices/coursesApiSlice";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../sass/screens/homeScreen.scss";
import { toast } from "react-toastify";
import Modal from "../components/Reusable/Modal";

// Helper function to format duration
const formatDuration = (seconds) => {
  if (isNaN(seconds)) return "N/A";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [semester, setSemester] = useState("");
  const [keyword, setKeyword] = useState("");

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  let role = "Student"; // Default role
  if (userInfo) {
    if (userInfo.isAdmin) {
      role = "Admin";
    } else if (userInfo.isTeacher) {
      role = "Teacher";
    }
  }

  // Gets the list of courses that will be displayed and filtered
  const {
    data: filteredCourses,
    isLoading,
    error,
  } = useGetCoursesQuery({ semester, keyword });

  // Gets the total list of courses to check if the filter should be displayed
  const { data: allCourses } = useGetCoursesQuery({});

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  // const deleteHandler = async (e, id) => {
  //   e.preventDefault(); // Stop the parent Link from navigating
  //   if (window.confirm("Are you sure you want to delete this course?")) {
  //     try {
  //       await deleteCourse(id).unwrap();
  //       toast.success("Course deleted");
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };
  function capitalizeFirstLetter(string) {
    if (!string) {
      // Handle empty or null strings
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Modal Deletion

  // for MODAL Component
  const confirmDeleteHandler = async () => {
    if (courseToDelete) {
      try {
        await deleteCourse(courseToDelete).unwrap();
        toast.success("Course deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      } finally {
        setIsModalOpen(false); // Close the modal
        setCourseToDelete(null); // Reset the state
      }
    }
  };
  // Modal Logic
  const handleDeleteClick = (e, courseId) => {
    e.preventDefault(); // Stop the parent Link from navigating
    setCourseToDelete(courseId); // Store the ID of the course to delete
    setIsModalOpen(true); // Open the confirmation modal
  };

  return (
    <>
      <Header />
      <div className="homeScreen">
        <div className="homeScreen__user">
          <span>
            {userInfo ? capitalizeFirstLetter(userInfo.name) : "User"}
          </span>
          , Welcome
          {userInfo && <span> {role}.</span>}
        </div>

        {userInfo && userInfo.isTeacher && (
          <div className="upload">
            <Link className="upload_button" to="/upload">
              <div> Upload Button </div>
            </Link>
          </div>
        )}

        <div className="homeScreen__video">
          <div className="video__header">
            <h2 className="video__title">Video List</h2>
            {/* Filter is only shown if there are courses in the database */}
            {allCourses && allCourses.length > 0 && (
              <div className="filter-container">
                <label htmlFor="semester-filter">Filter by Semester: </label>
                <select
                  id="semester-filter"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  {/* <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option> */}
                </select>
              </div>
            )}
          </div>
          <div className="video__search">
            <input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="video__div">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>
                {error?.data?.message || error.error}
              </p>
            ) : (
              <div className="video__list">
                {filteredCourses.map((course) => (
                  <React.Fragment key={course._id}>
                    <div className="course-card">
                      <Link
                        to={`/video/${course._id}`}
                        className="course-card-link"
                      >
                        <div className="video__list__inner">
                          <img src={course.thumbnail} alt={course.name} />
                          <div className="video__list__inner__details">
                            <div className="video__list__inner__details__topic">
                              <span>{course.topic}</span>
                            </div>
                            <div>
                              <div className="course__name">
                                <span>{course.name}</span>
                              </div>
                              {course.user && (
                                <div className="course__teacher">
                                  Prof. {course.user.name}
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="duration">
                            {formatDuration(course.duration)}
                          </p>
                        </div>
                      </Link>
                      {userInfo &&
                        userInfo.isTeacher &&
                        userInfo._id === course.user._id && ( // login user.id = course created person
                          <div className="course-card-actions">
                            <Link to={`/edit-course/${course._id}`}>
                              <button className="btn-edit">Edit</button>
                            </Link>
                            <button
                              className="btn-delete"
                              onClick={(e) => handleDeleteClick(e, course._id)}
                              disabled={isDeleting}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
            {/* Intelligent "empty" messages */}
            {filteredCourses &&
              filteredCourses.length === 0 &&
              allCourses &&
              allCourses.length > 0 && (
                <div className="no-courses-message">
                  <h3>No lectures found for this semester.</h3>
                </div>
              )}
            {allCourses && allCourses.length === 0 && !isLoading && (
              <div className="no-courses-message">
                <h3>No class lectures have been uploaded yet.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-content-custom">
          <h2>Confirm Deletion</h2>
          <p>
            Are you sure you want to permanently delete this course? This action
            cannot be undone.
          </p>
          <div className="modal-actions">
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={confirmDeleteHandler}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HomeScreen;
