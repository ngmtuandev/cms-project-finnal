import { Outlet } from "react-router-dom";
import { Header, MenuCustom } from "../../component";

const HomeAdminPage = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", height: "100vh" }}>
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

export default HomeAdminPage;
