import { useEffect, useState } from "react";
import {
  useConfirmSolutionRequest,
  useGetAllSolutionRequest,
  useRejectSolutionRequest,
} from "../../hooks";
import type { TableColumnsType } from "antd";
import { Popconfirm, Space, Table } from "antd";
import { Loading } from "../../component";
import { message } from "antd";
import { Input } from "antd";
import type { GetProps } from "antd";
import { MESSAGE } from "../../utils/message";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const SolutionRequest = () => {
  const { solutionsRequest } = useGetAllSolutionRequest();
  const [solutionAll, setSolutionAll] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: $confirmSolutionRequest } = useConfirmSolutionRequest();
  const { mutate: $rejectSolutionRequest } = useRejectSolutionRequest();

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!value) {
      setSolutionAll(solutionsRequest);
    } else {
      const filteredSolution = solutionsRequest.filter((solution: any) =>
        solution.name.toLowerCase().includes(value.toLowerCase())
      );
      setSolutionAll(filteredSolution);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (solutionsRequest) setSolutionAll(solutionsRequest);
  }, [solutionsRequest]);

  const handleConfirmSolution = (record: any) => {
    $confirmSolutionRequest(record?.id, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.CONFIRM_SOLUTION_REQUEST_SUCCESS);
          setIsLoading(false);
        } else {
          messageApi.error(MESSAGE.CONFIRM_SOLUTION_REQUEST_FAIL);
          setIsLoading(false);
        }
      },
      onError() {
        messageApi.error(MESSAGE.CONFIRM_SOLUTION_REQUEST_FAIL);
        setIsLoading(false);
      },
    });
  };

  const handleRejectSolution = (record: any) => {
    $rejectSolutionRequest(record.id, {
      onSuccess: (response) => {
        if (response?.status === 200) {
          messageApi.success(MESSAGE.REJECT_SOLUTION_REQUEST_SUCCESS);
          setIsLoading(false);
        } else {
          messageApi.error(MESSAGE.REJECT_SOLUTION_REQUEST_FAILURE);
          setIsLoading(false);
        }
      },
      onError() {
        messageApi.error(MESSAGE.REJECT_SOLUTION_REQUEST_FAILURE);
        setIsLoading(false);
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
            title="Xác nhận giải pháp"
            onConfirm={() => {
              handleConfirmSolution(record);
            }}
            okText="Có"
            cancelText="Không"
          >
            <button className="text-pink_main font-semibold">Xác nhận</button>
          </Popconfirm>
          <Popconfirm
            title="Loại bỏ giải pháp"
            onConfirm={() => {
              handleRejectSolution(record);
            }}
            okText="Có"
            cancelText="Không"
          >
            <button className="text-red_main font-semibold">Loại bỏ</button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div>
        <Search
          placeholder="Tìm kiếm yêu cầu mới về giải pháp"
          onSearch={onSearch}
          style={{ width: 300, marginBottom: 20 }}
        />
        <Table
          columns={columns}
          dataSource={solutionAll}
          loading={isLoading}
          pagination={{
            pageSize: 10,
            total: solutionsRequest?.length,
          }}
        />
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default SolutionRequest;
