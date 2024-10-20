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

    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };


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

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
            onClick={() => close()}
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
        ?.toString()
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
  
  

  const columns: TableColumnsType<any> = [
    {
      title: <div className="py-[12px] uppercase text-pink_main text-xl">Tổng quan thống kê</div>,
      children: [
        {
          title: <div className="p-[16px]">Cửa hàng</div>,
          dataIndex: "storeCode",
          key: "storeCode",
          width: 150,
          // ...getColumnSearchProps("storeCode"),
          // sorter: (a, b) => a.storeCode - b.storeCode,
          // ...getColumnSearchProps("storeCode"),
        },
        {
          title: <div 
          className="header-no-padding-red">Lỗi</div>,
          children: [
            {
              title: <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px] text-pink-300">Đã in ảnh</div>,
              dataIndex: "printer",
              key: "printer",
              width: 150,
            },
            {
              title: <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px] text-pink-300">Chưa in ảnh</div>,
              dataIndex: "notPrinter",
              key: "notPrinter",
              width: 150,
            },
          ],
        },
        {
          title: <div className="header-no-padding-green">Chuyển khoản</div>,
          children: [
            {
              title: <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px] text-green-400">Tiền mặt</div>,
              dataIndex: "cash",
              key: "cash",
              width: 150,
            },
            {
              title: <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px] text-green-400">F1</div>,
              dataIndex: "f1",
              key: "f1",
              width: 150,
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const dataSource = overallRecord?.map((item: any) => ({
    storeCode: (
      <div
        onClick={() => {
          toggleModal(item);
        }}
        className="uppercase p-[16px] text-sm font-semibold cursor-pointer hover:text-pink_main text-gray-800"
      >
        {item?.storeCode}
      </div>
    ),
    printer: (
      <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px]">
        <Tag className="text-sm " color="pink">
        {formatCurrencyVND(item?.errorPrinter)}
      </Tag>
      </div>
    ),
    notPrinter: (
      <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px]">
        <Tag className="text-sm" color="pink">
          {formatCurrencyVND(item?.errorNotPrinter)}
        </Tag>
      </div>
    ),
    cash: (
      <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px]">
        <Tag className="text-sm" color="green">
          {formatCurrencyVND(item?.transferCash)}
        </Tag>
      </div>
    ),
    f1: (
      <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px]">
        <Tag className="text-sm" color="green">
          {formatCurrencyVND(item?.transferF1)}
        </Tag>
      </div>
    ),
  }));

  return (
    <>
      {isLoader ? (
        <div className="-mt-16">
          <Loader></Loader>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex flex-col">
              <small className="text-gray-500 mb-1">Lọc theo ngày</small>
              <RangePicker
                placeholder={['Bắt đầu', 'Kết thúc']}
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
            className="custom-table-no-padding"
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
