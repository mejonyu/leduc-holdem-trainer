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

export const weekDates = calculateWeekDates();

export const getLocalTodayDate = () => {
  const todayUTC = new Date();
  const today = new Date(
    todayUTC.getTime() - todayUTC.getTimezoneOffset() * 60000
  );
  return today;
};

export const countConsecutiveDays = (
  userEntries: Record<string, boolean>
): number => {
  let count = 0;
  const today = getLocalTodayDate();
  let prevDate = new Date(today);
  prevDate.setDate(prevDate.getDate() - 1);

  do {
    const [dateString] = prevDate.toISOString().split("T");
    if (!userEntries[dateString]) break;
    count++;
    prevDate.setDate(prevDate.getDate() - 1);
  } while (true);

  if (userEntries[today.toISOString().split("T")[0]]) {
    count++;
  }

  return count;
};
