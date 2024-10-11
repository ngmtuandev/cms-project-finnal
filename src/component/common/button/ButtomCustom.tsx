import { TButton } from "../../../type/TButton";
import { Spin } from "antd";
const ButtomCustom = ({ text, style, isLoading }: TButton) => {
  return (
    <button
      style={style}
      className="w-full bg-pink_main rounded-3xl h-10 font-semibold mt-2 text-white"
      type="submit"
    >
      {isLoading ? <Spin size="small" /> : text}
    </button>
  );
};

export default ButtomCustom;
