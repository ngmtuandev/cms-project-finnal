import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { withRouter } from "../hocs";
import path from "../utils/path";
import { useCommonStore } from "../store";

const Layout = ({ navigate }: any) => {
  const queryClient = new QueryClient();
  const isLoggedIn = useCommonStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    } else {
      navigate(path.ADMIN);
    }
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
