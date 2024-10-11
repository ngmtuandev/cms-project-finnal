import { useEffect, useState } from "react";
import { useGetAllSolution } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Loading } from "../../component";

const SolutionPage = () => {
  const { isLoading, solutions } = useGetAllSolution();
  const [solutionAll, setSolutionAll] = useState();

  useEffect(() => {
    if (solutions) setSolutionAll(solutions);
  }, [solutions]);

  const columns: TableColumnsType<any> = [
    {
      title: "Tên giải pháp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
        dataSource={solutionAll}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: solutions?.length,
        }}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export default SolutionPage;
