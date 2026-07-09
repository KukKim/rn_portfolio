import dayjs from "dayjs";

export const getCommonDateText = ({
  date,
  format = "DD/MM/YYYY",
}: {
  date: Date;
  format?: string;
}) => {
  return dayjs(date).format(format);
};
