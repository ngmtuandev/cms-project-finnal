import { useEffect, useState } from "react";
import { useDashboardRecordTransferStore } from "../../store";
import { useGetRecordForDashboardTransfer } from "../../hooks";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "antd";
import { LABEL_CHART } from "../../utils/constant";
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
      // return item?.storeCode;
      return item?.storeName;
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
        label: LABEL_CHART.NUMBER_TRANSACTION_F1,
        data: dataF1DashBoard,
        backgroundColor: "rgba(185,35,35, 0.3)",
        borderColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 0.3,
        barThickness: 20,
      },
      {
        // type: "bar",
        label: LABEL_CHART.NUMBER_TRANSACTION_CASH,
        data: dataCashDashBoard,
        backgroundColor: "rgba(57, 176, 135, 0.5)",
        borderColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 0.3,
        barThickness: 20,
      },
    ],
  };

  const options2 = {
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
          callback: (value: any) => {
            const label: string = labels[value];
            if (label) {
              const words = label.split(" ");
              const lines = [];
              for (let i = 0; i < words?.length; i += 2) {
                lines.push(words?.slice(i, i + 2).join(" "));
              }
              return lines;
            }
          },
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
    <div className="flex w-[100%] xl:w-[50%] md:w-[100%] lg:w-[50%] flex-col justify-between bg-gray-100 p-[20px]">
      <h3 className="uppercase mb-3 md:text-xl text-sm text-pink_main font-semibold">
        Thống kê chuyển khoản
      </h3>
      <div className="flex flex-col mb-8">
        <small className="text-gray-500 mb-1">Lọc theo ngày</small>
        <RangePicker
          placeholder={["bắt đầu", "kết thúc"]}
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
