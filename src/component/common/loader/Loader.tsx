import { Triangle } from "react-loader-spinner";
import { logo } from "../../../assets";

const Loader = () => {
  return (
    <div className="z-1000 w-screen xl:-ml-40 lg:-ml-40 overflow-hidden h-screen flex flex-col justify-center items-center">
      <img className="mb-4" src={logo}></img>
      <Triangle
        visible={true}
        height="120"
        width="120"
        color="#FFA0BC"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
