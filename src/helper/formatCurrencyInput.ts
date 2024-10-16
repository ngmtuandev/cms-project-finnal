export const formatMoneyInput = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};
