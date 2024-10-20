import { useGetAnalysisWithTypeResult } from "../../hooks";
import { useEffect, useState } from "react";
import { ChartConfig, Loader } from "../../component";
import { DatePicker } from "antd";
import { useFilterRecordStore } from "../../store";

const { RangePicker } = DatePicker;

const AnalysisTransactionWithTypeResult = () => {
  const { setStartDate, setEndDate } = useFilterRecordStore();
  const { analysisRecord } = useGetAnalysisWithTypeResult();
  const [isLoader, setIsLoader] = useState(false);

  const { startDate, endDate } = useFilterRecordStore();

  const [chartData, setChartData] = useState({
    labels:
      analysisRecord &&
      analysisRecord?.data?.map((data: any) => data?.typeResult || "NO"),
    datasets: [
      {
        label: "Phân tích theo loại kết quả",
        data:
          analysisRecord &&
          analysisRecord?.data?.map((data: any) => data?.countResult),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setIsLoader(true);
    setTimeout(() => {
      if (analysisRecord) {
        setChartData({
          labels: analysisRecord?.data?.map(
            (data: any) => data?.typeResult || "NO"
          ),
          datasets: [
            {
              label: "Phân tích theo loại kết quả",
              data: analysisRecord?.data?.map((data: any) => data?.countResult),
              backgroundColor: [
                "#15CC48",
                "#FFA0BC",
                "#f3ba2f",
                "#FFE3EC",
                "#FF4040",
                "#4285F4",
              ],
              borderColor: "gray",
              borderWidth: 1,
            },
          ],
        });
      }
      setIsLoader(false);
    }, 2000);
  }, [analysisRecord, startDate, endDate]);

  return (
    <>
      {isLoader ? (
        <div className="-mt-40">
          <Loader></Loader>
        </div>
      ) : (
        <div>
          {!isLoader && (
            <>
              <div className="flex flex-col w-[20%]">
                <small className="text-gray-500 mb-1">Lọc theo ngày</small>
                <RangePicker
                  placeholder={['bắt đầu', 'kết thúc']}
                  onChange={(_, dateString) => {
                    setEndDate(dateString[1]);
                    setStartDate(dateString[0]);
                  }}
                />
              </div>
              <div className="App">
                <ChartConfig chartData={chartData} />{" "}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AnalysisTransactionWithTypeResult;
