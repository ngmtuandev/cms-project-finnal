import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  useGetAllProblem,
  useGetAllResultByProblem,
  useGetRecordForDashboard,
} from "../../hooks";
import { DatePicker, Select } from "antd";
import { useDashboardRecordStore, useProblemStore } from "../../store";
import { TYPE_RESULT } from "../../utils/constant";

const { RangePicker } = DatePicker;

// const dataSelectTypeResult = [
//   {
//     label: "PRINTER",
//     value: "PRINTER",
//   },
//   {
//     label: "NO PRINTER",
//     value: "NOT PRINTER",
//   },
// ];

const DashBoardError = () => {
  const { dashboardErrorRecord } = useGetRecordForDashboard();

  const { problem } = useGetAllProblem();

  const { results: resultByPromblem } = useGetAllResultByProblem();

  const { setProblemId, problemId } = useProblemStore();

  useEffect(() => {
    setProblemId(
      problem?.find((item: any) => item?.typeProblem == TYPE_RESULT.ERROR)?.id
    );

    if (resultByPromblem) {
      const convertResult = resultByPromblem?.map((item: any) => {
        return {
          label: item?.typeResult,
          value: item?.typeResult,
        };
      });
      setDataSelectTypeResult(convertResult);
    }
  }, [resultByPromblem, problemId]);

  // state
  const [labels, setLabels] = useState([]);
  const [dataDashBoard, setDataDashBoard] = useState([]);
  const [dataSelectTypeResult, setDataSelectTypeResult] = useState([]);

  const { setEndDate, setStartDate, setTypeResult } = useDashboardRecordStore();

  useEffect(() => {
    setEndDate(undefined);
    setStartDate(undefined);
    // setTypeResult(RESULT.ERROR);
  }, []);

  useEffect(() => {
    const labelConvert = dashboardErrorRecord?.map((item: any) => {
      return item?.typeResult;
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
    <div className=" w-[100%] xl:w-[50%] md:w-[100%] lg:w-[50%] flex flex-col justify-between bg-gray-100 p-[20px]">
      <h3 className="uppercase md:text-xl text-sm mb-3 text-pink_main font-semibold">
        Thống kê giao dịch lỗi
      </h3>
      <div className="xl:flex md:flex lg:flex hidden items-center gap-8 mb-8">
        <div className="flex flex-col">
          <small className="text-gray-500 mb-1">Lọc theo ngày</small>
          <RangePicker
            placeholder={["bắt đầu", "kết thúc"]}
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
      <div className="text-[4px] h-full">
        <Bar height={50} width={"100%"} data={data} options={options} />
      </div>
    </div>
  );
};

export default DashBoardError;
