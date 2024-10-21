import React, { useEffect, useState } from "react";
import {
  HeaderMobile,
  InputCustom,
  Loader,
  ModelCustom,
} from "../../component";
import {
  useAuthStore,
  useConditionSolutionStore,
  useCreateRecordStore,
} from "../../store";
import { Select, Button, Upload, message, Input } from "antd";
import {
  useCreateRecordTransaction,
  useCreateSolutionRequest,
  useGetAllMachine,
  useGetAllResult,
  useGetAllSolutionWithCondition,
  useGetMachineByStore,
} from "../../hooks";
import { UploadOutlined, CameraOutlined } from "@ant-design/icons";
import { success } from "../../assets";
import type { UploadFile, UploadProps } from "antd";
import { URL_UPLOAD_IMAGE } from "../../utils/constant";
import { TCreateRecordTransaction } from "../../type/TCreateRecord";
import { withRouter } from "../../hocs";
import path from "../../utils/path";
import { useForm } from "react-hook-form";
import { ButtomCustom } from "../../component";
import { MESSAGE } from "../../utils/message";
import Webcam from "react-webcam";
import { formatMoneyInput } from "../../helper";
import { Checkbox } from "antd";
import { toast } from "react-toastify";
import { vn } from "../../assets";

const FACING_MODE_USER = { facingMode: "user" }; //Front Camera
const FACING_MODE_ENVIRONMENT = { facingMode: { exact: "environment" } }; //Back Camer

