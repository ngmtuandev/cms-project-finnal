import { useForm } from "react-hook-form";
import { ButtomCustom, InputCustom } from "../../component";
import { useCreateResult } from "../../hooks";
import { message } from "antd";
import { MESSAGE } from "../../utils/message";
import { useState } from "react";

const CreateResultPage = () => {
  // api
  const { mutate: $createResult } = useCreateResult();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    // reset,
  } = useForm();

  const handleCreateResult = (value: any) => {
    setIsLoading(true);
    $createResult(value, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.CREATE_RESULT_SUCCESS);
          setIsLoading(false);
        } else {
          messageApi.error(MESSAGE.CREATE_RESULT_FAILURE);
          setIsLoading(false);
        }
      },
      onError() {
        messageApi.error(MESSAGE.CREATE_RESULT_FAILURE);
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div>
          <h3 className="font-bold uppercase text-gray-500">Tạo mới kết quả</h3>
        </div>
        <div className="mt-4">
          <form
            onSubmit={handleSubmitForm(handleCreateResult)}
            className="flex flex-col gap-4"
          >
            <InputCustom
              register={register}
              id="typeResult"
              errors={formErrors}
              validate={{ required: "Vui lòng nhập loại kết quả" }}
              label="Tên (loại) kết quả"
            ></InputCustom>
            <ButtomCustom isLoading={isLoading} text="Tạo mới"></ButtomCustom>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateResultPage;
