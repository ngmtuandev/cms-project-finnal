import { useGetAllUser } from "../../hooks";
import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Loader, Loading } from "../../component";
import { message } from "antd";
import { Input } from "antd";
import { Modal } from "antd";
import type { GetProps, TableColumnsType } from "antd";
import { useCreateNewTeacher } from "../../hooks/user/useCreateNewTeacher";
import { toast } from "react-toastify";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const UserPage = () => {
  // const { page, size } = usePaginationStore();

  const [open, setOpen] = useState(false);

  const [infoNewUser, setInfoNewUser] = useState({
    userName: "",
    email: "",
    role: "EMPLOYEE",
    phoneNumber: "",
    password: "",
  });

  const [data, setData] = useState<any[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const { info, isLoading } = useGetAllUser();

  const { mutate: $createNewTeacher } = useCreateNewTeacher();

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

  const handleAddNewUser = () => {
    if (
      infoNewUser.userName === "" ||
      infoNewUser.email === "" ||
      infoNewUser.phoneNumber === "" ||
      infoNewUser.password === ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    const formData = new FormData();
    formData.append("userName", infoNewUser.userName);
    formData.append("email", infoNewUser.email);
    formData.append("phoneNumber", infoNewUser.phoneNumber);
    formData.append("password", infoNewUser.password);
    formData.append("role", infoNewUser.role);

    $createNewTeacher(formData, {
      onSuccess: (response) => {
        if (response?.isSuccess) {
          toast.success("Thêm giáo viên mới thành công");
          setOpen(false);
        } else {
          toast.error("Thêm giáo viên mới thất bại");
          setOpen(false);
        }
      },
      onError: () => {
        toast.error("Thêm giáo viên mới thất bại");
      },
    });
  };

  return (
    <>
      <Modal
        title="Thêm giáo viên mới"
        centered
        open={open}
        onOk={() => handleAddNewUser()}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <div>
          <div className="flex flex-col gap-1">
            <span>username</span>
            <input
              onChange={(e) =>
                setInfoNewUser({ ...infoNewUser, userName: e.target.value })
              }
              className="w-[100%] p-[8px] border-[1px] border-gray-500 rounded-md"
              placeholder="tên đăng nhập giáo viên"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <span>email</span>
            <input
              onChange={(e) =>
                setInfoNewUser({ ...infoNewUser, email: e.target.value })
              }
              className="w-[100%] p-[8px] border-[1px] border-gray-500 rounded-md"
              placeholder="tài khoản email"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <span>phoneNumber</span>
            <input
              onChange={(e) =>
                setInfoNewUser({ ...infoNewUser, phoneNumber: e.target.value })
              }
              type="number"
              className="w-[100%] p-[8px] border-[1px] border-gray-500 rounded-md"
              placeholder="số điện thoại"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <span>password</span>
            <input
              onChange={(e) =>
                setInfoNewUser({ ...infoNewUser, password: e.target.value })
              }
              type="number"
              className="w-[100%] p-[8px] border-[1px] border-gray-500 rounded-md"
              placeholder="Mật khẩu"
            ></input>
          </div>
        </div>
      </Modal>
      {isLoader ? (
        <div className="-mt-40">
          <Loader className="z-1000 w-screen xl:-ml-40 overflow-hidden md:-ml-28 -ml-5 h-screen flex flex-col justify-center items-center"></Loader>
        </div>
      ) : (
        <div>
          {contextHolder}
          <div className="w-full flex items-center justify-between">
            <Search
              placeholder="Tìm kiếm nhân viên (theo tên)"
              onSearch={onSearch}
              style={{ width: 300, marginBottom: 20, marginRight: 20 }}
            />
            <div
              onClick={() => setOpen(true)}
              className="px-[20px] py-[10px] hover:bg-opacity-85 cursor-pointer bg-pink_main rounded-full"
            >
              <span className="font-semibold">Thêm giáo viên mới</span>
            </div>
          </div>
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
