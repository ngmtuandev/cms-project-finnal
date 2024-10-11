import { useEffect, useState } from "react";
import { HeaderMobile, Loader } from "../../component";
import { useAuthStore, useCreateRecordStore } from "../../store";
import { Select, Button, Upload, message, Input } from "antd";
import {
  useCreateRecordTransaction,
  useGetAllMachine,
  useGetAllResult,
  useGetAllSolution,
} from "../../hooks";
import {
  UploadOutlined,
  CameraOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { URL_UPLOAD_IMAGE } from "../../utils/constant";
import { MESSAGE } from "../../utils/message";
import { TCreateRecordTransaction } from "../../type/TCreateRecord";
import { withRouter } from "../../hocs";
import path from "../../utils/path";

const HomeUserPage = ({ navigate }: any) => {
  const { infoCurrent } = useAuthStore();

  // api create
  const { mutate: $createRecord } = useCreateRecordTransaction();

  // data api
  const { machines } = useGetAllMachine();
  const { solutions } = useGetAllSolution();
  const { results } = useGetAllResult();

  // state
  const [solutionSelect, setSolutionSelect] = useState([]);
  const [resultSelect, setResultSelect] = useState([]);
  const [machineSelect, setMachineSelect] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isLoader, setIsLoader] = useState(false);

  // global state
  const {
    machine,
    money,
    result,
    setMachine,
    setMoney,
    setResult,
    setSolution,
    setTypeTransaction,
    solution,
    typeTransaction,
    isSuccess,
    setIsSuccess,
  } = useCreateRecordStore();

  // message
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (solutions) {
      let solutionConvert = solutions?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });
      setSolutionSelect(solutionConvert);
    }
    if (machines) {
      let machinesConvert = machines?.map((item: any) => {
        return {
          label: item?.codeMachine,
          value: item?.id,
        };
      });
      setMachineSelect(machinesConvert);
    }
    if (results) {
      let resultConvert = results?.map((item: any) => {
        return {
          label: item?.typeResult,
          value: item?.id,
        };
      });
      setResultSelect(resultConvert);
    }
  }, [machines, solutions, results]);

  // Upload Image
  const props: UploadProps = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    showUploadList: false,
    onChange: async (info) => {
      setIsLoader(true);
      const { file } = info;
      if (file.status === "done") {
        const formData = new FormData();
        formData.append("image", file.originFileObj! || file);

        try {
          const response = await fetch(URL_UPLOAD_IMAGE.URL, {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setUploadedImageUrl(data?.data?.url);
            messageApi.success(MESSAGE.UPLOAD_IMAGE_SUCCESS);
            setIsLoader(false);
          } else {
            setIsLoader(false);
            messageApi.error(MESSAGE.UPLOAD_IMAGE_FAILURE);
          }
        } catch (err) {
          setIsLoader(false);
          messageApi.error(MESSAGE.UPLOAD_IMAGE_FAILURE);
        }
      }
    },
  };

  // Upload Record
  const handleUploadRecord = async () => {
    const dataUploadInfo: TCreateRecordTransaction = {
      imageEvident: uploadedImageUrl,
      user: infoCurrent?.id,
      store: infoCurrent?.store?.id,
      money: +money,
      solution,
      machine,
      result,
      typeTransaction,
      isSuccess,
    };

    setIsLoader(true);
    $createRecord(dataUploadInfo, {
      onSuccess: (response) => {
        if (response?.status == 200) {
          messageApi.success(MESSAGE.CREATE_RECORD_SUCCESS);
          setTimeout(() => {
            navigate(path.UPLOAD_RECORD_SUCCESS);
            setIsLoader(false);
          }, 2000);
        } else {
          messageApi.error(MESSAGE.CREATE_RECORD_FAILURE);
          setTimeout(() => {
            navigate(path.UPLOAD_RECORD_FAILURE);
            setIsLoader(false);
          }, 2000);
        }
      },
      onError: () => {
        messageApi.error(MESSAGE.CREATE_RECORD_FAILURE);
      },
    });
  };

  return (
    <>
      {contextHolder}
      {isLoader && <Loader></Loader>}
      <div className="w-screen flex flex-col h-screen bg-pink_light">
        <HeaderMobile userName={infoCurrent?.userName}></HeaderMobile>

        {/* Upload Evident */}
        <div className="w-full h-[40%] p-[20px]">
          <div className="w-[100%] text-6xl text-gray-500 h-[80%] flex justify-center items-center rounded-xl bg-white">
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="image-evident"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <FileImageOutlined />
            )}
          </div>
          <div className="flex justify-center gap-4 items-center my-4">
            <div>
              <Upload showUploadList={false} {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
            <div>
              <Button icon={<CameraOutlined />}>Chụp</Button>
            </div>
          </div>
        </div>

        {/* Select Component */}
        <div className="px-[20px] mt-6 flex gap-4 flex-col">
          {/* solution */}
          <div>
            <Select
              onChange={(value: any) => setSolution(value)}
              showSearch
              style={{ width: "100%" }}
              placeholder="Chọn giải pháp"
              optionFilterProp="label"
              filterSort={({ optionA, optionB }: any) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={solutionSelect}
            />
          </div>
          {/* result */}
          <div>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Chọn kết quả giao dịch"
              optionFilterProp="label"
              filterSort={({ optionA, optionB }: any) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value: any) => setResult(value)}
              options={resultSelect}
            />
          </div>
          {/* Machine */}
          <div>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Chọn mã máy"
              optionFilterProp="label"
              filterSort={({ optionA, optionB }: any) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value: any) => setMachine(value)}
              options={machineSelect}
            />
          </div>
          {/* Type transaction */}
          <div>
            <Select
              placeholder="Chọn loại giao dịch"
              style={{ width: "100%" }}
              options={[
                { value: "ERROR", label: "GD Lỗi" },
                { value: "TRANSFER", label: "Chuyển khoản" },
              ]}
              onChange={(value: any) => setTypeTransaction(value)}
            />
          </div>
          <div className=" flex justify-between gap-4 items-center">
            <Input
              className="text-gray-600"
              width={"50%"}
              prefix="đ"
              suffix="VNĐ"
              onChange={(value: any) => setMoney(value.target.value)}
            />
            <Select
              placeholder="Trạng thái"
              style={{ width: "50%" }}
              options={[
                { value: false, label: "Thất bại" },
                { value: true, label: "Thành công" },
              ]}
              onChange={(value: any) => setIsSuccess(value)}
            />
          </div>
        </div>

        {/* Button */}
        <div className="px-[20px] mt-4">
          <button
            onClick={handleUploadRecord}
            className="bg-pink_main px-[5rem] rounded-2xl text-white font-semibold flex justify-center items-center py-[0.4rem]"
          >
            Lưu
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(HomeUserPage);
