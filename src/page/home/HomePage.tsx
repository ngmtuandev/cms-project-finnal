import { useEffect } from "react";
import { useAuthStore } from "../../store";
import { ROLE } from "../../utils/constant";
import HomeUserPage from "./HomeUserPage";
import { withRouter } from "../../hocs";
import path from "../../utils/path";

const HomePage = ({ navigate }: any) => {
  const userInfo = useAuthStore((state) => state.infoCurrent);
  useEffect(() => {
    if (userInfo?.role?.roleName == ROLE.ROLE_ADMIN) {
      navigate(path.ADMIN);
    }
  }, [userInfo]);

  return <HomeUserPage />;
};

export default withRouter(HomePage);
