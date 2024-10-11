import { useEffect, useState } from "react";
import { useGetAllMachine } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Loading } from "../../component";

import { Input } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const MachinePage = () => {
  const { isLoading, machines } = useGetAllMachine();
  const [machineAll, setMachineAll] = useState();

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
        placeholder="search code machine"
        onSearch={onSearch}
        style={{ width: 200, marginBottom: 20 }}
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
    </div>
  );
};

export default MachinePage;
