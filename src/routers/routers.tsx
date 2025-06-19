import { createBrowserRouter, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import DashboardPages from "../pages/main/dashboard/dashboard";
import MainLayout from "../layouts/mainLayout";
import AuthLayout from "@/layouts/authLayout";
import AuthPages from "@/pages/auth/auth";
import Dashboard from "../pages/main/dashboard/dashboard";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "/auth",
        element: <AuthPages />,
        loader: () => {
          if (Cookies.get("token")) {
            return redirect("/");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
        loader: () => {
          if (!Cookies.get("token")) {
            return redirect("/auth");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
