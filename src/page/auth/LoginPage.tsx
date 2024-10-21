import { useForm } from "react-hook-form";
import { logo, thumb } from "../../assets";
import { ButtomCustom, InputCustom } from "../../component";
import { useLogin } from "../../hooks";
import { message } from "antd";
import { MESSAGE } from "../../utils/message";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store";
import { withRouter } from "../../hocs";
import path from "../../utils/path";

const LoginPage = ({ navigate }: any) => {
  const { mutate: $handleLogin } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const setLogin = useAuthStore((state) => state.login);
  const setInfoCurrent = useAuthStore((state) => state.setInfoCurrent);
  const token = useAuthStore((state) => state.token);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    // reset,
  } = useForm();

  const handleLogin = (data: any) => {
    setIsLoading(true);
    $handleLogin(data, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.LOGIN_SUCCESS);
          setLogin(response?.data);
          setInfoCurrent(response?.user);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
          navigate(path.HOME);
        } else {
          setIsLoading(false);
          messageApi.error(MESSAGE.LOGIN_FAIL);
        }
      },
      onError() {
        setIsLoading(false);
        messageApi.error(MESSAGE.LOGIN_FAIL);
      },
    });
  };

  useEffect(() => {
    if (token) navigate(path.HOME);
  }, []);

  return (
    <>
      {contextHolder}
      <div
        className="flex pb-[40px] flex-col pt-[1.4rem] w-screen sm:px-[24px] px-[24px] md:px-[12px] md:items-center md:gap-12 
      lg:items-center md:justify-center lg:gap-12 lg:px-[12px] md:flex-row lg:flex-row min-h-screen bg-pink_light"
      >
        <div className="flex md:w-[40%] lg:w-[40%] flex-col justify-center items-center my-4">
          <img
            className="md:mb-12 block md:hidden lg:hidden lg:mb-12 mb-10"
            src={logo}
          ></img>
          <img src={thumb}></img>
        </div>
        <form
          className="md:w-[40%] lg:w-[40%] flex flex-col md:gap-4"
          onSubmit={handleSubmitForm(handleLogin)}
        >
          <img
            className="sm:hidden hidden md:block lg:block"
            width={200}
            height={200}
            src={logo}
          ></img>
          <InputCustom
            register={register}
            id="userName"
            errors={formErrors}
            validate={{ required: "Vui lòng nhập tên đăng nhập" }}
            label="Tên đăng nhập"
            height="4.6vh"
          ></InputCustom>
          <InputCustom
            label="Mật khẩu"
            type="password"
            register={register}
            id="password"
            errors={formErrors}
            validate={{ required: "Vui lòng nhập mật khẩu" }}
            height="4.6vh"
          ></InputCustom>
          <div className="w-[100%]">
            <ButtomCustom isLoading={isLoading} text="Đăng nhập"></ButtomCustom>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(LoginPage);
