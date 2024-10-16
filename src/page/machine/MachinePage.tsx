import { useEffect, useState } from "react";
import {
  useDeleteMachine,
  useGetAllMachine,
  useUpdateMachine,
} from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import {
  ButtomCustom,
  InputCustom,
  Loading,
  ModelCustom,
} from "../../component";
import { MESSAGE } from "../../utils/message";
import { message } from "antd";
import { Input } from "antd";
import type { GetProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const MachinePage = () => {
  const { isLoading, machines } = useGetAllMachine();
  const [machineAll, setMachineAll] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [machineUpdate, setMachineUpdate] = useState<any>();

  const { mutate: $updateMachine } = useUpdateMachine();

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  const toggleModal = (record: any) => {
    setMachineUpdate(record);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    reset({
      codeMachine: machineUpdate?.codeMachine,
    });
  }, [reset, machineUpdate]);

  const handleUpdateMachine = (value: any) => {
    $updateMachine(
      { id: machineUpdate?.id, ...value },
      {
        onSuccess: (response) => {
          if (response?.status === 200) {
            messageApi.success(MESSAGE.UPDATE_MACHINE_SUCCESS);
          } else {
            messageApi.error(MESSAGE.UPDATE_MACHINE_FAILURE);
          }
        },
        onError() {
          messageApi.error(MESSAGE.UPDATE_MACHINE_FAILURE);
        },
      }
    );
    setIsModalOpen(false);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: $deleteMachine } = useDeleteMachine();

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!value) {
      setMachineAll(machines);
    } else {
      const filteredMachines = machines.filter((machine: any) =>
        machine.codeMachine.toLowerCase().includes(value.toLowerCase())
      );
      setMachineAll(filteredMachines);
    }
  };

  const handleDelete = (record: any) => {
    $deleteMachine(record?.id, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.DELETE_MACHINE_SUCCESS);
        } else {
          messageApi.error(MESSAGE.DELETE_MACHINE_FAILURE);
        }
      },
      onError() {
        messageApi.error(MESSAGE.DELETE_MACHINE_FAILURE);
      },
    });
  };

  useEffect(() => {
    if (machines) setMachineAll(machines);
  }, [machines]);

  const columns: TableColumnsType<any> = [
    {
      title: "Mã Code (máy)",
      dataIndex: "codeMachine",
      key: "codeMachine",
    },
    {
      title: "Mã (id)",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "actions",
      render: (_, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa máy này"
            onConfirm={() => {
              handleDelete(record);
            }}
            okText="Có"
            cancelText="Không"
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
  return (
    <div>
      {contextHolder}
      <Search
        placeholder="Tìm kiếm máy (theo mã)"
        onSearch={onSearch}
        style={{ width: 300, marginBottom: 20 }}
      />

      <Table
        columns={columns}
        dataSource={machineAll}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: machines?.length,
        }}
      />
      {isLoading && <Loading />}
      <ModelCustom isOpen={isModalOpen} onClose={toggleModal}>
        <form
          onSubmit={handleSubmitForm(handleUpdateMachine)}
          className="flex flex-col gap-4"
        >
          <InputCustom
            register={register}
            id="codeMachine"
            defaultValue={machineUpdate?.codeMachine}
            errors={formErrors}
            validate={{ required: "Vui lòng nhập max code máy" }}
            label="Mã code của máy"
          ></InputCustom>
          <ButtomCustom isLoading={isLoading} text="Cập nhập"></ButtomCustom>
        </form>
      </ModelCustom>
    </div>
  );
};

export default MachinePage;
