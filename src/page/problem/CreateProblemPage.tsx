import { useForm } from "react-hook-form";
import { ButtomCustom, InputCustom } from "../../component";
import { useCreateProblem } from "../../hooks";
import { message } from "antd";
import { MESSAGE } from "../../utils/message";
import { useState } from "react";

const CreateProblemPage = () => {
  // api
  const { mutate: $createProblem } = useCreateProblem();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  const handleCreateProblem = (value: any) => {
    setIsLoading(true);
    $createProblem(value, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.CREATE_PROBLEM_SUCCESS);
          setIsLoading(false);
          reset();
        } else {
          messageApi.error(MESSAGE.CREATE_PROBLEM_FAILURE);
          setIsLoading(false);
        }
      },
      onError() {
        messageApi.error(MESSAGE.CREATE_PROBLEM_FAILURE);
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div>
          <h3 className="font-bold uppercase text-gray-500">Tạo mới vấn đề</h3>
        </div>
        <div className="mt-4">
          <form
            onSubmit={handleSubmitForm(handleCreateProblem)}
            className="flex flex-col gap-4"
          >
            <InputCustom
              register={register}
              id="typeProblem"
              errors={formErrors}
              validate={{ required: "Vui lòng nhập vấn đề" }}
              label="Tên (loại) vấn đề"
            ></InputCustom>
            <ButtomCustom isLoading={isLoading} text="Tạo mới"></ButtomCustom>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProblemPage;
