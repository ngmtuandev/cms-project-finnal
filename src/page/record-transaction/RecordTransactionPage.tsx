import { useEffect, useState } from "react";
import { useGetAllStore, useGetFilterRecord } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table, DatePicker, Select, Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Loading } from "../../component";
import { useFilterRecordStore } from "../../store";
import { RESULT } from "../../utils/constant";
import { convertTimestampToDateTime } from "../../helper";

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
  } = useFilterRecordStore();
  const { isLoading, records } = useGetFilterRecord({
    page,
    size,
    storeCode,
    startDate,
    endDate,
  });
  const { stores } = useGetAllStore();

  // state
  const [recordTransactionAll, setRecordTransactionAll] = useState();
  const [storeSelect, setStoreSelect] = useState([]);

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
    // return () => {
    //   setPage(1);
    //   setEndDate(undefined);
    //   setStartDate(undefined);
    //   setStoreCode(undefined);
    // };
  }, [records, page]);

  console.log("🚀 ~ RecordTransactionPage ~ stores:", storeSelect);

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
        if (value == RESULT.NOT_PRINTE)
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
      title: "Hành động",
      dataIndex: "",
      key: "actions",
      render: (_, record: any) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              //   handleUpdate(record);
            }}
            className="text-xl cursor-pointer hover:text-blue-500"
          />
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc muốn xóa người dùng này không?"
            onConfirm={() => {
              //   handleDelete(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-xl cursor-pointer hover:text-blue-500" />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="mb-5">
        <Space wrap className="gap-10">
          <div className="flex flex-col">
            <small className="text-gray-500 mb-1">Mã cửa hàng</small>
            <Select
              onChange={(value: string) => {
                setStoreCode(value);
              }}
              defaultValue={storeCode}
              style={{ width: 280 }}
              allowClear
              options={storeSelect}
              placeholder="select filter store"
            />
          </div>
          <div className="flex flex-col">
            <small className="text-gray-500 mb-1">Lọc theo ngày</small>
            <RangePicker
              onChange={(_, dateString) => {
                setEndDate(dateString[1]);
                setStartDate(dateString[0]);
              }}
            />
          </div>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={recordTransactionAll}
        loading={isLoading}
        pagination={{
          current: records?.page,
          pageSize: +size,
          total: 20,
          onChange: (page) => {
            setPage(page);
          },
        }}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export default RecordTransactionPage;
