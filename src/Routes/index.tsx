import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Info } from "../pages/Info";
import { AboutUs } from "../pages/AboutUs";
import HomePage from "../pages/HomePage";
import Camine from "../pages/Camine";
import LoginForm from "../components/Login";
import AddUserForm from "../components/register";
import { NewsList } from "../pages/Noutati";
import Layout from "../Layout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorComponent from "../components/errorComponent";
import EditProfileForm from "../pages/UserProfile";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorComponent />,
      children: [
        { path: "/", element: <Info /> },
        { path: "/login", element: <LoginForm /> },
        { path: "/register", element: <AddUserForm /> },
        { path: "/about-us", element: <AboutUs /> },
      ],
    },
    {
      element: <ProtectedRoute />,
      errorElement: <ErrorComponent />,
      children: [
        { path: "/home", element: <HomePage /> },
        { path: "/profile", element: <EditProfileForm /> },
        { path: "/camine", element: <Camine /> },
        { path: "/news", element: <NewsList /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
