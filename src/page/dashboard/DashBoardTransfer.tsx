import { useEffect, useState } from "react";
import { useDashboardRecordTransferStore } from "../../store";
import { useGetRecordForDashboardTransfer } from "../../hooks";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;
const DashBoardTransferDetail = () => {
  const { dashboardTransferRecord } = useGetRecordForDashboardTransfer();

  // state
  const [labels, setLabels] = useState([]);
  const [dataCashDashBoard, setDataCashDashBoard] = useState([]);
  const [dataF1DashBoard, setDataF1DashBoard] = useState([]);

  const { setEndDate2, setStartDate2 } = useDashboardRecordTransferStore();

  useEffect(() => {
    const labelConvert = dashboardTransferRecord?.map((item: any) => {
      return item?.storeCode;
    });

    const dataCashConvert = dashboardTransferRecord?.map((item: any) => {
      return item?.cashValue;
    });

    const dataF1Convert = dashboardTransferRecord?.map((item: any) => {
      return item?.f1Value;
    });

    if (labelConvert) setLabels(labelConvert);
    if (dataCashConvert) setDataCashDashBoard(dataCashConvert);
    if (dataF1Convert) setDataF1DashBoard(dataF1Convert);
  }, [dashboardTransferRecord]);

  const data2 = {
    labels: labels,
    datasets: [
      {
        // type: "bar",
        label: "Số lần giao dịch F1",
        data: dataF1DashBoard,
        backgroundColor: "rgba(185,35,35, 0.3)",
        borderColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 0.3,
        barThickness: 20,
      },
      {
        // type: "bar",
        label: "Số lần giao dịch tiền mặt",
        data: dataCashDashBoard,
        backgroundColor: "rgba(57, 176, 135, 0.5)",
        borderColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 0.3,
        barThickness: 20,
      },
    ],
  };

  const options2 = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col justify-between w-[50%] bg-gray-100 p-[20px]">
      <h3 className="uppercase mb-3 text-pink_main font-semibold">
        Thống kê chuyển khoản
      </h3>
      <div className="flex flex-col mb-8">
        <small className="text-gray-500 mb-1">Lọc theo ngày</small>
        <RangePicker
          style={{ width: 240 }}
          onChange={(_: any, dateString: any) => {
            setEndDate2(dateString[1]);
            setStartDate2(dateString[0]);
          }}
        />
      </div>
      <div>
        <Bar height={50} width={"100%"} data={data2} options={options2} />
      </div>
    </div>
  );
};

export default DashBoardTransferDetail;
