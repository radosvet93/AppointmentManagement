export const formatDate = (date) => {
  const newDate = new Date(date);
  const dateFormat = `${newDate.getUTCDate()}/${newDate.getUTCMonth()}/${newDate.getUTCFullYear()}`;

  return dateFormat;
};
