  var curDate = new Date();

  const Days:any = [];
  const DaySelects:any = [];
  for (let Day = 1; Day <= 31; Day++) {
    Days.push(Day);
    DaySelects.push({ value: Day, label: Day });
  }

  const Months:any = [];
  const MonthSelects:any = [];
  for (let Month = 1; Month <= 12; Month++) {
      Months.push(Month);
      MonthSelects.push({ value: Month, label: `Tháng ${Month}` });

  }

  const Years:any = [];
  const YearSelects:any = [];
  for (let Year = curDate.getFullYear(); Year >= 1990; Year--) {
      Years.push(Year);
      YearSelects.push({ value: Year, label: Year });

  }

  export { Days, Months, Years, curDate,DaySelects,MonthSelects,YearSelects}