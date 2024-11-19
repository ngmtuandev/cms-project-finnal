import { useForm } from "react-hook-form";
import { ButtomCustom, InputCustom } from "../../component";
import {
  useCreateSchedule,
  useGetAllLab,
  useGetAllRole,
  useGetAllUser,
} from "../../hooks";
import { message, Select, TimePicker } from "antd";
import { MESSAGE } from "../../utils/message";
import { useEffect, useState } from "react";
import { useCommonStore, useCreateScheduleStore } from "../../store";
const { RangePicker } = TimePicker;
const CreateSchedulePage = () => {
  // api
  const { mutate: $createSchedule } = useCreateSchedule();

  const { idRoleUser } = useCommonStore();

  const { roles } = useGetAllRole();
  const { info } = useGetAllUser();
  const { labs } = useGetAllLab();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // state
  const [rolesSelect, setRoleSelect] = useState([]);
  const [storeSelect, setStoreSelect] = useState([]);
  const [roleSelected, setRoleSelected] = useState(idRoleUser);
  const [storeSelected, setStoreSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { endDate, setEndDate, setStartDate, startDate } =
    useCreateScheduleStore();

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  useEffect(() => {
    if (info) {
      const roleConvert = info?.map((item: any) => {
        return {
          label: item?.userName,
          value: item?.id,
        };
      });

      setRoleSelect(roleConvert);
    }
    if (labs) {
      const storeConvert = labs?.map((item: any) => {
        return {
          label: item?.nameLab,
          value: item?.id,
        };
      });
      setStoreSelect(storeConvert);
    }
  }, [info, roles, labs]);

  const handleCreateSchedule = (value: any) => {
    const dataCreateSchedule = {
      ...value,
      teacherId: roleSelected,
      labId: storeSelected,
      startTime: startDate,
      endTime: endDate,
    };
    setIsLoading(true);
    $createSchedule(dataCreateSchedule, {
      onSuccess: (response: any) => {
        if (response?.data?.data?.isSuccess) {
          messageApi.success(MESSAGE.CREATE_USER_SUCCESS);
          setIsLoading(false);
          reset();
        } else {
          messageApi.error(
            response?.data?.data?.message || MESSAGE.CREATE_USER_FAILURE
          );
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
          <h3 className="font-bold uppercase text-gray-500">Thêm lịch mới</h3>
        </div>
        <div className="mt-4">
          <form
            onSubmit={handleSubmitForm(handleCreateSchedule)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <small className="text-gray-500 mb-1">Lọc theo ngày</small>
              <RangePicker
                placeholder={["bắt đầu", "kết thúc"]}
                style={{ width: 240 }}
                format="HH:mm" // Chỉ hiển thị giờ:phút trong picker
                onChange={(values) => {
                  if (values) {
                    const start = values[0]!.format("HH:mm"); // Lấy giờ:phút của thời gian bắt đầu
                    const end = values[1]!.format("HH:mm"); // Lấy giờ:phút của thời gian kết thúc
                    setStartDate(start); // Lưu giờ bắt đầu
                    setEndDate(end); // Lưu giờ kết thúc
                  } else {
                    setStartDate(null);
                    setEndDate(null);
                  }
                }}
              />
            </div>
            <InputCustom
              register={register}
              id="date"
              errors={formErrors}
              label="Nhập ngày dạy (Năm - Tháng - Ngày)"
            ></InputCustom>
            <InputCustom
              register={register}
              id="name"
              errors={formErrors}
              label="Loại lịch (tùy chọn)"
            ></InputCustom>
            <div className="flex gap-6 items-center">
              <Select
                key={roleSelected}
                placeholder="Chọn giáo viên viên"
                optionFilterProp="label"
                onChange={(value) => {
                  setRoleSelected(value);
                }}
                options={rolesSelect}
                style={{ width: 200, height: 44 }}
              />
              <Select
                showSearch
                placeholder="Chọn phòng dạy"
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

export default CreateSchedulePage;
