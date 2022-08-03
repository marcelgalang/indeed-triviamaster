const newDate = (): string => {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat('en-US');
  const date = formatter.format(today);
  return date;
};

export default newDate;
