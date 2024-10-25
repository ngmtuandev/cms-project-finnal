import { useEffect, useState } from "react";
import {
  useGetAllResult,
  useGetAllStore,
  useGetFilterRecord,
  useGetMachineByStore,
} from "../../hooks";
import type { TableColumnsType } from "antd";
import { Space, Table, DatePicker, Select, Image, Tag } from "antd";
import { Loading } from "../../component";
import { useFilterRecordStore } from "../../store";
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
  const { machinesOfStore } = useGetMachineByStore(storeCode);
  const { results } = useGetAllResult();

  // state
  const [recordTransactionAll, setRecordTransactionAll] = useState();
  const [storeSelect, setStoreSelect] = useState([]);
  const [machineSelect, setMachineSelect] = useState([]);
  const [resultSelect, setResultSelect] = useState([]);

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

    if (machinesOfStore) {
      let machineConvert = machinesOfStore?.map((item: any) => {
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
  }, [records, page, machinesOfStore, typeResult]);

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
          <Image src={url} width={"80%"} className="object-contain"></Image>
        );
      },
      width: 200,
    },
    {
      title: "Giải pháp",
      dataIndex: ["solution", "name"],
      sorter: (a, b) => a.solution.name.localeCompare(b.solution.name),
      key: "solution",
      render: (value) => {
        return <Tag color="pink">{value}</Tag>;
      },
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
        return <span className="text-pink_main">{value}</span>;
      },
    },
    {
      title: "Kết quả",
      dataIndex: ["result", "typeResult"],
      key: "codeMachine",
      render: (value: string) => {
        return <Tag className="text-gray-600">{value}</Tag>;
      },
    },
    {
      title: "Ngày record",
      dataIndex: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      key: "createdAt",
      render: (value: string) => {
        return <span>{convertTimestampToDateTime(value)}</span>;
      },
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      sorter: (a, b) => parseFloat(a.money) - parseFloat(b.money),
      key: "money",
      render: (value: string) => {
        return (
          <span className="font-semibold">{formatCurrencyVND(value)}</span>
        );
      },
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, storeCode, endDate, startDate, machineCode, typeResult]);

  useEffect(() => {
    setPage(0);
  }, [storeCode, machineCode, endDate, startDate]);

  return (
    <>
      <div className="h-auto overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-500">
        <div
          className=" w-[100%] lg:shadow-sm xl:shadow-sm shadow-none border lg:border-gray-200 xl:border-gray-200 
            border-none px-[12px] rounded-2xl xl:bg-white lg:bg-white pb-[24px] bg-none"
        >
          <Space wrap className="gap-10">
            <div className="flex flex-col">
              <small className="text-gray-500 mb-1">Mã cửa hàng</small>
              <Select
                onChange={(value: string) => {
                  setStoreCode(value);
                }}
                disabled
                defaultValue={storeCode}
                style={{ width: 140 }}
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
                style={{ width: 140 }}
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
                style={{ width: 140 }}
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
                style={{ width: 140 }}
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
                placeholder={["Bắt đầu", "Kết thúc"]}
                style={{ width: 220 }}
                onChange={(_, dateString) => {
                  setEndDate(dateString[1]);
                  setStartDate(dateString[0]);
                }}
              />
            </div>
          </Space>
        </div>
        <Table
          className="custom-table"
          style={{
            marginTop: 20,
          }}
          columns={columns}
          dataSource={recordTransactionAll}
          loading={isLoading}
          showHeader={true}
          scroll={{ y: 340 }}
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
    </>
  );
};

export default RecordOverallDetail;
