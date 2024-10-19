import React, { useEffect, useRef, useState } from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";
import { useGetRecordOverall } from "../../hooks";
import { formatCurrencyVND } from "../../helper";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import { Button, Input, Space } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { DatePicker } from "antd";
import { useFilterRecordStore, useOverallRecordStore } from "../../store";
import {
  InputCustom,
  Loader,
  ModelCustom,
  RecordOverallDetail,
} from "../../component";

const { RangePicker } = DatePicker;

const useStyle = createStyles(({ css, token }: any) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
          }
        }
      }
    `,
  };
});

interface DataType {
  storeCode: string;
  key: React.Key;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}

type DataIndex = keyof DataType;

const OverallTransactionPage: React.FC = () => {
  const { styles } = useStyle();

  const [searchText, setSearchText] = useState("GV");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const { setStoreCode } = useFilterRecordStore();

  const toggleModal = (record: any) => {
    console.log("record : ", record);
    setStoreCode(record?.storeCode);
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();

    console.log("selectedKeys : ", selectedKeys[0]);
    // setSearchText(() => selectedKeys[0]);
    console.log("==== ", searchText);
    console.log("data index : ", dataIndex);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            console.log("e", e.target.value);
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 400);
  }, []);

  // global state
  const { setEndDate, setStartDate } = useOverallRecordStore();

  const { overallRecord } = useGetRecordOverall();

  const columns: TableColumnsType<any> = [
    {
      title: "Thống kê",
      children: [
        {
          title: "Cửa hàng",
          dataIndex: "storeCode",
          key: "storeCode",
          width: 150,
          sorter: (a, b) => a.storeCode - b.storeCode,
          ...getColumnSearchProps("storeCode"),
        },
        {
          title: <div className="p-0">Lỗi</div>,
          children: [
            {
              title: "Đã In Ảnh",
              dataIndex: "printer",
              key: "printer",
              width: 150,
            },
            {
              title: "Chưa In Ảnh",
              dataIndex: "notPrinter",
              key: "notPrinter",
              width: 150,
            },
          ],
        },
        {
          title: "Chuyển khoản",
          children: [
            {
              title: "Tiền Mặt",
              dataIndex: "cash",
              key: "cash",
              width: 150,
            },
            {
              title: "F1",
              dataIndex: "f1",
              key: "f1",
              width: 150,
            },
          ],
        },
      ],
    },
  ];

  const dataSource = overallRecord?.map((item: any) => ({
    storeCode: (
      <span
        onClick={() => {
          toggleModal(item);
        }}
        className="uppercase text-sm font-semibold cursor-pointer hover:text-pink_main text-gray-800"
      >
        {item?.storeCode}
      </span>
    ),
    printer: (
      <Tag className="text-sm" color="pink">
        {formatCurrencyVND(item?.errorPrinter)}
      </Tag>
    ),
    notPrinter: (
      <Tag className="text-sm" color="pink">
        {formatCurrencyVND(item?.errorNotPrinter)}
      </Tag>
    ),
    cash: (
      <Tag className="text-sm" color="green">
        {formatCurrencyVND(item?.transferCash)}
      </Tag>
    ),
    f1: (
      <Tag className="text-sm" color="green">
        {formatCurrencyVND(item?.transferF1)}
      </Tag>
    ),
  }));

  return (
    <>
      {isLoader ? (
        <div className="-mt-16">
          {" "}
          <Loader></Loader>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex flex-col">
              <small className="text-gray-500 mb-1">Lọc theo ngày</small>
              <RangePicker
                style={{ width: 240 }}
                onChange={(_, dateString) => {
                  setEndDate(dateString[1]);
                  setStartDate(dateString[0]);
                }}
              />
            </div>
          </div>
          <Table<DataType>
            // className={styles.customTable}
            columns={columns}
            dataSource={dataSource}
            bordered
            size="middle"
            // scroll={{ x: "calc(700px + 50%)", y: 47 * 5 }}
          />
          <ModelCustom
            isShowHeader={false}
            isOpen={isModalOpen}
            onClose={toggleModal}
          >
            <RecordOverallDetail></RecordOverallDetail>
          </ModelCustom>
        </div>
      )}
    </>
  );
};

export default OverallTransactionPage;
