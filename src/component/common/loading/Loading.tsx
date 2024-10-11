import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { MESSAGE } from "../../../utils/message";

type LoadingType = {
  isLoading?: boolean;
  setIsLoading?: any;
  messageTimeout?: string;
};

const Loading: React.FC<LoadingType> = ({ isLoading, setIsLoading }) => {
  const [timeElapsed, setTimeElapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let timer: any;

    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false);

        setTimeElapsed(true);
        messageApi.warning(MESSAGE.ERROR_CALL_API_LONG_TIME);
      }, 8000);
    }

    return () => clearTimeout(timer);
  }, [isLoading, setIsLoading]);

  if (!isLoading || timeElapsed) {
    return null;
  }

  return (
    <>
      {contextHolder}
      {isLoading && (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center  bg-slate-800 opacity-50 z-50">
          <Spin
            className="flex items-center"
            indicator={
              <Loading3QuartersOutlined style={{ fontSize: 40 }} spin />
            }
          />
        </div>
      )}
    </>
  );
};

export default Loading;
