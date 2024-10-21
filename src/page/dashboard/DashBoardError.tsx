import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useGetRecordForDashboard } from "../../hooks";
import { DatePicker, Select } from "antd";
import { useDashboardRecordStore } from "../../store";

const { RangePicker } = DatePicker;

const dataSelectTypeResult = [
  {
    label: "PRINTER",
    value: "PRINTER",
  },
  {
    label: "NO PRINTER",
    value: "NOT PRINTER",
  },
];

const DashBoardError = () => {
  const { dashboardErrorRecord } = useGetRecordForDashboard();

  // state
  const [labels, setLabels] = useState([]);
  const [dataDashBoard, setDataDashBoard] = useState([]);

  const { setEndDate, setStartDate, setTypeResult } = useDashboardRecordStore();

  useEffect(() => {
    setEndDate(undefined);
    setStartDate(undefined);
    setTypeResult(undefined);
  }, []);

  useEffect(() => {
    const labelConvert = dashboardErrorRecord?.map((item: any) => {
      return item?.storeCode;
    });
    const dataErrorConvert = dashboardErrorRecord?.map((item: any) => {
      return item?.total;
    });
    if (labelConvert) setLabels(labelConvert);
    if (dataErrorConvert) setDataDashBoard(dataErrorConvert);
  }, [dashboardErrorRecord]);

  const data = {
    labels: labels,
    datasets: [
      {
        // type: "bar",
        label: "Số lần giao dịch lỗi",
        data: dataDashBoard,
        backgroundColor: "rgba(185,35,35, 0.3)",
        borderColor: "rgba(75, 192, 192, 0.3)",
        borderWidth: 0.3,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, 
          },
          maxRotation: 0, 
          minRotation: 0,
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
        beginAtZero: true, 
      },
    },
  };
  

  return (
    <div className=" w-[50%] flex flex-col justify-between bg-gray-100 p-[20px]">
      <h3 className="uppercase mb-3 text-pink_main font-semibold">
        Thống kê giao dịch lỗi
      </h3>
      <div className="flex items-center gap-8 mb-8">
        <div className="flex flex-col">
          <small className="text-gray-500 mb-1">Lọc theo ngày</small>
          <RangePicker
            placeholder={['bắt đầu', 'kết thúc']}
            style={{ width: 240, height: 30 }}
            onChange={(_, dateString) => {
              setEndDate(dateString[1]);
              setStartDate(dateString[0]);
            }}
          />
        </div>
        <div className="flex flex-col">
          <small className="text-gray-500 mb-1">Lọc theo kết quả</small>
          <Select
            onChange={(value: string) => {
              setTypeResult(value);
            }}
            style={{ width: 200, height: 30 }}
            allowClear
            options={dataSelectTypeResult}
            placeholder="Lọc theo kết quả"
          />
        </div>
      </div>
      <div className="text-[4px]">
        <Bar height={50} width={"100%"} data={data} options={options} />
      </div>
    </div>
  );
};

export default DashBoardError;