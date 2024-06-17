export const formatPrice = (price: number) => {
  const newPrice = new Intl.NumberFormat().format(price);
  return newPrice;
};

export const getTimeDiffer = (date: string) => {
  const receivedDate = new Date(date);
  const getTimeDiffer = Math.floor(
    (Date.now() - receivedDate.getTime()) / 1_000 / (60 * 60)
  );
  return Math.floor(getTimeDiffer / 24) !== 0
    ? Math.floor(getTimeDiffer / 24) + "일 전"
    : Math.floor(getTimeDiffer) + "시간 전";
};
