export const fixPad = (digit) => (digit <= 9 ? `0${digit}` : digit);

export const formatDate = (_date, {delimiter = '/'} = {}) => {
  const date = typeof _date === 'string' ? new Date(_date) : _date;

  return `${fixPad(date.getMonth() + 1)}${delimiter}${fixPad(
    date.getDate(),
  )}${delimiter}${date.getFullYear()}`;
};

export const formatTime = (_date, {format = 12} = {}) => {
  const date = typeof _date === 'string' ? new Date(_date) : _date;

  const hours =
    format === 12 && date.getHours() !== 12
      ? date.getHours() % 12
      : date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return `${fixPad(hours)}:${fixPad(date.getMinutes())} ${ampm}`;
};

export const formatDateTime = (date, options = {}) =>
  `${formatDate(date, options)} ${formatTime(date, options)}`;
