import { useEffect, useState } from "react";
import { useDeleteResult, useGetAllResult } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table, Tag } from "antd";
import { Loader, Loading } from "../../component";
import { MESSAGE } from "../../utils/message";
import { message } from "antd";
import { Input } from "antd";
import type { GetProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const ResultPage = () => {
  const { isLoading, results } = useGetAllResult();
  const [resultAll, setResultAll] = useState();
  const [isLoader, setIsLoader] = useState(false);

  const { mutate: $deleteResult } = useDeleteResult();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = (record: any) => {
    $deleteResult(record?.id, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.DELETE_RESULT_SUCCESS);
        } else {
          messageApi.error(MESSAGE.DELETE_RESULT_FAILURE);
        }
      },
      onError() {
        messageApi.error(MESSAGE.DELETE_RESULT_FAILURE);
      },
    });
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!value) {
      setResultAll(results);
    } else {
      const filteredResult = results.filter((result: any) =>
        result.typeResult.toLowerCase().includes(value.toLowerCase())
      );
      setResultAll(filteredResult);
    }
  };

  useEffect(() => {
    if (results) setResultAll(results);
  }, [results]);

  const columns: TableColumnsType<any> = [
    {
      title: "Loại kết quả (giao dịch)",
      dataIndex: "typeResult",
      key: "typeResult",
      render: (value) => {
        return <Tag color="pink">{value}</Tag>;
      },
    },
    {
      title: "Mã kết quả (Giao dịch)",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "actions",
      render: (_, record: any) => (
        <Space size="middle" className="flex ml-4">
          <Popconfirm
            title="Xóa kết quả"
            onConfirm={() => {
              handleDelete(record);
            }}
            okText="Có"
            cancelText="Không"
          >
            <DeleteOutlined className="text-xl cursor-pointer text-pink_main" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 500);
  }, []);

  return (
    <>
      {isLoader ? (
        <div className="-mt-40">
          <Loader className="z-1000 w-screen xl:-ml-40 overflow-hidden md:-ml-28 -ml-5 h-screen flex flex-col justify-center items-center"></Loader>
        </div>
      ) : (
        <div>
          {contextHolder}
          <Search
            placeholder="Tìm kiếm kết quả (theo mã)"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: 20 }}
          />

          <Table
            columns={columns}
            dataSource={resultAll}
            loading={isLoading}
            pagination={{
              pageSize: 10,
              total: results?.length,
            }}
          />
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default ResultPage;
