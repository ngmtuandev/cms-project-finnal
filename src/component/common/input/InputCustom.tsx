import { Input } from "antd";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const InputCustom = ({
  label,
  id,
  type = "text",
  register,
  errors,
  validate,
  placeholder,
  defaultValue,
  height,
  suffix,
  control,
  ...props
}: any) => {
  const [isPasswordSibility, setIsPasswordSibility] = useState(false);

  const togglePasswordSibility = () => {
    setIsPasswordSibility(!isPasswordSibility);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: 8,
        position: "relative",
      }}
    >
      {label && (
        <label
          style={{
            fontSize: 14,
            color: "gray",
            marginLeft: 10,
            marginBottom: 4,
          }}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        defaultValue={defaultValue}
        type={isPasswordSibility && type === "password" ? "text" : type}
        id={id}
        style={{
          width: "100%",
          height: height ? height : "4.6vh",
          outline: "none",
          borderRadius: 36,
          borderColor: "#FFA0BC",
          borderWidth: 1,
          paddingLeft: 10,
          paddingRight: 10,
        }}
        {...register(id, validate)}
        {...props}
      ></input>
      {type === "password" && (
        <span
          style={{
            cursor: "pointer",
            paddingRight: 4,
            position: "absolute",
            top: "50%",
            right: 10,
          }}
          onClick={togglePasswordSibility}
        >
          {isPasswordSibility ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </span>
      )}
      {errors && errors[id] && (
        <small
          style={{
            color: "red",
            marginTop: 4,
            fontSize: 14,
          }}
        >
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default InputCustom;
