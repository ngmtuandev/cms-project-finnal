import { useDeleteUser, useGetAllUser } from "../../hooks";
import { DeleteOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { ROLE } from "../../utils/constant";
import { Loader, Loading } from "../../component";
import { message } from "antd";
import { Input } from "antd";
import type { GetProps } from "antd";
import { MESSAGE } from "../../utils/message";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const UserPage = () => {
  const { info, isLoading } = useGetAllUser();

  const [data, setData] = useState<any[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const { mutate: $deleteUser } = useDeleteUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (info) {
      setData(info);
    }
  }, [info]);

  const handleDelete = (record: any) => {
    $deleteUser(record?.id, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.DELETE_USER_SUCCESS);
        } else {
          messageApi.error(MESSAGE.DELETE_USER_FAILURE);
        }
      },
      onError() {
        messageApi.error(MESSAGE.DELETE_USER_FAILURE);
      },
    });
  };

  const columns: TableColumnsType<any> = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) =>
        status ? (
          <Tag color="green">
            Hoạt động
          </Tag>
        ) : (
          <Tag color="green">
            Ngừng hoạt động
          </Tag>
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
      render: (_, record: any) =>
        record?.role?.roleName == ROLE.ROLE_USER && (
          <Space size="middle">
            <Popconfirm
              title="Xóa người dùng"
              description="Bạn có chắc muốn xóa người dùng này không?"
              onConfirm={() => {
                handleDelete(record);
              }}
              okText="Yes"
              cancelText="No"
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
          <Loader></Loader>
        </div>
      ) : (
        <div>
          {contextHolder}
          <Search
            placeholder="Tìm kiếm nhân viên (theo tên)"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: 20 }}
          />
          <Table
            columns={columns}
            dataSource={data}
            loading={isLoading}
            pagination={{
              pageSize: 8,
              total: 300,
            }}
          />
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default UserPage;
