// import { logo } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useCommonStore } from "../../../store";
import {
  // LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const Header = () => {
  // const handleLogout = useAuthStore((state) => state.logout);
  const { isOpenMenuMobile, setIsOpenMenuMobile } = useCommonStore();
  const setIsLoggedIn = useCommonStore((state) => state.setIsLoggedIn);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    setIsLoggedIn(false);
  };
  return (
    <div
      className="w-screen z-50 bg-opacity-80 shadow-lg md:justify-between fixed 
      md:items-center md:flex lg:items-center lg:flex lg:justify-between 
      xl:items-center xl:flex flex justify-between items-center xl:justify-between 
      md:h-20 min-h-16 lg:h-20 bg-pink_main lg:px-[4rem] xl:px-[4rem] px-[1rem] md:px-[4rem]"
    >
      <div>
        <span className="text-2xl font-bold text-black">MANAGE LAB</span>
      </div>
      <div>
        <span
          className="cursor-pointer text-white text-xl md:hidden xl:hidden lg:hidden"
          onClick={() => setIsOpenMenuMobile(!isOpenMenuMobile)}
        >
          {isOpenMenuMobile ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </span>
        {/* <span
          onClick={() => handleLogout()}
          className="font-semibold hidden md:flex xl:flex lg:flex items-center gap-2 md:text-[16px] lg:text-[16px] xl:text-[16px] text-white cursor-pointer"
        >
          Đăng xuất
          <LogoutOutlined />
        </span> */}
        <div
          onClick={handleLogout}
          className="font-semibold p-[12px] bg-sky-600 text-white rounded-md cursor-pointer hover:bg-opacity-85"
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default Header;
