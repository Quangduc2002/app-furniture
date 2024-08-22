  var curDate = new Date();

  const Days:any = [];
  for (let Day = 1; Day <= 31; Day++) {
    Days.push(Day);
    // Days.push({ value: Day, label: Day });
  }

  const Months:any = [];
  for (let Month = 1; Month <= 12; Month++) {
      Months.push(Month);
  }

  const Years:any = [];
  for (let Year = curDate.getFullYear(); Year >= 1990; Year--) {
      Years.push(Year);
  }

  export { Days, Months, Years, curDate}