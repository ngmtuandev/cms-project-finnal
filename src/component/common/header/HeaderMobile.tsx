import { logo } from "../../../assets";
import { useAuthStore } from "../../../store";
import { LogoutOutlined } from "@ant-design/icons";

const HeaderMobile = ({ userName }: { userName: string }) => {
  const handleLogout = useAuthStore((state) => state.logout);

  return (
    <div className="w-screen h-16 flex justify-between px-[8px] bg-opacity-65 items-center fixed   xl:px-[40px] lg:px-[40px] md:h-16 bg-pink-200">
      <div>
        <img width={160} src={logo}></img>
      </div>
      <div>
        <span className="font-semibold text-sm text-pink-500 pr-[8px] border-r-2 border-pink-500">
          Xin chào, {userName}
        </span>
        <span
          onClick={() => handleLogout()}
          className="pl-[8px] font-semibold text-pink-500 cursor-pointer"
        >
          <LogoutOutlined size={100} />
        </span>
      </div>
    </div>
  );
};

export default HeaderMobile;
