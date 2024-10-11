import { useGetAllUser } from "../../hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { ROLE } from "../../utils/constant";
import { Loading } from "../../component";

import { Input } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const UserPage = () => {
  const { info, isLoading } = useGetAllUser();

  const [data, setData] = useState<any[]>([]);

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!value) {
      setData(info);
    } else {
      const filteredUser = info.filter((user: any) =>
        user.userName.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredUser);
    }
  };

  useEffect(() => {
    if (info) {
      setData(info);
    }
  }, [info]);

  const columns: TableColumnsType<any> = [
    {
      title: "Họ tên",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) =>
        status ? (
          <span className="bg-green_main py-[4px] px-[6px] text-white font-semibold rounded-2xl">
            Hoạt động
          </span>
        ) : (
          <span className="bg-red_main px-[6px] py-[4px] text-white font-semibold rounded-2xl">
            Ngừng hoạt động
          </span>
        ),
    },
    {
      title: "Vai trò",
      dataIndex: ["role", "roleName"],
      key: "roleName",
      render: (role: string) =>
        role == ROLE.ROLE_ADMIN ? (
          <span>Quản lý</span>
        ) : (
          <span className="font-semibold">Nhân viên</span>
        ),
    },
    {
      title: "Cửa hàng",
      dataIndex: ["store", "storeName"],
      key: "storeName",
      render: (storeName: string | undefined) =>
        storeName ? (
          <span className="font-semibold">{storeName}</span>
        ) : (
          <span className="font-semibold text-red_main">Không có cửa hàng</span>
        ),
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
      <Search
        placeholder="search code store code"
        onSearch={onSearch}
        style={{ width: 200, marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: data?.length,
        }}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export default UserPage;
