import { createBrowserRouter } from "react-router-dom";
import Login from "./features/indentiy/components/login/login";
import Register from "./features/indentiy/components/register/register";
import IdentityLayout from "./layouts/identity-layout";
import Courses from "./pages/courses/courses";
import { registerAction } from "./features/indentiy/components/register/register-action";
import { loginAction } from "./features/indentiy/components/login/login-action";
import MainLayout from "./layouts/mainLayout/main-layout";
import { coursesLoader } from "./pages/courses/courses-loader";
import CourseCategories from "./pages/course-categories/course-categories";
import CourseDetails from "./features/courses/components/course-details/course-details";
import { courseDetailsLoader } from "./features/courses/components/course-details/courseDetailsLoader";

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
      {
        path: "courses/:id",
        element: <CourseDetails />,
        loader: courseDetailsLoader,
      },
      {
        path: "course-categories",
        element: <CourseCategories />,
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
