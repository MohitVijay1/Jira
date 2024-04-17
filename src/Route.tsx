import { createBrowserRouter } from "react-router-dom";
import Login from "./Component/Login/Login";
import HomePage from "./Component/HomePage/HomePage";
import Register from "./Component/Register/Register";
import ProtectedRoute from "./Component/ProtectedRoute";
import AddProject from "./Component/AddProject/AddProject";
import Header from "./Component/Header/Header";
import Project from "./Component/Project/Project";

const Route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/homepage",
        element: (
          <>
            <Header />
            <HomePage />
          </>
        ),
      },
      {
        path: "/addproject",
        element: (
          <>
            <Header />
            <AddProject />
          </>
        ),
      },
      {
        path: "/project/:projectId",
        element: (
          <>
            <Header />
            <Project />
          </>
        ),
      },
    ],
  },
]);
export default Route;
