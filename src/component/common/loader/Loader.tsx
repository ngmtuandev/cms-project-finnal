import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="z-1000 w-screen h-screen flex justify-center items-center">
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
