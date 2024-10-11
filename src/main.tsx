import { createRoot } from "react-dom/client";
import router from "./routing/routes.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>
);
