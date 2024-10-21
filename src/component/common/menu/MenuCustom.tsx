import { useEffect, useState } from "react";
import {
  ApiOutlined,
  MedicineBoxOutlined,
  ShopOutlined,
  SolutionOutlined,
  TransactionOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Menu } from "antd";
import path from "../../../utils/path";
import { withRouter } from "../../../hocs";
import { useGetAllSolutionWithCondition } from "../../../hooks";
import { useCommonStore, useConditionSolutionStore } from "../../../store";

const MenuCustom = ({ navigate }: any) => {
  type MenuItem = Required<MenuProps>["items"][number];

  const { solutionCondition } = useGetAllSolutionWithCondition();
  const [solutionAll, setSolutionAll] = useState<[]>([]);
  // global state in zustand for condition
  const { setIsActive } = useConditionSolutionStore();

  useEffect(() => {
    setIsActive(false);
    if (solutionCondition) setSolutionAll(solutionCondition);
  }, [solutionCondition]);

  const items: MenuItem[] = [
    {
      key: path.DASH_BOARD,
      icon: <BarChartOutlined />,
      label: "Dash Board",
      children: [
        { key: path.DASH_BOARD, label: "Thống kê giao dịch" },
        // { key: path.DASH_BOARD_TRANSFER, label: "Chuyển khoản" },
      ],
    },
    {
      key: path.MANAGER_RECORD_TRANSACTION,
      icon: <TransactionOutlined />,
      label: "Giao dịch",
      children: [
        {
          key: path.OVERALL_TRANSACTION,
          label: "Tổng quan",
        },
        // {
        //   key: path.MANAGER_RECORD_TRANSACTION,
        //   label: "Quản lý",
        // },
      ],
    },
    {
      key: path.MANAGER_STORE,
      icon: <ShopOutlined />,
      label: "Cửa hàng",
      children: [
        { key: path.MANAGER_STORE, label: "Quản lý" },
        { key: path.CREATE_STORE, label: "Tạo mới" },
      ],
    },
    {
      key: path.MANAGER_USER,
      icon: <UserOutlined />,
      label: "Nhân viên",
      children: [
        { key: path.MANAGER_USER, label: "Quản lý" },
        { key: path.CREATE_USER, label: "Thêm mới" },
      ],
    },
    {
      key: path.MANAGER_MACHINE,
      icon: <ApiOutlined />,
      label: "Máy",
      children: [
        { key: path.MANAGER_MACHINE, label: "Quản lý" },
        { key: path.CREATE_MACHINE, label: "Thêm mới" },
      ],
    },
    {
      key: path.MANAGER_SOLUTION,
      icon: <SolutionOutlined />,
      label: "Giải pháp",
      children: [
        { key: path.MANAGER_SOLUTION, label: "Quản lý" },
        { key: path.CREATE_SOLUTION, label: "Tạo mới" },
        {
          key: path.MANAGER_SOLUTION_REQUEST,
          label: (
            <div>
              <Badge size="small" count={solutionAll?.length!}>
                Yêu cầu
              </Badge>
            </div>
          ),
        },
      ],
    },
    {
      key: path.MANAGER_RESULT,
      icon: <MedicineBoxOutlined />,
      label: "Kết quả",
      children: [
        { key: path.MANAGER_RESULT, label: "Quản lý" },
        { key: path.CREATE_RESULT, label: "Tạo mới" },
      ],
    },
  ];

  interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
  }

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const { isOpenMenuMobile, setIsOpenMenuMobile } = useCommonStore();

  // reponsive
  // const isMobile = window.innerWidth < 768;

  return (
    <div className="bg-pink_light">
      <Menu
        onClick={({ key }) => {
          if (key === "signout") {
            return;
          } else {
            navigate(key);
          }
        }}
        mode="inline"
        defaultSelectedKeys={["231"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
          // width: "auto",
          // height: "100%",
          overflow: "auto",
          top: 90,
          bottom: 0,
          insetInlineStart: 0,
          scrollbarWidth: "thin",
          scrollbarColor: "unset",
        }}
        className="sm:flex-col sm:flex hidden md:flex xl:flex lg:flex xl:flex-col bg-white xl:bg-pink_light lg:bg-pink_light lg:flex-col 
        overflow-x-auto xl:w-[200px] lg:w-[200px] scrollbar-thin scrollbar-thumb-gray-500
        scroll-smooth xl:h-screen lg:h-screen h-screen"
        items={items}
      />
    </div>
  );
};

export default withRouter(MenuCustom);
