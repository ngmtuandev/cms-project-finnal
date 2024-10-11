const InputCustom = ({
  label,
  id,
  type = "text",
  register,
  errors,
  validate,
  placeholder,
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
        type={type}
        id={id}
        style={{
          width: "100%",
          height: "4.3vh",
          outline: "none",
          borderRadius: 20,
          paddingLeft: 10,
          borderWidth: "0.5px",
          paddingRight: 10,
          backgroundColor: "white",
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
