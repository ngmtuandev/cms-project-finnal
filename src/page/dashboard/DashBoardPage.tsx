import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BoxRecord, Loader } from "../../component";
import DashBoardError from "./DashBoardError";
import DashBoardTransferDetail from "./DashBoardTransfer";
import { useGetSumRecordByResult } from "../../hooks";
import { RESULT } from "../../utils/constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashBoardPage = () => {
  // state
  const [isLoader, setIsLoader] = useState(false);

  const { sumRecordByResult } = useGetSumRecordByResult();

  useEffect(() => {
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 400);
  }, []);

  return (
    <>
      {isLoader ? (
        <div className="-mt-40">
          <Loader className="z-1000 w-screen xl:-ml-40 overflow-hidden md:-ml-28 -ml-5 h-screen flex flex-col justify-center items-center"></Loader>
        </div>
      ) : (
        <div>
          <div className="hidden md:flex gap-8 mb-4 mt-6 grid-cols-4">
            {sumRecordByResult?.map((item: any) => {
              if (item?.typeResult === RESULT.NOT_PRINTER) {
                return (
                  <BoxRecord>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-600 text-sm uppercase">
                        Tổng số lần không in
                      </h3>
                      <span className="text-pink_main text-5xl">
                        {item?.count}
                      </span>
                      <small className="text-gray-500">
                        Dữ liệu thống kê theo tháng
                      </small>
                    </div>
                  </BoxRecord>
                );
              }
              if (item?.typeResult === RESULT.CASH) {
                return (
                  <BoxRecord>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-600 text-sm uppercase">
                        Tổng số lần GD tiền mặt
                      </h3>
                      <span className="text-pink_main text-5xl">
                        {item?.count}
                      </span>
                      <small className="text-gray-500">
                        Dữ liệu thống kê theo tháng
                      </small>
                    </div>
                  </BoxRecord>
                );
              }
              if (item?.typeResult === RESULT.F1) {
                return (
                  <BoxRecord>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-600 text-sm uppercase">
                        Tổng số lần GD F1
                      </h3>
                      <span className="text-pink_main text-5xl">
                        {item?.count}
                      </span>
                      <small className="text-gray-500">
                        Dữ liệu thống kê theo tháng
                      </small>
                    </div>
                  </BoxRecord>
                );
              }
              if (item?.typeResult === RESULT.PRINTER) {
                return (
                  <BoxRecord>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-600 text-sm uppercase">
                        Tổng số lần in
                      </h3>
                      <span className="text-pink_main text-5xl">
                        {item?.count}
                      </span>
                      <small className="text-gray-500">
                        Dữ liệu thống kê theo tháng
                      </small>
                    </div>
                  </BoxRecord>
                );
              }
            })}
          </div>
          <div className="flex flex-col xl:flex-row md:flex-col lg:flex-row gap-8 justify-between">
            <DashBoardError></DashBoardError>
            <DashBoardTransferDetail></DashBoardTransferDetail>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoardPage;
