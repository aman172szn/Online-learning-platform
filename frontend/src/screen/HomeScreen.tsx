// import { useSelector } from "react-redux";
// import { Link } from "react-router";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import "../sass/screens/homeScreen.scss";

// const HomeScreen = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   return (
//     <>
//       <Header />
//       <div className="homeScreen">
//         <div className="homeScreen__user">
//           <span>{userInfo ? userInfo.name : "User"}</span>, Welcome.
//         </div>
//         <div className="upload">
//           <Link className="upload_button" to="/upload">
//             <div> Upload Button </div>
//           </Link>
//         </div>
//         <div className="homeScreen__video">
//           <h2 className="video__title">Video List</h2>
//           <div className="video__div">
//             <div className="video__div1">
//               <div className="video__list">
//                 <div className="__inner">Thumbnail 1</div>
//                 <div className="__inner">Thumbnail 2</div>
//                 <div className="__inner">Thumbnail 3</div>
//                 <div className="__inner">Thumbnail 4</div>
//                 <div className="__inner">Thumbnail 5</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default HomeScreen;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "../store/slices/coursesApiSlice"; // 1. Import the hook
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../sass/screens/homeScreen.scss";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // 2. Call the hook to fetch course data
  const { data: courses, isLoading, error } = useGetCoursesQuery();

  return (
    <>
      <Header />
      <div className="homeScreen">
        <div className="homeScreen__user">
          <span>{userInfo ? userInfo.name : "User"}</span>, Welcome.
        </div>
        <div className="upload">
          <Link className="upload_button" to="/upload">
            <div> Upload Button </div>
          </Link>
        </div>
        <div className="homeScreen__video">
          <h2 className="video__title">Video List</h2>
          <div className="video__div">
            {/* 3. Add loading and error handling */}
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error?.data?.message || error.error}</div>
            ) : (
              <div className="video__div1">
                <div className="video__list">
                  {/* 4. Map over the courses and display them */}
                  {courses.map((course) => (
                    <div className="__inner" key={course._id}>
                      <img src={course.thumbnail} alt={course.name} />
                      <h3>{course.name}</h3>
                      <p>{course.semester}</p>
                    </div>
                  ))}
                </div>
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
