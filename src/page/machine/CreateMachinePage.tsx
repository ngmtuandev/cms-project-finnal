import { useForm } from "react-hook-form";
import { ButtomCustom, InputCustom } from "../../component";
import { useCreateMachine, useGetAllStore } from "../../hooks";
import { message, Select } from "antd";
import { MESSAGE } from "../../utils/message";
import { useEffect, useState } from "react";

const CreateMachinePage = () => {
  // api
  const { mutate: $createMachine } = useCreateMachine();

  const { stores } = useGetAllStore();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);
  const [storeSelect, setStoreSelect] = useState([]);
  const [storeSelected, setStoreSelected] = useState();

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  useEffect(() => {
    if (stores) {
      const storeConvert = stores?.map((item: any) => {
        return {
          label: item?.storeName,
          value: item?.id,
        };
      });
      setStoreSelect(storeConvert);
    }
  }, [stores]);

  const handleCreateMachine = (value: any) => {
    setIsLoading(true);
    $createMachine(
      { ...value, store: storeSelected },
      {
        onSuccess: (response) => {
          if (response?.status === 200) {
            messageApi.success(MESSAGE.CREATE_MACHINE_SUCCESS);
            setIsLoading(false);
            reset();
          } else {
            messageApi.error(MESSAGE.CREATE_MACHINE_FAILURE);
            setIsLoading(false);
          }
        },
        onError() {
          messageApi.error(MESSAGE.CREATE_MACHINE_FAILURE);
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
          <h3 className="font-bold uppercase text-gray-500">Tạo mới máy</h3>
        </div>
        <div className="mt-4">
          <form
            onSubmit={handleSubmitForm(handleCreateMachine)}
            className="flex flex-col gap-4"
          >
            <InputCustom
              register={register}
              id="codeMachine"
              errors={formErrors}
              validate={{ required: "Vui lòng nhập mã máy (là duy nhất)" }}
              label="Mã máy (là duy nhất)"
            ></InputCustom>
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
            <ButtomCustom isLoading={isLoading} text="Tạo mới"></ButtomCustom>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateMachinePage;
