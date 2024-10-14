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
  ...props
}: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: 8,
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
        defaultValue={defaultValue && defaultValue}
        type={type}
        id={id}
        style={{
          width: "100%",
          height: height ? height : "4.6vh",
          outline: "none",
          borderRadius: 30,
          paddingLeft: 10,
          borderWidth: "0.5px",
          paddingRight: 10,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
        {...register(id, validate)}
        {...props}
      />
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
