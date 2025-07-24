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

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route index={true} path="" element={<LandingPage />} />
      <Route index={true} path="/home" element={<HomeScreen />} />
      <Route index={true} path="/register" element={<Register />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>
);
