// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useGetCoursesQuery } from "../store/slices/coursesApiSlice"; // 1. Import the hook
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import "../sass/screens/homeScreen.scss";

// const HomeScreen = () => {
//   const { userInfo } = useSelector((state) => state.auth);

//   // 2. Call the hook to fetch course data
//   const { data: courses, isLoading, error } = useGetCoursesQuery();

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
//           <h2 className="video__title">Video List</h2>
//           <div className="video__div">
//             {/* 3. Add loading and error handling */}
//             {isLoading ? (
//               <div>Loading...</div>
//             ) : error ? (
//               <div>{error?.data?.message || error.error}</div>
//             ) : (
//               <div className="video__div1">
//                 <div className="video__list">
//                   {/* 4. Map over the courses and display them */}
//                   {courses.map((course) => (
//                     <div className="__inner" key={course._id}>
//                       <img src={course.thumbnail} alt={course.name} />
//                       <h3>{course.name}</h3>
//                       <p>{course.semester}</p>
//                     </div>
//                   ))}
//                 </div>
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

import { useState } from "react"; // 1. Import useState
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "../store/slices/coursesApiSlice";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../sass/screens/homeScreen.scss";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // 2. Add state for the semester filter
  const [semester, setSemester] = useState("");

  // 3. Pass the semester state to the query
  const { data: courses, isLoading, error } = useGetCoursesQuery({ semester });

  return (
    <>
      <Header />
      <div className="homeScreen">
        <div className="homeScreen__user">
          <span>{userInfo ? userInfo.name : "User"}</span>, Welcome.
        </div>
        <div className="upload">
          {userInfo && userInfo.isTeacher && (
            <Link className="upload_button" to="/upload">
              <div> Upload Button </div>
            </Link>
          )}
        </div>

        <div className="homeScreen__video">
          <div className="video__header">
            <h2 className="video__title">Video List</h2>
            {/*FILTER DROPDOWN */}
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
          </div>
          <div className="video__div">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error?.data?.message || error.error}</div>
            ) : courses && courses.length > 0 ? (
              <div className="video__div1">
                <div className="video__list">
                  {courses.map((course) => (
                    <div className="__inner" key={course._id}>
                      <img src={course.thumbnail} alt={course.name} />
                      <h3>{course.name}</h3>
                      <p>Semester: {course.semester}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // This is the new message for when there are no courses
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
