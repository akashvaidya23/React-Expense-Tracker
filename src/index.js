import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Components/Register/Register";
import NavbarUI from "./Components/Navbar/NavbarUI";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm";
import Main from "./Pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarUI />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/AddExpense",
        element: <Main />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
