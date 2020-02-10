export function getTimezone(){
  const dateText = new Date().toString();
  return dateText.match(/\(([^}]*)\)/)[1];
}

export function isLeapYear(year){
  return year % 4 === 0 
    ? year % 100 === 0
      ? year % 400 === 0
        ? true
        : false
      : true
    : false;
}

const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

export function getDaysInMonth(month, year){
  return (month == 2 && isLeapYear(year))
    ? 29
    : daysInMonth[month - 1];
}