let getCalendarInfo = (setter) => {
  let dayArr = [];
  let daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  let daysInPreviousMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    0
  ).getDate();

  let daysOfThePreviousMonthToAdd = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    0
  ).getDay();

  let daysOfTheNextMonthToAdd =
    7 -
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDay();

  // Adding previous month days to array
  for (let i = daysOfThePreviousMonthToAdd; i > 0; i--) {
    dayArr.push({
      number: daysInPreviousMonth - i + 1,
      month: -1,
      monthNumber: new Date().getMonth() - 1,
      year: new Date().getFullYear(),
    });
  }
  // Adding actual month days to array
  for (let i = 1; i <= daysInMonth; i++) {
    dayArr.push({
      number: i,
      month: 0,
      monthNumber: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
  }
  // Adding next month days to array
  for (let i = 1; i <= daysOfTheNextMonthToAdd; i++) {
    dayArr.push({
      number: i,
      month: 1,
      monthNumber: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });
  }

  setter(dayArr);
};

export default getCalendarInfo;
