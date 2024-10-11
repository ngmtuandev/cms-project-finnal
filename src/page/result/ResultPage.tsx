import { useEffect, useState } from "react";
import { useGetAllResult } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Loading } from "../../component";

const ResultPage = () => {
  const { isLoading, results } = useGetAllResult();
  const [resultAll, setResultAll] = useState();

  useEffect(() => {
    if (results) setResultAll(results);
  }, [results]);

  const columns: TableColumnsType<any> = [
    {
      title: "Loại kết quả (giao dịch)",
      dataIndex: "typeResult",
      key: "typeResult",
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
  );
};

export default ResultPage;
