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
  } = useGetCoursesQuery({ semester });
  // Gets the total list of courses to check if the filter should be displayed
  const { data: allCourses } = useGetCoursesQuery({});

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const deleteHandler = async (e, id) => {
    e.preventDefault(); // Stop the parent Link from navigating
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id).unwrap();
        toast.success("Course deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="homeScreen">
        <div className="homeScreen__user">
          <span>{userInfo ? userInfo.name : "User"}</span>, Welcome
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
                    {/* The buttons are now siblings to the link, not inside it */}
                    <div className="course-card">
                      {userInfo &&
                        userInfo.isTeacher &&
                        userInfo._id === course.user && (
                          <div className="course-card-actions">
                            <Link to={`/edit-course/${course._id}`}>
                              <button className="btn-edit">Edit</button>
                            </Link>
                            <button
                              className="btn-delete"
                              onClick={(e) => deleteHandler(e, course._id)}
                              disabled={isDeleting}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      {/* The link now only wraps the content, not the buttons */}
                      <Link
                        to={`/video/${course._id}`}
                        className="course-card-link"
                      >
                        <div className="video__list__inner">
                          <img src={course.thumbnail} alt={course.name} />
                          <h4>Subject: {course.name}</h4>
                          <p>Topic: {course.topic}</p>
                          <p>Duration: {formatDuration(course.duration)}</p>
                        </div>
                      </Link>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              // <div className="video__list">
              //   {filteredCourses.map((course) => (
              //     <div className="course-card" key={course._id}>
              //       {/* The link now only wraps the content, not the buttons */}
              //       <Link
              //         to={`/video/${course._id}`}
              //         className="course-card-link"
              //       >
              //         <div className="video__list__inner">
              //           <img src={course.thumbnail} alt={course.name} />
              //           <h4>Subject: {course.name}</h4>
              //           <p>Topic: {course.topic}</p>
              //           <p>Duration: {formatDuration(course.duration)}</p>
              //         </div>
              //       </Link>

              //       {/* The buttons are now siblings to the link, not inside it */}
              //       {userInfo &&
              //         userInfo.isTeacher &&
              //         userInfo._id === course.user && (
              //           <div className="course-card-actions">
              //             <Link to={`/edit-course/${course._id}`}>
              //               <button className="btn-edit">Edit</button>
              //             </Link>
              //             <button
              //               className="btn-delete"
              //               onClick={(e) => deleteHandler(e, course._id)}
              //               disabled={isDeleting}
              //             >
              //               Delete
              //             </button>
              //           </div>
              //         )}
              //     </div>
              //   ))}
              // </div>
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
    </>
  );
};

export default HomeScreen;
