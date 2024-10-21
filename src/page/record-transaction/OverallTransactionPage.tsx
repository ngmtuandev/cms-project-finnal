import React, { useEffect, useRef, useState } from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useGetRecordOverall } from "../../hooks";
import { formatCurrencyVND } from "../../helper";
import { DatePicker } from "antd";
import { useFilterRecordStore, useOverallRecordStore } from "../../store";
import { Loader, ModelCustom, RecordOverallDetail } from "../../component";
import icons from "../../utils/icons";
import { saveAs } from "file-saver";
const { RangePicker } = DatePicker;
import ExcelJS from "exceljs";

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

const OverallTransactionPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { FaFileExport } = icons;

  const { setStoreCode } = useFilterRecordStore();

  const toggleModal = (record: any) => {
    console.log("record : ", record);
    setStoreCode(record?.storeCode);
    setIsModalOpen(!isModalOpen);
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

  const columns: TableColumnsType<any> = [
    {
      title: (
        <div className="py-[12px] uppercase text-pink_main text-xl">
          Tổng quan thống kê
        </div>
      ),
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
          title: <div className="header-no-padding-red">Lỗi</div>,
          children: [
            {
              title: (
                <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px] text-pink-300">
                  Đã in ảnh
                </div>
              ),
              dataIndex: "printer",
              key: "printer",
              width: 150,
            },
            {
              title: (
                <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px] text-pink-300">
                  Chưa in ảnh
                </div>
              ),
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
              title: (
                <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px] text-green-400">
                  Tiền mặt
                </div>
              ),
              dataIndex: "cash",
              key: "cash",
              width: 150,
            },
            {
              title: (
                <div className="w-[100%] h-[100%] flex item-center justify-center py-[8px] text-green-400">
                  F1
                </div>
              ),
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
  }, []);

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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Thêm dữ liệu vào worksheet
    worksheet.columns = [
      { header: "storeCode", key: "storeCode", width: 35 },
      { header: "errorPrinter", key: "errorPrinter", width: 20 },
      { header: "errorNotPrinter", key: "errorNotPrinter", width: 20 },
      { header: "transferCash", key: "transferCash", width: 20 },
      { header: "transferF1", key: "transferF1", width: 15 },
    ];

    overallRecord.forEach((record: any) => {
      worksheet.addRow(record);
    });

    // Tô màu cho các ô
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "E7FAE2" }, // Vàng nhạt
          };
        });
      }
      // row.eachCell((cell, colNumber) => {
      //   if (colNumber === 2) {
      //     // Tô màu cho cột "errorPrinter"
      //     cell.fill = {
      //       type: "pattern",
      //       pattern: "solid",
      //       fgColor: { argb: "FFFFCC00" }, // Vàng nhạt
      //     };
      //   }
      //   if (colNumber === 3) {
      //     // Tô màu cho cột "errorNotPrinter"
      //     cell.fill = {
      //       type: "pattern",
      //       pattern: "solid",
      //       fgColor: { argb: "FFFF6666" }, // Đỏ nhạt
      //     };
      //   }
      // });
    });

    // Xuất workbook ra file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const file = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "file_overall_tracking.xlsx");
  };

  return (
    <>
      {isLoader ? (
        <div className="-mt-16">
          <Loader></Loader>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <div className="flex flex-col">
              <small className="text-gray-500 mb-1">Lọc theo ngày</small>
              <RangePicker
                placeholder={["Bắt đầu", "Kết thúc"]}
                style={{ width: 240 }}
                onChange={(_, dateString) => {
                  setEndDate(dateString[1]);
                  setStartDate(dateString[0]);
                }}
              />
            </div>
            <Tag
              onClick={exportToExcel}
              color="pink"
              className="flex cursor-pointer py-[4px] px-[8px] items-center justify-center gap-2"
            >
              <span className="text-gray-600">Xuất file</span>
              <FaFileExport size={20} />
            </Tag>
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
