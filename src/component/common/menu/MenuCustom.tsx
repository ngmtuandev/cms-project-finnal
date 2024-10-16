import { useState } from "react";
import {
  ApiOutlined,
  MedicineBoxOutlined,
  ShopOutlined,
  SolutionOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import path from "../../../utils/path";
import { withRouter } from "../../../hocs";

const MenuCustom = ({ navigate }: any) => {
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      key: path.MANAGER_USER,
      icon: <UserOutlined />,
      label: "Nhân viên",
      children: [
        { key: path.MANAGER_USER, label: "Quản lý nhân viên" },
        { key: path.CREATE_USER, label: "Thêm nhân viên" },
      ],
    },
    {
      key: path.MANAGER_STORE,
      icon: <ShopOutlined />,
      label: "Cửa hàng",
      children: [
        { key: path.MANAGER_STORE, label: "Quản lý cửa hàng" },
        { key: path.CREATE_STORE, label: "Tạo mới cửa hàng" },
      ],
    },
    {
      key: path.MANAGER_SOLUTION,
      icon: <SolutionOutlined />,
      label: "Giải pháp",
      children: [
        { key: path.MANAGER_SOLUTION, label: "Quản lý giải pháp" },
        { key: path.CREATE_SOLUTION, label: "Tạo mới giải pháp" },
        { key: path.MANAGER_SOLUTION_REQUEST, label: "Yêu cầu tạo mới" },
      ],
    },
    {
      key: path.MANAGER_RESULT,
      icon: <MedicineBoxOutlined />,
      label: "Kết quả",
      children: [
        { key: path.MANAGER_RESULT, label: "Quản lý kết quả" },
        { key: path.CREATE_RESULT, label: "Tạo mới kết quả" },
      ],
    },
    {
      key: path.MANAGER_MACHINE,
      icon: <ApiOutlined />,
      label: "Máy",
      children: [
        { key: path.MANAGER_MACHINE, label: "Quản lý máy" },
        { key: path.CREATE_MACHINE, label: "Tạo mới máy" },
      ],
    },
    {
      key: path.MANAGER_RECORD_TRANSACTION,
      icon: <TransactionOutlined />,
      label: "Giao dịch",
      children: [
        {
          key: path.MANAGER_RECORD_TRANSACTION,
          label: "Quản lý giao dịch",
        },
        {
          key: path.ANALYSIS_RECORD_WITH_TYPE_RESULT,
          label: "Phân tích theo kết quả",
        },
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

  // reponsive
  // const isMobile = window.innerWidth < 768;

  return (
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
      style={{ width: 256, height: "100%" }}
      items={items}
    />
  );
};

export default withRouter(MenuCustom);
