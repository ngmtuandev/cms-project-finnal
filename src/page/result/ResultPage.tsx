import { useEffect, useState } from "react";
import { useGetAllResult } from "../../hooks";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { Loading } from "../../component";

import { Input } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const ResultPage = () => {
  const { isLoading, results } = useGetAllResult();
  const [resultAll, setResultAll] = useState();

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!value) {
      setResultAll(results);
    } else {
      const filteredResult = results.filter((result: any) =>
        result.typeResult.toLowerCase().includes(value.toLowerCase())
      );
      setResultAll(filteredResult);
    }
  };

  useEffect(() => {
    if (results) setResultAll(results);
  }, [results]);

  const columns: TableColumnsType<any> = [
    {
      title: "Loại kết quả (giao dịch)",
      dataIndex: "typeResult",
      key: "typeResult",
    },
    {
      title: "Mã kết quả (Giao dịch)",
      dataIndex: "id",
      key: "id",
    },
    // {
    //   title: "Hành động",
    //   dataIndex: "",
    //   key: "actions",
    //   render: (_, record: any) => (
    //     <Space size="middle">
    //       <EditOutlined
    //         onClick={() => {
    //           //   handleUpdate(record);
    //         }}
    //         className="text-xl cursor-pointer hover:text-blue-500"
    //       />
    //       <Popconfirm
    //         title="Xóa người dùng"
    //         description="Bạn có chắc muốn xóa người dùng này không?"
    //         onConfirm={() => {
    //           //   handleDelete(record);
    //         }}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <DeleteOutlined className="text-xl cursor-pointer hover:text-blue-500" />
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];
  return (
    <div>
      <Search
        placeholder="search code result"
        onSearch={onSearch}
        style={{ width: 200, marginBottom: 20 }}
      />

      <Table
        columns={columns}
        dataSource={resultAll}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: results?.length,
        }}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export default ResultPage;
