import { useEffect, useState } from "react";
import { useHistoryOfTeacherStore } from "../../store";
import { DatePicker, Select, Table, TableColumnsType, Tag } from "antd";
import { useGetAllUser } from "../../hooks";
import { convertTimestampToDateTime } from "../../helper";
import { useGetAllHistoryOfTeacher } from "../../hooks/history/useGetAllHistoryOfTeacher";
const { RangePicker } = DatePicker;
const HistoryTeacherPage = () => {
  const { info } = useGetAllUser();
  const [dataSelectTypeResult, setDataSelectTypeResult] = useState([]);
  const [data, setData] = useState([]);
  const {
    endDate,
    teacherId,
    setEndDate,
    setTeacherId,
    setStartDate,
    startDate,
  } = useHistoryOfTeacherStore();

  const { historyTeacher, isLoading } = useGetAllHistoryOfTeacher();

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
    console.log("history teacher: ", historyTeacher);
    if (historyTeacher?.isSuccess) {
      setData(historyTeacher?.data);
    }
  }, [historyTeacher, isLoading, endDate, startDate, teacherId]);

  const columns: TableColumnsType<any> = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Thời gian vào",
      dataIndex: "checkinTime",
      key: "checkinTime",
      render: (data: any) => {
        return <span>{convertTimestampToDateTime(data)}</span>;
      },
    },
    {
      title: "Thời gian ra",
      dataIndex: "checkoutTime",
      key: "checkoutTime",
      render: (data: any) => {
        return <span>{convertTimestampToDateTime(data)}</span>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "hasCheckedIn",
      key: "hasCheckedIn",
      render: (data: any) => {
        return <span>{data ? "Đã checkin" : "Chưa checkin"}</span>;
      },
    },
    {
      title: "Phòng",
      dataIndex: "lab",
      key: "lab",
    },
    {
      title: "Số phút vào trễ",
      dataIndex: "lateCheckinMinutes",
      key: "lateCheckinMinutes",
      render: (data: any) => {
        return <span>{data ? `${data} phút` : "0"}</span>;
      },
    },
    {
      title: "Đúng phòng",
      dataIndex: "isCorrect",
      key: "isCorrect",
      render: (data: any) => {
        return <span>{data ? "Đúng" : "Sai"}</span>;
      },
    },
    {
      title: "Ra ca sớm",
      dataIndex: "isEarlyCheckout",
      key: "isEarlyCheckout",
      render: (data: any) => {
        return <Tag color="green">{data ? "Không" : "Có"}</Tag>;
      },
    },
    {
      title: "Vào ca trễ",
      dataIndex: "isLateCheckin",
      key: "isLateCheckin",
      render: (data: any) => {
        return <Tag color="gold">{data ? "Có" : "Không"}</Tag>;
      },
    },
  ];

  return (
    <div className="flex w-[100%] xl:w-[100%] md:w-[100%] lg:w-[50%] flex-col justify-between p-[20px]">
      <h3 className="uppercase mb-3 md:text-xl text-sm text-pink_main font-semibold">
        Lịch Sử Của Phòng
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
          loading={startDate && endDate && teacherId && isLoading}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
    </div>
  );
};

export default HistoryTeacherPage;
