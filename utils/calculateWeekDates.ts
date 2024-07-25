const calculateWeekDates = (): Date[] => {
  const todayUTC = new Date();
  const today = new Date(
    todayUTC.getTime() - todayUTC.getTimezoneOffset() * 60000
  );

  const currentDay = today.getDay();
  const diff = currentDay; // No adjustment needed as Sunday is 0
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - diff);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    return date;
  });

  return dates;
};

const weekDates = calculateWeekDates();

export default weekDates;
