import { createBrowserRouter } from "react-router-dom";
import Login from "./features/indentiy/components/login/login";
import Register from "./features/indentiy/components/register/register";
import IdentityLayout from "./layouts/identity-layout";
import Cafe from "./pages/cafe/cafe";
import { registerAction } from "./features/indentiy/components/register/register-action";
import { loginAction } from "./features/indentiy/components/login/login-action";
import MainLayout from "./layouts/mainLayout/main-layout";
import { cafeLoader } from "./pages/cafe/cafe-loader";
import CourseCategories from "./pages/course-categories/course-categories";
import CourseDetails from "./features/courses/components/course-details/course-details";
import { courseDetailsLoader } from "./features/courses/components/course-details/courseDetailsLoader";
import { categoriesLoader } from "./pages/course-categories/categories-loader";
import CategoryProvider from "./features/categories/category-context/category-context";
import UnhandledException from "./pages/unhandled-exception";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        element: <Cafe />,
        index: true,
        // loader: cafeLoader,
      },
      {
        path: "courses/:id",
        element: <CourseDetails />,
        loader: courseDetailsLoader,
      },
      {
        path: "course-categories",
        element: (
          <CategoryProvider>
            <CourseCategories />
          </CategoryProvider>
        ),
        loader: categoriesLoader,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
