import { logo } from "../../../assets";
import { useAuthStore } from "../../../store";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const handleLogout = useAuthStore((state) => state.logout);

  return (
    <div
      className="w-screen z-50 shadow-lg md:justify-between fixed md:items-center md:flex lg:items-center lg:flex lg:justify-between 
        xl:items-center xl:flex flex justify-between items-center xl:justify-between md:h-20 min-h-16 lg:h-20 bg-gray-100 px-[4rem]"
    >
      <div>
        <img
          className="md:w-[200px] lg:w-[200px] xl:w-[200px] w-[140px] sm:w-[140px] "
          src={logo}
        ></img>
      </div>
      <div>
        <span
          onClick={() => handleLogout()}
          className="font-semibold flex items-center gap-2 md:text-[16px] lg:text-[16px] xl:text-[16px] text-pink_main cursor-pointer"
        >
          Đăng xuất
          <LogoutOutlined />
        </span>
      </div>
    </div>
  );
};

export default Header;
