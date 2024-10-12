import { useEffect, useState } from "react";
import { useDeleteStore, useGetAllStore } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Loading } from "../../component";
import { message } from "antd";

import { Input } from "antd";
import type { GetProps } from "antd";
import { MESSAGE } from "../../utils/message";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const StorePage = () => {
  const { isLoading, stores } = useGetAllStore();
  const [storeAll, setStoreAll] = useState([]);

  const { mutate: $deleteStore } = useDeleteStore();

  const [messageApi, contextHolder] = message.useMessage();

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!value) {
      setStoreAll(stores);
    } else {
      const filteredStore = stores.filter((store: any) =>
        store.storeCode.toLowerCase().includes(value.toLowerCase())
      );
      setStoreAll(filteredStore);
    }
  };

  useEffect(() => {
    setStoreAll(stores);
  }, [stores]);

  const handleDelete = (record: any) => {
    $deleteStore(record?.id, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.DELETE_STORE_SUCCESS);
        } else {
          messageApi.error(MESSAGE.DELETE_STORE_FAILURE);
        }
      },
      onError() {
        messageApi.error(MESSAGE.DELETE_STORE_FAILURE);
      },
    });
  };

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
          <Popconfirm
            title="Xóa cửa hàng"
            description="Bạn có chắc muốn xóa cửa hàng này không?"
            onConfirm={() => {
              handleDelete(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-xl cursor-pointer text-pink_main " />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Search
        placeholder="search code store code"
        onSearch={onSearch}
        style={{ width: 200, marginBottom: 20 }}
      />
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
