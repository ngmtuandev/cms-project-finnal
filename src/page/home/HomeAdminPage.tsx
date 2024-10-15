import { Outlet } from "react-router-dom";
import { Header, MenuCustom } from "../../component";
import { useAuthStore } from "../../store";
import { useEffect } from "react";
import { ROLE } from "../../utils/constant";
import { withRouter } from "../../hocs";
import path from "../../utils/path";
import { message } from "antd";
import { MESSAGE } from "../../utils/message";

const HomeAdminPage = ({ navigate }: any) => {
  const { infoCurrent } = useAuthStore();
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (infoCurrent?.role?.roleName === ROLE.ROLE_USER) {
      messageApi.warning(MESSAGE.NOT_AUTHORIZATION);
      handleLogout();
      navigate(path.SIGN_IN);
    }
  }, [infoCurrent]);
  return (
    <div>
      {contextHolder}
      <Header />
      <div style={{ display: "flex", height: "100vh", paddingTop: 80 }}>
        <div style={{ width: "256px" }}>
          <MenuCustom />
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default withRouter(HomeAdminPage);
