import { useForm } from "react-hook-form";
import { ButtomCustom, InputCustom } from "../../component";
import { useCreateStore } from "../../hooks";
import { message } from "antd";
import { MESSAGE } from "../../utils/message";

const CreateStorePage = () => {
  // api
  const { mutate: $createStore } = useCreateStore();

  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    // reset,
  } = useForm();

  const handleCreateStore = (value: any) => {
    $createStore(value, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          message.success(MESSAGE.CREATE_STORE_SUCCESS);
        } else {
          message.error(MESSAGE.CREATE_STORE_FAILURE);
        }
      },
      onError() {
        message.error(MESSAGE.CREATE_STORE_FAILURE);
      },
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div>
          <h3 className="font-bold uppercase text-gray-500">
            Tạo mới cửa hàng
          </h3>
        </div>
        <div className="mt-4">
          <form
            onSubmit={handleSubmitForm(handleCreateStore)}
            className="flex flex-col gap-4"
          >
            <InputCustom
              register={register}
              id="storeName"
              errors={formErrors}
              validate={{ require: "Vui lòng nhập tên cửa hàng" }}
              label="Tên cửa hàng"
            ></InputCustom>
            <InputCustom
              register={register}
              id="storeCode"
              errors={formErrors}
              validate={{ require: "Vui lòng nhập mã cửa hàng" }}
              label="Mã cửa hàng"
            ></InputCustom>
            <ButtomCustom text="Tạo mới"></ButtomCustom>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateStorePage;