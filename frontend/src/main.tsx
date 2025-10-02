import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import LoginScreen from "./screen/util/Login";
import Register from "./screen/util/Register";
import HomeScreen from "./screen/HomeScreen";
import VideoScreen from "./screen/VideoScreen";
import ProfileScreen from "./screen/ProfileScreen";
import AdminScreen from "./screen/AdminScreen";
import EditCourseScreen from "./screen/EditScreen";

import UploadScreen from "./screen/UploadScreen";
import UploadFileScreen from "./screen/util/uploadFileScreen";
import UploadYoutubeScreen from "./screen/util/UploadYoutubeScreen";
// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux
import { Provider } from "react-redux";
import { store } from "./store/store";

// private route
import PrivateRoute from "./components/PrivateRoute";
import TeacherRoute from "./components/TeacherRoute";
import AdminRoute from "./components/AdminRoute";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route index={true} path="" element={<LoginScreen />} />
      <Route path="/register" element={<Register />} />

      {/* <Route path="" element={<PrivateRoute />}> */}
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/video/:id" element={<VideoScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      {/* </Route> */}

      {/* teacher route */}
      <Route path="" element={<TeacherRoute />}>
        <Route path="/upload" element={<UploadScreen />} />
        <Route path="/upload/file" element={<UploadFileScreen />} />
        <Route path="/upload/youtube" element={<UploadYoutubeScreen />} />
        <Route path="/edit-course/:id" element={<EditCourseScreen />} />
      </Route>
      {/* admin route */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/users" element={<AdminScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={route}></RouterProvider>
      <ToastContainer autoClose={2000} />
    </StrictMode>
  </Provider>
);
