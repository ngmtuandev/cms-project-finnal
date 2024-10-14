import { useEffect, useState } from "react";
import {
  useDeleteSolution,
  useGetAllSolution,
  useUpdateSolution,
} from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  ButtomCustom,
  InputCustom,
  Loading,
  ModelCustom,
} from "../../component";
import { message } from "antd";
import { Input } from "antd";
import type { GetProps } from "antd";
import { MESSAGE } from "../../utils/message";
import { useForm } from "react-hook-form";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const SolutionPage = () => {
  const { isLoading, solutions } = useGetAllSolution();
  const [solutionAll, setSolutionAll] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solutionUpdate, setSolutionUpdate] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: $deleteSolution } = useDeleteSolution();
  const { mutate: $updateSolution } = useUpdateSolution();

  const toggleModal = (record: any) => {
    setIsModalOpen(!isModalOpen);
    setSolutionUpdate(record);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!value) {
      setSolutionAll(solutions);
    } else {
      const filteredSolution = solutions.filter((solution: any) =>
        solution.name.toLowerCase().includes(value.toLowerCase())
      );
      setSolutionAll(filteredSolution);
    }
  };

  useEffect(() => {
    if (solutions) setSolutionAll(solutions);
  }, [solutions]);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    // reset,
  } = useForm();

  const handleDelete = (record: any) => {
    $deleteSolution(record?.id, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.DELETE_SOLUTION_SUCCESS);
        } else {
          messageApi.error(MESSAGE.DELETE_SOLUTION_FAILURE);
        }
      },
      onError() {
        messageApi.error(MESSAGE.DELETE_SOLUTION_FAILURE);
      },
    });
  };

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
          <Popconfirm
            title="Xóa giải pháp"
            description="Bạn có chắc muốn xóa giải pháp này không?"
            onConfirm={() => {
              handleDelete(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-xl cursor-pointer text-pink_main" />
          </Popconfirm>
          <EditOutlined
            onClick={() => {
              toggleModal(record);
            }}
            className="text-xl cursor-pointer text-pink_main"
          />
        </Space>
      ),
    },
  ];

  const handleUpdateSolution = (value: any) => {
    $updateSolution(
      {
        ...value,
        id: solutionUpdate?.id,
      },
      {
        onSuccess: (response) => {
          if (response?.status === 200) {
            messageApi.success(MESSAGE.UPDATE_SOLUTION_SUCCESS);
            setIsModalOpen(false);
          } else {
            messageApi.error(MESSAGE.UPDATE_SOLUTION_FAILURE);
            setIsModalOpen(false);
          }
        },
        onError() {
          messageApi.error(MESSAGE.UPDATE_SOLUTION_FAILURE);
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      <div>
        {contextHolder}
        <Search
          placeholder="Tìm kiếm giải pháp (theo mã)"
          onSearch={onSearch}
          style={{ width: 300, marginBottom: 20 }}
        />
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
      <ModelCustom isOpen={isModalOpen} onClose={toggleModal}>
        <form
          onSubmit={handleSubmitForm(handleUpdateSolution)}
          className="flex flex-col gap-4"
        >
          <InputCustom
            register={register}
            id="name"
            defaultValue={solutionUpdate?.name}
            errors={formErrors}
            validate={{ required: "Vui lòng nhập tên của giải pháp" }}
            label="Tên giải pháp"
          ></InputCustom>
          <InputCustom
            register={register}
            id="description"
            defaultValue={solutionUpdate?.description}
            errors={formErrors}
            validate={{ required: "Vui lòng nhập mô tả giải pháp" }}
            label="Mô tả giải pháp"
          ></InputCustom>
          <ButtomCustom isLoading={isLoading} text="Cập nhập"></ButtomCustom>
        </form>
      </ModelCustom>
    </>
  );
};

export default SolutionPage;
