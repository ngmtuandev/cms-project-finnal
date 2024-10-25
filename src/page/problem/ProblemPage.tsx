import { useEffect, useState } from "react";
import {
  useDeleteResult,
  useGetAllProblem,
  useGetAllResult,
} from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table, Tag } from "antd";
import { Loader, Loading } from "../../component";
import { MESSAGE } from "../../utils/message";
import { message } from "antd";
import { Input } from "antd";
import type { GetProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const ProblemPage = () => {
  const { isLoading, problem } = useGetAllProblem();
  const [problemAll, setProblemAll] = useState();
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!value) {
      setProblemAll(problem);
    } else {
      const filteredResult = problem.filter((result: any) =>
        result.typeProblem.toLowerCase().includes(value.toLowerCase())
      );
      setProblemAll(filteredResult);
    }
  };

  useEffect(() => {
    if (problem) setProblemAll(problem);
  }, [problem]);

  const columns: TableColumnsType<any> = [
    {
      title: "Loại vấn đề",
      dataIndex: "typeProblem",
      key: "typeProblem",
      render: (value) => {
        return <Tag color="pink">{value}</Tag>;
      },
    },
    {
      title: "Mã vấn đề",
      dataIndex: "id",
      key: "id",
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
          <Search
            placeholder="Tìm kiếm kết quả (theo loại vấn đề)"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: 20 }}
          />

          <Table
            columns={columns}
            dataSource={problemAll}
            loading={isLoading}
            pagination={{
              pageSize: 10,
              total: problem?.length,
            }}
          />
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default ProblemPage;
