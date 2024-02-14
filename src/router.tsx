import { createBrowserRouter } from "react-router-dom";
import Login from "./features/indentiy/components/login/login";
import Register from "./features/indentiy/components/register/register";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/main-layout";
import Courses from "./pages/courses";
import { registerAction } from "./features/indentiy/components/register/register-action";
import { loginAction } from "./features/indentiy/components/login/login-action";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Courses />,
        index: true,
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
