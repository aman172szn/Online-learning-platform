import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import LandingPage from "./screen/LandingPage";
import Register from "./screen/util/Register";
import HomeScreen from "./screen/HomeScreen";
import VideoScreen from "./screen/VideoScreen";
import ProfileScreen from "./screen/ProfileScreen";
import UploadScreen from "./screen/UploadScreen";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux
import { Provider } from "react-redux";
import { store } from "./store/store";

// private route
import PrivateRoute from "./components/PrivateRoute";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route index={true} path="" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />

      {/* <Route path="" element={<PrivateRoute />}> */}
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/video" element={<VideoScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/upload" element={<UploadScreen />} />
      {/* </Route> */}
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