const HomeUserPage = ({ navigate }: any) => {
  const { infoCurrent } = useAuthStore();

  // api create
  const { mutate: $createRecord } = useCreateRecordTransaction();

  // data api
  const { machines } = useGetAllMachine();
  const { machinesOfStore } = useGetMachineByStore(infoCurrent?.storeCode);
  const { solutionCondition } = useGetAllSolutionWithCondition();
  const { results } = useGetAllResult();

  // state
  const [solutionSelect, setSolutionSelect] = useState([]);
  const [resultSelect, setResultSelect] = useState([]);
  const [machineSelect, setMachineSelect] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isLoader, setIsLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_, setFileList] = useState<UploadFile[]>();
  const [moneyDisplay, setMoneyDisplay] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const { setIsActive } = useConditionSolutionStore();

  useEffect(() => {
    setIsActive(true);
  }, []);

  // message
  const [messageApi, contextHolder] = message.useMessage();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (solutionCondition) {
      let solutionConvert = solutionCondition?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });
      setSolutionSelect(solutionConvert);
    }
    if (machinesOfStore) {
      let machinesConvert = machinesOfStore?.map((item: any) => {
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
  }, [machines, solutionCondition, results]);

  // Upload Image
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const fileListImages: any = [];
    if (newFileList) {
      newFileList.forEach((file: any) => {
        const images = { filePath: file?.response?.url };
        fileListImages.push(images);
      });
    }
    setFileList(newFileList);
  };

  const formData = new FormData();

  const customUpload = async (options: any) => {
    const { file } = options;

    formData.append("image", file);

    try {
      // setIsLoader(true);
      const response = await fetch(URL_UPLOAD_IMAGE.URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedImageUrl(data?.data?.url);
        messageApi.success(MESSAGE.UPLOAD_IMAGE_SUCCESS);
        // setIsLoader(false);
      } else {
        setIsLoader(false);
        messageApi.error(MESSAGE.UPLOAD_IMAGE_FAILURE);
      }
    } catch (err) {
      // setIsLoader(false);
      messageApi.error(MESSAGE.UPLOAD_IMAGE_FAILURE);
    }
  };

  useEffect(() => {
    setMachine(undefined);
    setSolution(undefined);
    setResult(undefined);
    setTypeTransaction(undefined);
  }, []);

  const handleUploadRecord = async () => {
    if (isSubmitting) {
      toast.warning("Dont spam");
      return;
    }

    if (
      !solution ||
      !machine ||
      !result ||
      !typeTransaction ||
      !uploadedImageUrl ||
      !money ||
      !typeTransaction ||
      money == undefined ||
      typeTransaction == undefined
    ) {
      toast.warning("VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN !");
      return;
    }

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
    setIsSubmitting(true);
    $createRecord(dataUploadInfo, {
      onSuccess: (response) => {
        if (response?.status == 200) {
          messageApi.success(MESSAGE.CREATE_RECORD_SUCCESS);
          setTimeout(() => {
            navigate(path.UPLOAD_RECORD_SUCCESS);
            setIsLoader(false);
          }, 2000);
          setMachine(undefined);
          setSolution(undefined);
          setResult(undefined);
          setTypeTransaction(undefined);
          setIsSubmitting(false);
        } else {
          messageApi.error(MESSAGE.CREATE_RECORD_FAILURE);
          setTimeout(() => {
            navigate(path.UPLOAD_RECORD_FAILURE);
            setIsLoader(false);
          }, 2000);
          setIsSubmitting(false);
        }
      },
      onError: () => {
        messageApi.error(MESSAGE.CREATE_RECORD_FAILURE);
        setIsSubmitting(false);
      },
    });
  };

  const { mutate: $createSolution } = useCreateSolutionRequest();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    // reset,
  } = useForm();

  const handleCreateSolution = (value: any) => {
    setIsLoading(true);
    $createSolution(value, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.CREATE_SOLUTION_REQUEST_SUCCESS);
          setIsLoading(false);
          setIsModalOpen(false);
        } else {
          messageApi.error(MESSAGE.CREATE_SOLUTION_REQUEST_FAIL);
          setIsLoading(false);
          setIsModalOpen(false);
        }
      },
      onError() {
        messageApi.error(MESSAGE.CREATE_SOLUTION_REQUEST_FAIL);
        setIsLoading(false);
        setIsModalOpen(false);
      },
    });
  };

  // capture use webcam

  const webcamRef = React.useRef<any>(null);
  const [image, setImage] = useState<any>(null);
  const [videoConstraints, setVideoConstraints] =
    useState<any>(FACING_MODE_USER);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const getListOfVideoInputs = async () => {
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    return mediaDevices.filter((device) => device.kind === "videoinput");
  };

  const switchCamera = async () => {
    const videoInpuList = await getListOfVideoInputs();
    if (videoInpuList.length > 1) {
      const currectVideoConstraints = { ...videoConstraints };

      if (
        JSON.stringify(currectVideoConstraints) ===
        JSON.stringify(FACING_MODE_USER)
      ) {
        setVideoConstraints(FACING_MODE_ENVIRONMENT);
      }
      if (
        JSON.stringify(currectVideoConstraints) ===
        JSON.stringify(FACING_MODE_ENVIRONMENT)
      ) {
        setVideoConstraints(FACING_MODE_USER);
      }
    } else {
      alert("Device have only one camera.");
    }
  };

  const convertToBlobAndUpload = async (base64Image: string) => {
    const res = await fetch(base64Image);
    const blob = await res.blob();
    return blob;
  };

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current!.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      const imgBlob = await convertToBlobAndUpload(imageSrc);

      formData.append("image", imgBlob, "webcam-image.jpg");

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
    setImage(imageSrc);
  }, [webcamRef, setImage]);

  const retake = () => setImage(null);

  // Check input money
  const handleChangeInputMoney = (e: any) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    if (isNaN(parseInt(e.target.value))) {
      messageApi.warning(MESSAGE.VALID_NUMBER);
      setMoneyDisplay("");
    } else {
      const numericValue = parseInt(inputValue);
      setMoney(numericValue);
      setMoneyDisplay(formatMoneyInput(inputValue));
    }
  };

  return (
    <>
      {contextHolder}
      {isLoader ? (
        <Loader className="z-1000 w-screen xl:-ml-0 overflow-hidden lg:-ml-40 md:ml-40 h-screen flex flex-col justify-center items-center"></Loader>
      ) : (
        <>
          <div className="w-screen pb-[40px] flex items-center flex-col min-h-screen bg-pink_light">
            <HeaderMobile userName={infoCurrent?.userName}></HeaderMobile>

            {/* Upload Evident */}
            <div
              className="md:w-[100%] lg:w-[40%] w-[100%] xl:w-[50%] flex flex-col justify-center items-center 
        text-center lg:h-[60%] xl:h-[60%] h-[40%] p-[20px] mt-16"
            >
              <div className="w-[100%] text-6xl text-gray-500 h-[80%] py-[30px] flex justify-center items-center rounded-xl bg-white">
                {uploadedImageUrl ? (
                  <img
                    src={uploadedImageUrl}
                    alt="image-evident"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : isCameraOpen ? (
                  <div>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />{" "}
                    <div className="w-full mt-5 md:w-1/2 flex justify-center items-center flex-wrap">
                      {image ? (
                        <button
                          className="bg-pink_light text-gray-900 text-sm py-[8px] px-[20px] rounded me-2 mb-2"
                          onClick={retake}
                        >
                          Chụp lại
                        </button>
                      ) : (
                        <>
                          <button
                            className="bg-pink_main text-white text-sm py-[8px] px-[20px] rounded me-2 mb-2"
                            onClick={switchCamera}
                          >
                            Lật máy ảnh
                          </button>
                          <button
                            className="bg-pink_light text-gray-900 text-sm py-[8px] px-[20px] rounded me-2 mb-2"
                            onClick={capture}
                          >
                            Chụp
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={success}
                      alt="image-evident"
                      className="w-[30%] md:w-[40%] xl:w-[40%] lg:w-[40%] object-contain"
                    />
                    <span className="text-pink_main text-sm md:text-xl xl:text-xl lg:text-xl">
                      Tải hình ảnh giao dịch!
                    </span>
                  </div>
                )}
              </div>

              {/* Test open camera */}
              <div className="flex flex-col items-center pt-3 mx-auto max-w-6xl">
                <div className="w-full">
                  <div className="flex justify-center mt-2"></div>
                </div>
              </div>

              <div className="flex justify-center gap-4 items-center my-4">
                <div>
                  <Upload
                    customRequest={customUpload}
                    onChange={handleChange}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </div>
                <div>
                  <Button
                    onClick={() => setIsCameraOpen(true)}
                    icon={<CameraOutlined />}
                  >
                    Chụp
                  </Button>
                </div>
              </div>
            </div>

            {/* Select Component */}
            <div className="px-[20px] w-full lg:w-[50%] xl:w-[50%] flex gap-4 flex-col">
              {/* type transaction */}
              <div className="flex gap-10">
                <Checkbox
                  style={{
                    fontSize: 16,
                    fontWeight: "normal",
                    color: "gray",
                    marginLeft: 10,
                  }}
                  value={"ERROR"}
                  checked={typeTransaction == "ERROR"}
                  onChange={() => setTypeTransaction("ERROR")}
                  className="custom-checkbox"
                >
                  Giao dịch lỗi
                </Checkbox>
                <Checkbox
                  style={{ fontSize: 16, fontWeight: "normal", color: "gray" }}
                  value={"TRANSFER"}
                  checked={typeTransaction == "TRANSFER"}
                  onChange={() => setTypeTransaction("TRANSFER")}
                  className="custom-checkbox"
                >
                  Chuyển khoản
                </Checkbox>
              </div>
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
              {/* Money */}
              <div>
                <Input
                  className="font-semibold"
                  width={"50%"}
                  prefix={<span className="text-pink_main">VNĐ</span>}
                  suffix={<img width={20} src={vn}></img>}
                  value={moneyDisplay}
                  onChange={(value: any) => handleChangeInputMoney(value)}
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
              {/* Status */}
              <div>
                <Select
                  placeholder="Trạng thái"
                  style={{ width: "100%" }}
                  options={[
                    { value: false, label: "Thất bại" },
                    { value: true, label: "Thành công" },
                  ]}
                  onChange={(value: any) => setIsSuccess(value)}
                />
              </div>

              {/* Type transaction */}
              {/* <div>
            <Select
              placeholder="Chọn loại giao dịch"
              style={{ width: "100%" }}
              options={[
                { value: "ERROR", label: "GD Lỗi" },
                { value: "TRANSFER", label: "Chuyển khoản" },
              ]}
              onChange={(value: any) => setTypeTransaction(value)}
            />
          </div> */}
            </div>

            {/* Button */}
            <div className="flex items-center justify-center">
              <div className="px-[20px] mt-4">
                <button
                  disabled={isSubmitting}
                  onClick={handleUploadRecord}
                  className="bg-pink_main px-[2rem] rounded-3xl text-white font-semibold flex justify-center items-center py-[0.4rem]"
                >
                  Lưu
                </button>
              </div>
              <div className="px-[20px] mt-4">
                <button
                  onClick={toggleModal}
                  className="text-gray-500 text-sm rounded-3xl font-semibold flex justify-center items-center"
                >
                  Tạo giải pháp
                </button>
              </div>
            </div>
          </div>
          <ModelCustom isOpen={isModalOpen} onClose={toggleModal}>
            <form
              onSubmit={handleSubmitForm(handleCreateSolution)}
              className="flex flex-col gap-4"
            >
              <InputCustom
                register={register}
                id="name"
                errors={formErrors}
                validate={{ required: "Vui lòng nhập tên của giải pháp" }}
                label="Tên giải pháp"
              ></InputCustom>
              <InputCustom
                register={register}
                id="description"
                errors={formErrors}
                validate={{ required: "Vui lòng nhập mô tả giải pháp" }}
                label="Mô tả giải pháp"
              ></InputCustom>
              <ButtomCustom
                isLoading={isLoading}
                text="Gửi yêu cầu"
              ></ButtomCustom>
            </form>
          </ModelCustom>
        </>
      )}
    </>
  );
};

export default withRouter(HomeUserPage);
