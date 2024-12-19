import { toast } from "react-toastify";
import { convertTimestampToDateTime } from "../../helper";
import { useGetAllLab } from "../../hooks";
import { Modal } from "antd";
import { useState } from "react";
import { useUpdateStatusLab } from "../../hooks/labs/useUpdateStatusLab";

const LabManagePage = () => {
  const { labs } = useGetAllLab();
  const [open, setOpen] = useState(false);
  const [idLab, setIdLab] = useState("");

  console.log(labs);

  const { mutate: updateLab } = useUpdateStatusLab();

  const handleUpdateLab = () => {
    console.log("update");
    updateLab(idLab, {
      onSuccess: (response: any) => {
        if (response?.isSuccess) {
          console.log("🚀 ~ handleUpdateLab ~ response:", response);
          toast.success("Cập nhập trạng thái thành công");
          setOpen(false);
        } else {
          toast.error("Cập nhập trạng thái thất bại");
          setOpen(false);
        }
      },
      onError: () => {
        toast.error("Cập nhập trạng thái thất bại");
      },
    });
  };

  return (
    <>
      <Modal
        title="Thêm giáo viên mới"
        centered
        open={open}
        onOk={() => handleUpdateLab()}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-xl text-red-500">
            Phòng này đang ở trạng thái đang sử dụng
          </span>
          <span>
            Nếu bạn chắc giáo viên đã rời khỏi phòng mà quên cập nhập trạng
            thái, hãy cập nhập ngay.
          </span>
        </div>
      </Modal>
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
                onClick={() => {
                  if (!item?.isDoingUse) {
                    toast.error("Phòng chưa được sử dụng");
                  } else {
                    setIdLab(item?.id);
                    setOpen(true);
                  }
                }}
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
                <span className="text-center">
                  Ngày tạo phòng : {convertTimestampToDateTime(item?.createdAt)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LabManagePage;
