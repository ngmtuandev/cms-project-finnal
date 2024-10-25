import { Outlet } from "react-router-dom";
import { Header, MenuCustom } from "../../component";
import {
  useAuthStore,
  useCommonStore,
  useOverallRecordStore,
  useRecordByResultStore,
} from "../../store";
import { useEffect } from "react";
import { ROLE } from "../../utils/constant";
import { withRouter } from "../../hocs";
import path from "../../utils/path";
import { message } from "antd";
import { MESSAGE } from "../../utils/message";
import { getStartAndEndOfMonth } from "../../helper";

const HomeAdminPage = ({ navigate }: any) => {
  const { endOfMonth, startOfMonth } = getStartAndEndOfMonth();

  const { infoCurrent } = useAuthStore();
  const { isOpenMenuMobile } = useCommonStore();
  const { setEndDate, setStartDate } = useOverallRecordStore();
  const {
    setEndDate: setEndDateOfSumRecord,
    setStartDate: setStartDateOfSumRecord,
  } = useRecordByResultStore();

  useEffect(() => {
    setEndDate(endOfMonth);
    setStartDate(startOfMonth);
    setEndDateOfSumRecord(endOfMonth);
    setStartDateOfSumRecord(startOfMonth);
  }, []);

  const [messageApi, contextHolder] = message.useMessage();
  const handleLogout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (infoCurrent?.role?.roleName === ROLE.ROLE_USER) {
      messageApi.warning(MESSAGE.NOT_AUTHORIZATION);
      handleLogout();
      navigate(path.SIGN_IN);
    } else {
      navigate(path.DASH_BOARD);
    }
  }, [infoCurrent]);

  return (
    <div>
      {contextHolder}
      <Header />
      <div
        className="flex flex-col md:flex-row xl:flex-row lg:flex-row"
        style={{ display: "flex", height: "100vh", paddingTop: 80, gap: 20 }}
      >
        <div>
          <MenuCustom />
        </div>
        {!isOpenMenuMobile && (
          <div
            className="mt-2 xl:mt-0 lg:mt-0"
            style={{ flex: 1, padding: "20px" }}
          >
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(HomeAdminPage);
