import { createBrowserRouter } from "react-router-dom";
import Login from "./features/indentiy/components/login";
import Register, { registerAction } from "./features/indentiy/components/register";
import IdentityLayout from "./layouts/identity-layout";

const router = createBrowserRouter([
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement : <Register />
      },
    ],
  },
]);

export default router;