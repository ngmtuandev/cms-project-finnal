import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import path from "../utils/path";
import {
  AnalysisTransactionWithTypeResult,
  CreateMachinePage,
  CreateProblemPage,
  CreateResultPage,
  CreateSchedulePage,
  CreateSolutionPage,
  CreateStorePage,
  DashBoardPage,
  DashBoardTransferPage,
  FailurePage,
  HistoryPage,
  HistoryTeacherPage,
  MachinePage,
  OverallTransactionPage,
  ProblemPage,
  RecordTransactionPage,
  RegisterPage,
  ResultPage,
  SchedulePage,
  SolutionPage,
  SolutionRequest,
  SuccessPage,
  UserPage,
} from "../page";
import HomeAdminPage from "../page/home/HomeAdminPage";
import LabManagePage from "../page/lab/LabManagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
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
          { path: path.SCHEDULE_MANAGE, element: <SchedulePage /> },
          { path: path.SCHEDULE_CREATE, element: <CreateSchedulePage /> },
          { path: path.MANAGER_SOLUTION, element: <SolutionPage /> },
          // History
          { path: path.HISTORY_MANAGE, element: <HistoryPage /> },
          {
            path: path.HISTORY_MANAGE_TEACHER,
            element: <HistoryTeacherPage />,
          },
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
          { path: path.LAB_MANAGE, element: <LabManagePage /> },
        ],
      },
      { path: path.SIGN_UP, element: <RegisterPage /> },
      { path: path.UPLOAD_RECORD_SUCCESS, element: <SuccessPage /> },
      { path: path.UPLOAD_RECORD_FAILURE, element: <FailurePage /> },
    ],
  },
]);

export default router;
