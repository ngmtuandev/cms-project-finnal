import { error } from "../../assets";
const FailurePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-pink_light">
      <img src={error}></img>
      <span className="my-4 font-semibold text-2xl text-pink_main">
        Lưu lại lịch sử giao dịch thất bại!
      </span>
    </div>
  );
};

export default FailurePage;
