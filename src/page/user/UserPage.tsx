import { useGetAllUser } from "../../hooks";
import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Loader, Loading } from "../../component";
import { message } from "antd";
import { Input } from "antd";
import type { GetProps, TableColumnsType } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const UserPage = () => {
  // const { page, size } = usePaginationStore();

  const [data, setData] = useState<any[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const { info, isLoading } = useGetAllUser();

  useEffect(() => {
    setData(info);
  }, [info, isLoading]);

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

  const [_, contextHolder] = message.useMessage();

  const columns: TableColumnsType<any> = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên giáo viên",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (status: boolean) =>
        status ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="green">Ngừng hoạt động</Tag>
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
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
            placeholder="Tìm kiếm nhân viên (theo tên)"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: 20, marginRight: 20 }}
          />
          <Table
            columns={columns}
            dataSource={data}
            loading={isLoading}
            pagination={{
              pageSize: 10,
            }}
          />
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default UserPage;
