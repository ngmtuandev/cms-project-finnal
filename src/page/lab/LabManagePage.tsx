import { convertTimestampToDateTime } from "../../helper";
import { useGetAllLab } from "../../hooks";

const LabManagePage = () => {
  const { labs } = useGetAllLab();
  console.log(labs);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-xl uppercase font-semibold text-gray-600">
          Danh sách phòng học
        </span>
      </div>
      <div className="w-full grid grid-cols-4 gap-10 mt-4">
        {labs &&
          labs?.map((item: any, index: number) => (
            <div
              className={`flex flex-col gap-2 ${
                item?.isDoingUse ? "bg-green-400" : "bg-yellow-300"
              } bg-opacity-50 hover:bg-opacity-100 cursor-pointer transition-all duration-300 rounded-2xl py-[34px] justify-center items-center`}
              key={index}
            >
              <span className="text-xl font-semibold">
                Mã phòng : {item?.id}
              </span>
              <span className="font-semibold">
                Trạng thái :{" "}
                {item?.isDoingUse ? "đang sử dụng" : "chưa sử dụng"}
              </span>
              <span>
                Ngày tạo phòng : {convertTimestampToDateTime(item?.createdAt)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LabManagePage;
