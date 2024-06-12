export const formatPrice = (price) => {
  const newPrice = new Intl.NumberFormat().format(price);
  return newPrice;
};

export const getTimeDiffer = (date) => {
  const getTimeDiffer = Math.floor(
    (Date.now() - new Date(date)) / 1_000 / (60 * 60)
  );
  return Math.floor(getTimeDiffer / 24) !== 0
    ? Math.floor(getTimeDiffer / 24) + "일 전"
    : Math.floor(getTimeDiffer) + "시간 전";
};
