import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { withRouter } from "../hocs";
import path from "../utils/path";

const Layout = ({ navigate }: any) => {
  const queryClient = new QueryClient();

  useEffect(() => {
    navigate(path.ADMIN);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Outlet></Outlet>
    </QueryClientProvider>
  );
};

export default withRouter(Layout);
