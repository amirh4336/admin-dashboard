import { createBrowserRouter } from "react-router-dom";
import Login from "./features/indentiy/components/login/login";
import Register from "./features/indentiy/components/register/register";
import IdentityLayout from "./layouts/identity-layout";
import Courses from "./pages/courses/courses";
import { registerAction } from "./features/indentiy/components/register/register-action";
import { loginAction } from "./features/indentiy/components/login/login-action";
import MainLayout from "./layouts/mainLayout/main-layout";
import { coursesLoader } from "./pages/courses/courses-loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);

export default router;
