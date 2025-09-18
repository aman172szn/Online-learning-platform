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

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route index={true} path="" element={<LandingPage />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/register" element={<Register />} />
      <Route path="/video" element={<VideoScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/upload" element={<UploadScreen />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>
);
