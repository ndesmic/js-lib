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

export function getMonthMatrix(month, year){
  const firstDate = new Date(year, month - 1, 1);
  const dayOfWeek = firstDate.getDay();
  const daysInMonth = getDaysInMonth(month, year);
  const monthMatrix = [
    []
  ];
  for(let i = 1; i < dayOfWeek + 1; i++){
    monthMatrix[0].push(null);
  }
  let j = 0;
  for(let i = 1; i <= daysInMonth; i++){
    monthMatrix[j].push(i);
    if (monthMatrix[j].length % 7 === 0 && i != daysInMonth) {
      j++;
      monthMatrix.push([]);
    }
  }
  while(monthMatrix[j].length < 7){
    monthMatrix[j].push(null);
  }
  return monthMatrix;
}