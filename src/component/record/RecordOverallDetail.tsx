import { useEffect, useState } from "react";
import {
  useGetAllMachine,
  useGetAllResult,
  useGetAllStore,
  useGetFilterRecord,
} from "../../hooks";
import type { TableColumnsType } from "antd";
import { Space, Table, DatePicker, Select, Image, Tag } from "antd";
import { Loader, Loading } from "../../component";
import { useFilterRecordStore } from "../../store";
import { RESULT } from "../../utils/constant";
import { convertTimestampToDateTime, formatCurrencyVND } from "../../helper";

const { RangePicker } = DatePicker;

const RecordOverallDetail = () => {
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
    typeTransaction,
    setTypeTransaction,
  } = useFilterRecordStore();
  console.log("🚀 ~ RecordOverallDetail ~ storeCode:", storeCode);

  const { isLoading, records } = useGetFilterRecord({
    page,
    size,
    storeCode,
    startDate,
    endDate,
    machineCode,
    typeResult,
    typeTransaction,
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
      title: "Nhân viên",
      dataIndex: ["user", "userName"],
      key: "userName",
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
      dataIndex: ["typeTransaction"],
      key: "typeTransaction",
      render: (value: string) => {
        if (value == RESULT.FAIL) return <Tag color="red">{value}</Tag>;
        if (value == RESULT.NOT_PRINTE)
          return <Tag color="yellow">{value}</Tag>;
        if (value == RESULT.PENDING) return <Tag color="pink">{value}</Tag>;
        if (value == RESULT.PRINTER) return <Tag color="purple">{value}</Tag>;
        if (value == RESULT.SUCCESS) return <Tag color="green">{value}</Tag>;
        if (value == RESULT.F1) return <Tag color="orange">{value}</Tag>;
        if (value == RESULT.CASH) return <Tag color="gold">{value}</Tag>;
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

  // useEffect(() => {
  //   setMachineCode(undefined);
  //   setTypeResult(undefined);
  // }, []);

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
        <div className="-mt-40">
          <Loader></Loader>
        </div>
      ) : (
        <div className="h-screen overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-500">
          <div
            className="xl:mb-5 -mb-20 xl:-mt-10 lg:-mt-9 md:-mt-8 sm:mt-0 w-[85%] lg:shadow-lg xl:shadow-lg shadow-none border lg:border-gray-200 xl:border-gray-200 border-none 
            px-[12px] rounded-2xl xl:bg-white lg:bg-white py-[24px] bg-none xl:fixed lg:fixed fixed z-50"
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
                  style={{ width: 180 }}
                  allowClear
                  options={resultSelect}
                  placeholder="Lọc theo loại kết quả"
                />
              </div>
              <div className="flex flex-col">
                <small className="text-gray-500 mb-1">Loại giao dịch</small>
                <Select
                  onChange={(value: string) => {
                    setTypeTransaction(value);
                  }}
                  style={{ width: 180 }}
                  allowClear
                  defaultValue={"ERROR"}
                  options={[
                    {
                      label: "Chuyển khoản",
                      value: "TRANSFER",
                    },
                    {
                      label: "Lỗi",
                      value: "ERROR",
                    },
                  ]}
                  placeholder="Lọc theo loại kết quả"
                />
              </div>
              <div className="flex flex-col">
                <small className="text-gray-500 mb-1">Lọc theo ngày</small>
                <RangePicker
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
            style={{ marginTop: 80 }}
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

export default RecordOverallDetail;
