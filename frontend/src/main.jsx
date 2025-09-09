import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import UploadResume from "./pages/UploadResume";
import Analytics from "./pages/Analytics";
import ScrapedJD from "./pages/ScrapedJD";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "upload", element: <UploadResume /> },
      { path: "analytics", element: <Analytics /> },
      { path: "jds", element: <ScrapedJD /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
