import { success } from "../../assets";
import { ArrowRightOutlined } from "@ant-design/icons";
import { withRouter } from "../../hocs";
import path from "../../utils/path";

const SuccessPage = ({ navigate }: any) => {
  return (
    <div className="w-screen h-screen flex-col flex justify-center items-center bg-pink_light">
      <img src={success}></img>
      <span className="my-4 font-semibold text-2xl text-pink_main">
        Lưu lại lịch sử giao dịch thành công!
      </span>
      <button
        onClick={() => navigate(path.HOME)}
        className="font-semibold flex justify-center items-center gap-2"
      >
        Quay lại <ArrowRightOutlined />
      </button>
    </div>
  );
};

export default withRouter(SuccessPage);
