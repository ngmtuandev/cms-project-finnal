import { logo } from "../../../assets";
import { useAuthStore } from "../../../store";

const Header = () => {
  const handleLogout = useAuthStore((state) => state.logout);

  return (
    <div
      className="w-screen z-50 shadow-lg md:justify-between fixed md:items-center md:flex lg:items-center lg:flex lg:justify-between 
        xl:items-center xl:flex flex justify-between items-center xl:justify-between md:h-20 lg:h-20 bg-gray-100 px-[4rem]"
    >
      <div>
        <img width={200} src={logo}></img>
      </div>
      <div>
        <span
          onClick={() => handleLogout()}
          className="font-bold text-pink-500 cursor-pointer"
        >
          Đăng xuất
        </span>
      </div>
    </div>
  );
};

export default Header;
