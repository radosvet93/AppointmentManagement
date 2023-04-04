export const formatDate = (date) => {
  const newDate = new Date(date);
  const dateFormat = `${newDate.getUTCDate()}/${newDate.getUTCMonth()}/${newDate.getUTCFullYear()}`;

  return dateFormat;
};

export const maxMinDates = () => {
  const today = new Date();
  const incomingWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7,
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  );
  today.setUTCHours(today.getUTCHours() + 4);

  const minDate = today.toISOString().slice(0, -8);
  const maxDate = incomingWeek.toISOString().slice(0, -8);

  return { minDate, maxDate };
};
