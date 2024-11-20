import { useEffect, useState } from "react";
import { useHistoryOfLabStore } from "../../store";
import { DatePicker, Select, Table, TableColumnsType, Tag } from "antd";
import { useGetAllLab } from "../../hooks";
import { useGetAllHistoryOfLab } from "../../hooks/history/useGetAllHistoryOfLab";
import { convertTimestampToDateTime } from "../../helper";
const { RangePicker } = DatePicker;
const HistoryPage = () => {
  const { labs } = useGetAllLab();
  const [dataSelectTypeResult, setDataSelectTypeResult] = useState([]);
  const [data, setData] = useState([]);
  const { endDate, labId, setEndDate, setLabId, setStartDate, startDate } =
    useHistoryOfLabStore();

  const { historyLab, isLoading } = useGetAllHistoryOfLab();

  useEffect(() => {
    if (labs) {
      const convertResult = labs?.map((item: any) => {
        return {
          label: item?.nameLab,
          value: item?.id,
        };
      });
      setDataSelectTypeResult(convertResult);
    }
  }, [isLoading, labs]);

  useEffect(() => {
    console.log("history lab: ", historyLab);
    if (historyLab?.isSuccess) {
      setData(historyLab?.data);
    }
  }, [historyLab, isLoading, endDate, startDate, labId]);

  const columns: TableColumnsType<any> = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thời gian vào",
      dataIndex: "timeCheckin",
      key: "timeCheckin",
      render: (data: any) => {
        return <span>{convertTimestampToDateTime(data)}</span>;
      },
    },
    {
      title: "Thời gian ra",
      dataIndex: "timeCheckout",
      key: "timeCheckout",
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
      title: "Giáo viên",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
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
          <small className="text-gray-500 mb-1">Chọn phòng</small>
          <Select
            onChange={(value: string) => {
              setLabId(value);
            }}
            style={{ width: 200, height: 30 }}
            allowClear
            options={dataSelectTypeResult}
            placeholder="Chọn phòng"
          />
        </div>
      </div>
      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
