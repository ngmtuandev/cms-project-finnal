import { TButton } from "../../../type/TButton";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ButtomCustom = ({ text, style, isLoading }: TButton) => {
  return (
    <button
      style={style}
      className="min-w-full flex justify-center items-center bg-pink_main rounded-3xl h-10 font-semibold mt-2 text-white"
      type="submit"
    >
      {text}
      {isLoading && (
        <Spin
          style={{ marginLeft: 8, color: "white" }}
          indicator={<LoadingOutlined spin />}
          size="small"
        />
      )}
      {/* {isLoading ? <Spin size="small" /> : text} */}
    </button>
  );
};

export default ButtomCustom;
