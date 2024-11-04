import { useEffect, useState } from "react";
import {
  useGetAllMachine,
  useGetAllResult,
  useGetAllStore,
  useGetFilterRecord,
} from "../../hooks";
import type { TableColumnsType } from "antd";
import { Space, Table, DatePicker, Select, Image } from "antd";
import { Loader, Loading } from "../../component";
import { useFilterRecordStore } from "../../store";
import { RESULT } from "../../utils/constant";
import { convertTimestampToDateTime, formatCurrencyVND } from "../../helper";

const { RangePicker } = DatePicker;

const RecordTransactionPage = () => {
  const {
    page,
    setPage,
    size,
    setStoreCode,
    storeCode,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
    machineCode,
    setMachineCode,
    typeResult,
    setTypeResult,
  } = useFilterRecordStore();

  const { isLoading, records } = useGetFilterRecord({
    page,
    size,
    storeCode,
    startDate,
    endDate,
    machineCode,
    typeResult,
  });

  const { stores } = useGetAllStore();
  const { machines } = useGetAllMachine();
  const { results } = useGetAllResult();

  // state
  const [recordTransactionAll, setRecordTransactionAll] = useState();
  const [storeSelect, setStoreSelect] = useState([]);
  const [machineSelect, setMachineSelect] = useState([]);
  const [resultSelect, setResultSelect] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (records) setRecordTransactionAll(records?.data);

    if (stores) {
      let storeConvert = stores?.map((item: any) => {
        return {
          label: item?.storeName,
          value: item?.storeCode,
        };
      });
      setStoreSelect(storeConvert);
    }

    if (machines) {
      let machineConvert = machines?.map((item: any) => {
        return {
          label: item?.codeMachine,
          value: item?.codeMachine,
        };
      });
      setMachineSelect(machineConvert);
    }

    if (results) {
      let resultConvert = results?.map((item: any) => {
        return {
          label: item?.typeResult,
          value: item?.typeResult,
        };
      });
      setResultSelect(resultConvert);
    }
  }, [records, page, machines, typeResult]);

  const columns: TableColumnsType<any> = [
    {
      title: "Loại record",
      dataIndex: "typeTransaction",
      key: "typeTransaction",
      render: (value: string) => {
        return <span className="font-bold">{value}</span>;
      },
    },
    {
      title: "Người record",
      dataIndex: ["user", "userName"],
      key: "userName",
    },
    {
      title: "Trạng thái",
      dataIndex: "isSuccess",
      key: "isSuccess",
      render: (isSuccess: boolean) => {
        return isSuccess ? (
          <span className="text-green_main font-semibold text-sm rounded-2xl">
            Thành công
          </span>
        ) : (
          <span className="text-red_main font-semibold text-sm rounded-2xl">
            Thất bại
          </span>
        );
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageEvident",
      key: "imageEvident",
      render: (url: string) => {
        return (
          <Image src={url} width={"40%"} className="object-contain"></Image>
        );
      },
      width: 300,
    },
    {
      title: "Kết quả",
      dataIndex: ["result", "typeResult"],
      key: "typeResult",
      render: (value: string) => {
        if (value == RESULT.FAIL)
          return (
            <span className=" text-red_main font-semibold text-sm">
              {value}
            </span>
          );
        if (value == RESULT.NOT_PRINTER)
          return (
            <span className="text-yellow-400 font-semibold text-sm">
              {value}
            </span>
          );
        if (value == RESULT.PENDING)
          return (
            <span className="text-pink_main font-semibold text-sm">
              {value}
            </span>
          );
        if (value == RESULT.PRINTER)
          return (
            <span className="text-blue-600 font-semibold text-sm">{value}</span>
          );
        if (value == RESULT.SUCCESS)
          return (
            <span className="text-green-500 font-semibold text-sm">
              {value}
            </span>
          );
      },
    },
    {
      title: "Giải pháp",
      dataIndex: ["solution", "name"],
      key: "solution",
    },
    {
      title: "Cửa hàng",
      dataIndex: ["store", "storeName"],
      key: "storeName",
    },
    {
      title: "Mã máy",
      dataIndex: ["machine", "codeMachine"],
      key: "codeMachine",
      render: (value: string) => {
        return <span className="font-bold">{value}</span>;
      },
    },
    {
      title: "Ngày record",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => {
        return <span>{convertTimestampToDateTime(value)}</span>;
      },
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
      render: (value: string) => {
        return <span>{formatCurrencyVND(value)}</span>;
      },
    },
  ];

  useEffect(() => {
    setStoreCode(undefined);
    setMachineCode(undefined);
    setTypeResult(undefined);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, storeCode, endDate, startDate, machineCode, typeResult]);

  useEffect(() => {
    setPage(0);
  }, [storeCode, machineCode, endDate, startDate]);

  useEffect(() => {
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoader ? (
        <div className="-mt-32">
          <Loader className="z-1000 w-screen xl:-ml-40 overflow-hidden md:-ml-36 h-screen flex flex-col justify-center items-center"></Loader>
        </div>
      ) : (
        <div className="h-screen overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-500">
          <div
            className="xl:mb-5 lb:mb-5 -mb-20 -mt-4 w-[85%] lg:shadow-lg xl:shadow-lg shadow-none border lg:border-gray-200 xl:border-gray-200 border-none 
            px-[12px] rounded-2xl xl:bg-white lg:bg-white
           py-[24px] bg-none xl:fixed lg:fixed z-50"
          >
            <Space wrap className="gap-10">
              <div className="flex flex-col">
                <small className="text-gray-500 mb-1">Mã cửa hàng</small>
                <Select
                  onChange={(value: string) => {
                    setStoreCode(value);
                  }}
                  defaultValue={storeCode}
                  style={{ width: 180 }}
                  allowClear
                  options={storeSelect}
                  placeholder="Lọc theo cửa hàng"
                />
              </div>
              <div className="flex flex-col">
                <small className="text-gray-500 mb-1">Mã máy</small>
                <Select
                  onChange={(value: string) => {
                    setMachineCode(value);
                  }}
                  defaultValue={storeCode}
                  style={{ width: 180 }}
                  allowClear
                  options={machineSelect}
                  placeholder="Lọc theo mã máy"
                />
              </div>
              <div className="flex flex-col">
                <small className="text-gray-500 mb-1">Loại kết quả</small>
                <Select
                  onChange={(value: string) => {
                    setTypeResult(value);
                  }}
                  defaultValue={storeCode}
                  style={{ width: 180 }}
                  allowClear
                  options={resultSelect}
                  placeholder="Lọc theo loại kết quả"
                />
              </div>
              <div className="flex flex-col">
                <small className="text-gray-500 mb-1">Lọc theo ngày</small>
                <RangePicker
                  placeholder={["bắt đầu", "kết thúc"]}
                  style={{ width: 180 }}
                  onChange={(_, dateString) => {
                    setEndDate(dateString[1]);
                    setStartDate(dateString[0]);
                  }}
                />
              </div>
            </Space>
          </div>
          <Table
            style={{ marginTop: 100 }}
            columns={columns}
            dataSource={recordTransactionAll}
            loading={isLoading}
            showHeader={true}
            pagination={{
              current: +page + 1,
              pageSize: +size,
              total: +records?.totalPage * +size,
              onChange: (page) => {
                setPage(page - 1);
              },
            }}
          />
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default RecordTransactionPage;
