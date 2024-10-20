import { useEffect, useState } from "react";
import { useDeleteStore, useGetAllStore, useUpdateStore } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  ButtomCustom,
  InputCustom,
  Loader,
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

const StorePage = () => {
  const { isLoading, stores } = useGetAllStore();
  const [storeAll, setStoreAll] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeUpdate, setStoreUpdate] = useState<any>();
  const [isLoader, setIsLoader] = useState(false);

  const { mutate: $deleteStore } = useDeleteStore();
  const { mutate: $updateStore } = useUpdateStore();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  const toggleModal = (record: any) => {
    setStoreUpdate(record);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (storeUpdate) {
      {
        reset({
          storeName: storeUpdate?.storeName,
          storeCode: storeUpdate?.storeCode,
        });
      }
    }
  }, [reset, storeUpdate]);

  const handleUpdateStore = (value: any) => {
    $updateStore(
      { ...value },
      {
        onSuccess: (response) => {
          if (response?.status === 200) {
            messageApi.success(MESSAGE.UPDATE_STORE_SUCCESS);
          } else {
            messageApi.error(MESSAGE.UPDATE_STORE_FAILURE);
          }
        },
        onError() {
          messageApi.error(MESSAGE.UPDATE_STORE_FAILURE);
        },
      }
    );
    setIsModalOpen(false);
  };

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
      render: (value) => {
        return <Tag color="pink">{value}</Tag>
      }
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "actions",
      render: (_, record: any) => (
        <Space size="middle" className="flex ml-4">
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
            placeholder="Tìm kiếm cửa hàng (theo mã code)"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: 20 }}
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
          <ModelCustom 
          className="bg-white rounded-lg shadow-lg px-[2%] py-[2%] w-[40%] md:max-h-[90%] lg:max-h-[90%] xl:max-h-[90%]"
          isOpen={isModalOpen} onClose={toggleModal}>
            <form
              onSubmit={handleSubmitForm(handleUpdateStore)}
              className="flex flex-col gap-4"
            >
              <InputCustom
                register={register}
                id="storeName"
                defaultValue={storeUpdate?.storeName}
                errors={formErrors}
                validate={{ required: "Vui lòng nhập tên của giải pháp" }}
                label="Tên giải pháp"
              ></InputCustom>
              <InputCustom
                register={register}
                id="storeCode"
                defaultValue={storeUpdate?.storeName}
                errors={formErrors}
                validate={{ required: "Vui lòng nhập mô tả giải pháp" }}
                label="Mô tả giải pháp"
              ></InputCustom>
              <ButtomCustom
                isLoading={isLoading}
                text="Cập nhập"
              ></ButtomCustom>
            </form>
          </ModelCustom>
        </div>
      )}
    </>
  );
};

export default StorePage;
