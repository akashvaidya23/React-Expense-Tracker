import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Components/Register/Register";
import NavbarUI from "./Components/Navbar/NavbarUI";
import Main from "./Pages/Main";
import Protected from "./Components/Proteced/Protected";
import Login from "./Components/Login/Login";
import TitleForm from "./Components/Titles/TitleForm";
import Public from "./Components/Public/Public";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public Cmp={Login} />,
    // <Register />,
    // path: "/",
    // element: <NavbarUI />,
    // children: [
    //   {
    //     path: "/register",
    //     element: <Register />,
    //   },
    //   {
    //     path: "/AddExpense",
    //     element: <Main />,
    //   },
    // ],
  },
  {
    path: "/register",
    element: <Public Cmp={Register} />,
  },
  {
    path: "/AddExpense/:titleID?",
    element: <Protected Cmp={Main} />,
  },
  {
    path: "/AddTitle",
    element: <Protected Cmp={TitleForm} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
