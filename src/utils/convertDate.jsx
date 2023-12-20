import moment from "jalali-moment";

const formats = {
  total: "dddd، jD jMMMM jYYYY",
  dayMonth: "jD jMMMM",
  default: "HH:mm:ss YYYY/MM/DD",
  defaultT: "HH:mm:ss",
  date: "YYYY/MM/DD",
  newDate: "YYYY,MM,DD,HH,mm,ss",
  jDate: "HH:mm:ss jYYYY/jM/jD",
  jDate2: "jYYYY/jM/jD",
};

const convertDate = ({ date, format }) => {
  const dateAndTime = moment(date).format("YYYY/MM/DD HH:mm:ss");
  return moment(dateAndTime, "YYYY-MM-DD HH:mm:ss").format(
    formats[format] || formats.total
  );
};
export default convertDate;
