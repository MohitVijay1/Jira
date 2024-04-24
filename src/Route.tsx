import { createBrowserRouter } from "react-router-dom";
import Login from "./Component/Login/Login";
import {
  ADDPROJECT,
  DASHBOARD,
  LOGIN,
  PROJECT,
  REGISTER,
} from "./utils/Constant";
import Register from "./Component/Register/Register";
import ProtectedRoute from "./Component/ProtectedRoute";
import AddProject from "./Component/AddProject/AddProject";
import Header from "./Component/Header/Header";
import Project from "./Component/Project/Project";
import Dashboard from "./Dashboard/Dashboard";
import ViewProject from "./Component/ViewProject/ViewProject";

const Route = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: DASHBOARD,
        element: (
          <>
            <Header />
            <Dashboard />
          </>
        ),
      },
      {
        path: ADDPROJECT,
        element: (
          <>
            <Header />
            <AddProject />
          </>
        ),
      },
      {
        path: PROJECT,
        element: (
          <>
            <Header />
            <ViewProject />
          </>
        ),
      },
      {
        path: `${PROJECT}/:projectId`,
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
