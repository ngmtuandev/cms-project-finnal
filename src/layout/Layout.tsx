import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "../store";
import { useEffect } from "react";
import { withRouter } from "../hocs";
import path from "../utils/path";
import { USER_LOCAL } from "../utils/constant";

const Layout = ({ navigate }: any) => {
  const queryClient = new QueryClient();
  const token = useAuthStore((state) => state.token);

  const tokenUser = JSON.parse(localStorage.getItem(USER_LOCAL.KEY)!)?.state
    ?.token;

  useEffect(() => {
    if (!tokenUser || !token) {
      navigate(path.SIGN_IN);
    }
  }, [token, tokenUser]);

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
