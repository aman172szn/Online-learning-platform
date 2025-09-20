import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const TeacherRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in AND is a teacher
  return userInfo && userInfo.isTeacher ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
export default TeacherRoute;
