import { useForm } from "react-hook-form";
import { ButtomCustom, InputCustom } from "../../component";
import { useCreateResult, useGetAllProblem } from "../../hooks";
import { message, Select } from "antd";
import { MESSAGE } from "../../utils/message";
import { useEffect, useState } from "react";

const CreateResultPage = () => {
  // api
  const { mutate: $createResult } = useCreateResult();
  const { problem } = useGetAllProblem();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);
  const [problemSelect, setProblemSelect] = useState();
  const [problemIdSelected, setProblemIdSelected] = useState("");

  useEffect(() => {
    const convertProblem = problem?.map((item: any) => {
      return {
        label: item?.typeProblem,
        value: item?.id,
      };
    });

    setProblemSelect(convertProblem);
  }, [problem]);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  const handleCreateResult = (value: any) => {
    setIsLoading(true);
    $createResult(
      { ...value, problem: problemIdSelected },
      {
        onSuccess: (response) => {
          if (response?.status === 200) {
            messageApi.success(MESSAGE.CREATE_RESULT_SUCCESS);
            setIsLoading(false);
            reset();
          } else {
            messageApi.error(MESSAGE.CREATE_RESULT_FAILURE);
            setIsLoading(false);
          }
        },
        onError() {
          messageApi.error(MESSAGE.CREATE_RESULT_FAILURE);
          setIsLoading(false);
        },
      }
    );
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
            <Select
              showSearch
              placeholder="Chọn vấn đề"
              optionFilterProp="label"
              onChange={(value) => {
                setProblemIdSelected(value);
              }}
              style={{ width: 200, height: 44 }}
              onSearch={() => {}}
              options={problemSelect}
            />
            <ButtomCustom isLoading={isLoading} text="Tạo mới"></ButtomCustom>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateResultPage;
