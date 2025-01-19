import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage/HomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      children: [
         {
            path: "/",
            element: <HomePage />,
         },
      ],
   },
]);

export default router;
