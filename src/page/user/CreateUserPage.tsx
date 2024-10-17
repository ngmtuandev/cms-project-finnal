import { useForm } from "react-hook-form";
import { ButtomCustom, InputCustom } from "../../component";
import { useCreateUser, useGetAllRole, useGetAllStore } from "../../hooks";
import { message, Select } from "antd";
import { MESSAGE } from "../../utils/message";
import { useEffect, useState } from "react";

const CreateUserPage = () => {
  // api
  const { mutate: $createUser } = useCreateUser();

  const { roles } = useGetAllRole();
  const { stores } = useGetAllStore();

  const [messageApi, contextHolder] = message.useMessage();

  // state
  const [rolesSelect, setRoleSelect] = useState([]);
  const [storeSelect, setStoreSelect] = useState([]);
  const [roleSelected, setRoleSelected] = useState();
  const [storeSelected, setStoreSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  useEffect(() => {
    if (roles) {
      const roleConvert = roles?.data?.map((item: any) => {
        return {
          label: item?.roleName,
          value: item?.id,
        };
      });
      setRoleSelect(roleConvert);
    }
    if (stores) {
      const storeConvert = stores?.map((item: any) => {
        return {
          label: item?.storeName,
          value: item?.id,
        };
      });
      setStoreSelect(storeConvert);
    }
  }, [stores, roles]);

  const handleCreateUser = (value: any) => {
    const dataCreateUser = {
      ...value,
      role: roleSelected,
      store: storeSelected,
      status: true,
    };
    setIsLoading(true);
    $createUser(dataCreateUser, {
      onSuccess: (response) => {
        if (response?.data?.status === 200) {
          messageApi.success(MESSAGE.CREATE_USER_SUCCESS);
          setIsLoading(false);
          reset();
        } else {
          messageApi.error(MESSAGE.CREATE_USER_FAILURE);
          setIsLoading(false);
        }
      },
      onError() {
        messageApi.error(MESSAGE.CREATE_USER_FAILURE);
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div>
          <h3 className="font-bold uppercase text-gray-500">
            Thêm nhân viên mới
          </h3>
        </div>
        <div className="mt-4">
          <form
            onSubmit={handleSubmitForm(handleCreateUser)}
            className="flex flex-col gap-4"
          >
            <InputCustom
              register={register}
              id="userName"
              errors={formErrors}
              validate={{
                required: "Vui lòng nhập tên đăng nhập cho nhân viên",
              }}
              label="Tên đăng nhập (phải là duy nhất)"
            ></InputCustom>
            <InputCustom
              register={register}
              id="name"
              errors={formErrors}
              validate={{ required: "Vui lòng nhập tên nhân viên" }}
              label="Tên nhân viên"
            ></InputCustom>
            <InputCustom
              register={register}
              id="password"
              errors={formErrors}
              validate={{ required: "Vui lòng nhập mật khẩu" }}
              label="Mật khẩu tài khoản"
            ></InputCustom>
            <InputCustom
              register={register}
              id="description"
              errors={formErrors}
              validate={{
                required: "Vui lòng nhập thêm thông tin (số điện thoại...)",
              }}
              label="Thông tin (số điện thoại...)"
            ></InputCustom>
            <div className="flex gap-6 items-center">
              <Select
                placeholder="Chọn quyền nhân viên"
                optionFilterProp="label"
                onChange={(value) => {
                  setRoleSelected(value);
                }}
                options={rolesSelect}
                style={{ width: 200, height: 44 }}
              />
              <Select
                showSearch
                placeholder="Chọn cửa hàng"
                optionFilterProp="label"
                onChange={(value) => {
                  setStoreSelected(value);
                }}
                style={{ width: 200, height: 44 }}
                onSearch={() => {}}
                options={storeSelect}
              />
            </div>
            <ButtomCustom isLoading={isLoading} text="Tạo mới"></ButtomCustom>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUserPage;
