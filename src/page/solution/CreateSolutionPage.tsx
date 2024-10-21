import { useForm } from "react-hook-form";
import { ButtomCustom, InputCustom } from "../../component";
import { useCreateSolution } from "../../hooks";
import { message } from "antd";
import { MESSAGE } from "../../utils/message";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateSolutionPage = () => {
  // api
  const { mutate: $createSolution } = useCreateSolution();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  const handleCreateSolution = (value: any) => {
    const { name, description } = value;
    if (!name || !description) {
      toast.warn(MESSAGE.PLEASE_FILL_INPUT);
      return;
    }
    setIsLoading(true);
    $createSolution(value, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.CREATE_SOLUTION_SUCCESS);
          setIsLoading(false);
          reset();
        } else {
          messageApi.error(MESSAGE.CREATE_SOLUTION_FAILURE);
          setIsLoading(false);
          // reset();
        }
      },
      onError() {
        messageApi.error(MESSAGE.CREATE_SOLUTION_FAILURE);
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
            Tạo mới giải pháp
          </h3>
        </div>
        <div className="mt-4">
          <form
            onSubmit={handleSubmitForm(handleCreateSolution)}
            className="flex flex-col gap-4"
          >
            <InputCustom
              register={register}
              id="name"
              errors={formErrors}
              validate={{ required: "Vui lòng nhập tên của giải pháp" }}
              label="Tên giải pháp"
            ></InputCustom>
            <InputCustom
              register={register}
              id="description"
              errors={formErrors}
              validate={{ required: "Vui lòng nhập mô tả giải pháp" }}
              label="Mô tả giải pháp"
            ></InputCustom>
            <ButtomCustom isLoading={isLoading} text="Tạo mới"></ButtomCustom>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateSolutionPage;
