import { Outlet } from "react-router-dom";
import { Header, MenuCustom } from "../../component";
import {
  useCommonStore,
  useOverallRecordStore,
  useRecordByResultStore,
} from "../../store";
import { useEffect } from "react";
import { withRouter } from "../../hocs";
import { message } from "antd";
import { getStartAndEndOfMonth } from "../../helper";

const HomeAdminPage = () => {
  const { endOfMonth, startOfMonth } = getStartAndEndOfMonth();

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

  const [_, contextHolder] = message.useMessage();

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
