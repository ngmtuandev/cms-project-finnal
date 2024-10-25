import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import path from "../utils/path";
import {
  AnalysisTransactionWithTypeResult,
  CreateMachinePage,
  CreateProblemPage,
  CreateResultPage,
  CreateSolutionPage,
  CreateStorePage,
  CreateUserPage,
  DashBoardPage,
  DashBoardTransferPage,
  FailurePage,
  HomePage,
  LoginPage,
  MachinePage,
  OverallTransactionPage,
  ProblemPage,
  RecordTransactionPage,
  RegisterPage,
  ResultPage,
  SolutionPage,
  SolutionRequest,
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
          { path: path.DASH_BOARD, element: <DashBoardPage /> },
          {
            path: path.DASH_BOARD_TRANSFER,
            element: <DashBoardTransferPage />,
          },
          { path: path.MANAGER_USER, element: <UserPage /> },
          {
            path: path.OVERALL_TRANSACTION,
            element: <OverallTransactionPage />,
          },
          { path: path.MANAGER_STORE, element: <StorePage /> },
          { path: path.CREATE_USER, element: <CreateUserPage /> },
          { path: path.MANAGER_SOLUTION, element: <SolutionPage /> },
          { path: path.MANAGER_RESULT, element: <ResultPage /> },
          { path: path.MANAGER_MACHINE, element: <MachinePage /> },
          { path: path.MANAGER_PROBLEM, element: <ProblemPage /> },
          { path: path.CREATE_STORE, element: <CreateStorePage /> },
          { path: path.CREATE_PROBLEM, element: <CreateProblemPage /> },
          { path: path.CREATE_MACHINE, element: <CreateMachinePage /> },
          { path: path.CREATE_RESULT, element: <CreateResultPage /> },
          { path: path.CREATE_SOLUTION, element: <CreateSolutionPage /> },
          { path: path.MANAGER_SOLUTION_REQUEST, element: <SolutionRequest /> },
          {
            path: path.MANAGER_RECORD_TRANSACTION,
            element: <RecordTransactionPage />,
          },
          {
            path: path.ANALYSIS_RECORD_WITH_TYPE_RESULT,
            element: <AnalysisTransactionWithTypeResult />,
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
