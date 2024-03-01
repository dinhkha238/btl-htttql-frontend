import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./pages/admin-page/views/admin";
import { AdminPath, LoginAdminPath } from "./pages/router";
import { LayoutAdmin } from "./pages/admin-page/views/login";

export const routers = createBrowserRouter([
  {
    path: LoginAdminPath,
    element: <LayoutAdmin />,
  },
  {
    path: AdminPath,
    element: <Admin />,
  },
]);
