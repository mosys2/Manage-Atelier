const uniqueObjectArray = (array = [], key = "id") =>
  array.filter(
    (e, index, arr) =>
      arr.findIndex((el) => el[`${key}`] === e[`${key}`]) === index
  );
export default uniqueObjectArray;
