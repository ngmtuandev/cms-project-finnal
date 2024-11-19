import { useEffect } from "react";
import HomeUserPage from "./HomeUserPage";
import { withRouter } from "../../hocs";
import path from "../../utils/path";

const HomePage = ({ navigate }: any) => {
  useEffect(() => {
    navigate(path.ADMIN);
  }, []);

  return <HomeUserPage />;
};

export default withRouter(HomePage);
