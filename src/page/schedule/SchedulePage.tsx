import { useEffect, useState } from "react";
import { useScheduleStore } from "../../store";
import { DatePicker, Select, Table, TableColumnsType } from "antd";
import { useGetAllSchedule, useGetAllUser } from "../../hooks";
const { RangePicker } = DatePicker;
const SchedulePage = () => {
  const { info, isLoading } = useGetAllUser();
  const [dataSelectTypeResult, setDataSelectTypeResult] = useState([]);
  const [data, setData] = useState([]);
  const {
    setEndDate,
    setStartDate,
    setTeacherId,
    endDate,
    startDate,
    teacherId,
  } = useScheduleStore();

  const { schedule, isLoading: isLoadingSchedule } = useGetAllSchedule();

  useEffect(() => {
    if (info) {
      const convertResult = info?.map((item: any) => {
        return {
          label: item?.userName,
          value: item?.id,
        };
      });
      setDataSelectTypeResult(convertResult);
    }
  }, [isLoading, info]);

  useEffect(() => {
    if (schedule?.isSuccess) {
      setData(schedule?.data);
    }
  }, [schedule, isLoading, endDate, startDate, teacherId]);

  const columns: TableColumnsType<any> = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Kết thúc",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Tên lịch",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phòng dạy",
      dataIndex: ["room", "nameLab"],
      key: "nameLab",
    },
    {
      title: "Giáo viên",
      dataIndex: ["teacher", "userName"],
      key: "userName",
    },
    {
      title: "Mã giáo viên",
      dataIndex: ["teacher", "id"],
      key: "idTeacher",
    },
  ];

  return (
    <div className="flex w-[100%] xl:w-[100%] md:w-[100%] lg:w-[50%] flex-col justify-between p-[20px]">
      <h3 className="uppercase mb-3 md:text-xl text-sm text-pink_main font-semibold">
        Lịch Dạy Của Giáo Viên
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <small className="text-gray-500 mb-1">Lọc theo ngày</small>
          <RangePicker
            placeholder={["bắt đầu", "kết thúc"]}
            style={{ width: 240 }}
            onChange={(_: any, dateString: any) => {
              setEndDate(dateString[1]);
              setStartDate(dateString[0]);
            }}
          />
        </div>
        <div className="flex flex-col">
          <small className="text-gray-500 mb-1">Chọn giáo viên</small>
          <Select
            onChange={(value: string) => {
              setTeacherId(value);
            }}
            style={{ width: 200, height: 30 }}
            allowClear
            options={dataSelectTypeResult}
            placeholder="Chọn giáo viên"
          />
        </div>
      </div>
      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoadingSchedule}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
    </div>
  );
};

export default SchedulePage;
