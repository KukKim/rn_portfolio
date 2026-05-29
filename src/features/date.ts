import dayjs from "dayjs";

export const getCommonDateText = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};
