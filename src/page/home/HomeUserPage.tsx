import { useEffect, useState } from "react";
import {
  HeaderMobile,
  InputCustom,
  Loader,
  ModelCustom,
} from "../../component";
import { useAuthStore, useCreateRecordStore } from "../../store";
import { Select, Button, Upload, message, Input } from "antd";
import {
  useCreateRecordTransaction,
  useCreateSolutionRequest,
  useGetAllMachine,
  useGetAllResult,
  useGetAllSolution,
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
// import Webcam from "react-webcam";

// const FACING_MODE_USER = { facingMode: "user" }; //Front Camera
// const FACING_MODE_ENVIRONMENT = { facingMode: { exact: "environment" } }; //Back Camer

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_, setFileList] = useState<UploadFile[]>();

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
  };

  // const props: UploadProps = {
  //   showUploadList: false,
  //   onChange: async (info) => {
  //     setIsLoader(true);
  //     const { file } = info;
  //     if (file.status === "done") {
  //       formData.append("image", file.originFileObj! || file);

  //       try {
  //         const response = await fetch(URL_UPLOAD_IMAGE.URL, {
  //           method: "POST",
  //           body: formData,
  //         });

  //         if (response.ok) {
  //           const data = await response.json();
  //           setUploadedImageUrl(data?.data?.url);
  //           messageApi.success(MESSAGE.UPLOAD_IMAGE_SUCCESS);
  //           setIsLoader(false);
  //         } else {
  //           setIsLoader(false);
  //           messageApi.error(MESSAGE.UPLOAD_IMAGE_FAILURE);
  //         }
  //       } catch (err) {
  //         setIsLoader(false);
  //         messageApi.error(MESSAGE.UPLOAD_IMAGE_FAILURE);
  //       }
  //     }
  //   },
  // };

  // Upload Record

  const handleUploadRecord = async () => {
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
      messageApi.warning("VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN !");
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

  // Upload image on Camera Phone
  // const webcamRef = React.useRef<any>(null);
  // const [image, setImage] = useState<any>(null);
  // const [videoConstraints, setVideoConstraints] =
  //   useState<any>(FACING_MODE_USER);

  // const getListOfVideoInputs = async () => {
  //   const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  //   return mediaDevices.filter((device) => device.kind === "videoinput");
  // };

  // const switchCamera = async () => {
  //   const videoInpuList = await getListOfVideoInputs();
  //   if (videoInpuList.length > 1) {
  //     const currectVideoConstraints = { ...videoConstraints };

  //     // If the current constraint is the front camera, switch to the back camera.
  //     if (
  //       JSON.stringify(currectVideoConstraints) ===
  //       JSON.stringify(FACING_MODE_USER)
  //     ) {
  //       setVideoConstraints(FACING_MODE_ENVIRONMENT);
  //     }
  //     // If the current constraint is the back camera, switch to the front camera.
  //     if (
  //       JSON.stringify(currectVideoConstraints) ===
  //       JSON.stringify(FACING_MODE_ENVIRONMENT)
  //     ) {
  //       setVideoConstraints(FACING_MODE_USER);
  //     }
  //   } else {
  //     alert("Device have only one camera.");
  //   }
  // };

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current!.getScreenshot();
  //   setImage(imageSrc);
  // }, [webcamRef, setImage]);

  // const retake = () => setImage(null);

  // const upload = () => {
  //   // Do something with the image source, such as upload it to a server
  //   alert("Your photo uploaded successfully!");
  //   setImage(null);
  // };

  return (
    <>
      {contextHolder}
      {isLoader && <Loader></Loader>}
      <div className="w-screen pb-[40px] flex items-center flex-col min-h-screen bg-pink_light">
        <HeaderMobile userName={infoCurrent?.userName}></HeaderMobile>

        {/* Upload Evident */}
        <div
          className="md:w-[100%] lg:w-[40%] w-[100%] xl:w-[50%] flex flex-col justify-center items-center 
        text-center lg:h-[60%] xl:h-[60%] h-[40%] p-[20px] mt-20"
        >
          <div className="w-[100%] text-6xl text-gray-500 h-[80%] py-[30px] flex justify-center items-center rounded-xl bg-white">
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="image-evident"
                className="max-w-full max-h-full object-contain"
              />
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
          {/* <div className="flex flex-col items-center pt-3 mx-auto max-w-6xl">
            <h3>Photo Capture In React</h3>

            <div className="w-full">
              <div className="flex justify-center">
                <div className="w-full md:w-1/2 mb-3 md:mb-0 flex flex-col">
                  {image ? (
                    <img src={image} alt="Captured" />
                  ) : (
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-2">
                <div className="w-full md:w-1/2 flex justify-center items-center flex-wrap">
                  {image ? (
                    <button
                      className="btn btn-primary me-2 mb-2"
                      onClick={retake}
                    >
                      Re-Take
                    </button>
                  ) : (
                    <>
                      <button
                        className="bg-gray-500 text-white py-2 px-4 rounded me-2 mb-2"
                        onClick={switchCamera}
                      >
                        Switch Camera
                      </button>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded me-2 mb-2"
                        onClick={capture}
                      >
                        Take Photo
                      </button>
                    </>
                  )}
                  {image && (
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded mb-2"
                      onClick={upload}
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div> */}

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
            {/* test */}

            {/* <div>
              {isCameraOpen && (
                <div>
                  <video ref={videoRef} autoPlay playsInline width="100%" />
                  <div>
                    <button onClick={capturePhoto}>Chụp ảnh</button>
                    <button onClick={toggleCamera}>
                      Chuyển sang camera {isFrontCamera ? "sau" : "trước"}
                    </button>
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

              {imageSrc && (
                <div>
                  <h3>Ảnh vừa chụp:</h3>
                  <img src={imageSrc} alt="Chụp từ camera" />
                </div>
              )}
            </div> */}
            <div>
              <Button icon={<CameraOutlined />}>Chụp</Button>
            </div>
          </div>
        </div>

        {/* Select Component */}
        <div className="px-[20px] w-full lg:w-[50%] xl:w-[50%] flex gap-4 flex-col">
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
        <div className="flex items-center justify-center">
          <div className="px-[20px] mt-4">
            <button
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
          <ButtomCustom isLoading={isLoading} text="Gửi yêu cầu"></ButtomCustom>
        </form>
      </ModelCustom>
    </>
  );
};

export default withRouter(HomeUserPage);
