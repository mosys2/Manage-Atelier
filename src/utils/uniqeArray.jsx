const uniqueArray = (array = []) =>
  array.filter((e, index, arr) => arr.indexOf(e) === index);

export default uniqueArray;
