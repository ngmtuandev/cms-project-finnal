import { useEffect, useState } from "react";
import { useGetAllStore } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Loading } from "../../component";

const StorePage = () => {
  const { isLoading, stores } = useGetAllStore();
  const [storeAll, setStoreAll] = useState([]);

  useEffect(() => {
    setStoreAll(stores);
  }, [stores]);

  const columns: TableColumnsType<any> = [
    {
      title: "Tên cửa hàng",
      dataIndex: "storeName",
      key: "storeName",
    },
    {
      title: "Mã code",
      dataIndex: "storeCode",
      key: "storeCode",
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
        dataSource={storeAll}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: setStoreAll?.length,
        }}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export default StorePage;
