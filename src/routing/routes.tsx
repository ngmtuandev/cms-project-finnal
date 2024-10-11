import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import path from "../utils/path";
import {
  CreateStorePage,
  FailurePage,
  HomePage,
  LoginPage,
  MachinePage,
  RecordTransactionPage,
  RegisterPage,
  ResultPage,
  SolutionPage,
  StorePage,
  SuccessPage,
  UserPage,
} from "../page";
import HomeAdminPage from "../page/home/HomeAdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      { path: path.SIGN_IN, element: <LoginPage /> },
      {
        path: path.HOME,
        element: <HomePage />,
      },
      {
        path: path.ADMIN,
        element: <HomeAdminPage />,
        children: [
          { path: path.MANAGER_USER, element: <UserPage /> },
          { path: path.MANAGER_STORE, element: <StorePage /> },
          { path: path.MANAGER_SOLUTION, element: <SolutionPage /> },
          { path: path.MANAGER_RESULT, element: <ResultPage /> },
          { path: path.MANAGER_MACHINE, element: <MachinePage /> },
          { path: path.CREATE_STORE, element: <CreateStorePage /> },
          {
            path: path.MANAGER_RECORD_TRANSACTION,
            element: <RecordTransactionPage />,
          },
        ],
      },
      { path: path.SIGN_UP, element: <RegisterPage /> },
      { path: path.UPLOAD_RECORD_SUCCESS, element: <SuccessPage /> },
      { path: path.UPLOAD_RECORD_FAILURE, element: <FailurePage /> },
    ],
  },
]);

export default router;
