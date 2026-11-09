'use strict';

const DAYS_PER_GREGORIAN_YEAR = 365.2425;

const MILLIS_PER_SECOND = 1000;
const MILLIS_PER_MINUTE = 60 * MILLIS_PER_SECOND;
const MILLIS_PER_HOUR = 60 * MILLIS_PER_MINUTE;
const MILLIS_PER_DAY = 24 * MILLIS_PER_HOUR;

const EPOCH = {
  YEAR: 1970,
  MONTH: 0,
  DAY: 1,
  WEEKDAY: 3,
}

const DAYS_IN_MONTH = {
  LONG_MONTHS: 31,
  SHORT_MONTHS: 30,
  FEBRUARY: {
    LEAP: 29,
    NON_LEAP: 28,
  },
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// function getDaysInMonth(month, year) {
//   switch (month) {
//     case 0: case 2: case 4: case 6: case 7: case 9: case 11:
//       return DAYS_IN_MONTH.LONG_MONTHS;
//     case 3: case 5: case 8: case 10:
//       return DAYS_IN_MONTH.SHORT_MONTHS;
//     case 1:
//       return isLeapYear(year) 
//       ? DAYS_IN_MONTH.FEBRUARY.LEAP 
//       : DAYS_IN_MONTH.FEBRUARY.NON_LEAP;
//   }
// }

// function countLeapYearsUpTo(year) {
//   return Math.floor(year / STANDARD_CYCLE) 
//   - Math.floor(year / CENTURY_EXCEPTION) 
//   + Math.floor(year / CENTURY_LEAP_CYCLE);
// };

// function getDaysSinceEpoch(month, year) {
//   const lastFullYear = year - 1;
//   const epochStartYear = EPOCH.YEAR - 1;
  
//   const totalYears = lastFullYear - epochStartYear;

//   const totalLeap = countLeapYearsUpTo(lastFullYear) - countLeapYearsUpTo(epochStartYear);

//   const totalNonLeap = totalYears - totalLeap;

//   let days = totalLeap * DAYS_IN_YEAR.LEAP 
//   + totalNonLeap * DAYS_IN_YEAR.NON_LEAP;
  
//   for (let i = EPOCH.MONTH; i < month; i++) {
//     days += getDaysInMonth(i, year);
//   }

//   return days += EPOCH.DAY - 1;
// };

// console.log(`isLeapYear(2020): ${isLeapYear(2020)}`);
// console.log(`isLeapYear(2021): ${isLeapYear(2021)}`);
// console.log(`isLeapYear(1900): ${isLeapYear(1900)}`);
// console.log(`isLeapYear(2000): ${isLeapYear(2000)}`);

// console.log(`getDaysInMonth(1, 2020): ${getDaysInMonth(1, 2020)}`);
// console.log(`getDaysInMonth(1, 2021): ${getDaysInMonth(1, 2021)}`);
// console.log(`getDaysInMonth(3, 2021): ${getDaysInMonth(3, 2021)}`);
// console.log(`getDaysInMonth(11, 2021): ${getDaysInMonth(11, 2021)}`);

// console.log(`getDaysSinceEpoch(11, 1999): ${getDaysSinceEpoch(11, 1999)}`);



function getFullYear(millis) {
  let remainingDays = Math.floor(millis / MILLIS_PER_DAY);

  let year = EPOCH.YEAR;
  const probablyYear = Math.floor(remainingDays / DAYS_PER_GREGORIAN_YEAR);

  year += probablyYear;

  remainingDays -= daysBetweenEpochAndYear(year);

  while (remainingDays < 0) {
    year--;
    remainingDays += isLeapYear(year) ? DAYS_IN_YEAR.LEAP : DAYS_IN_YEAR.NON_LEAP;
  }

  let currentYearDays = isLeapYear(year) ? DAYS_IN_YEAR.LEAP : DAYS_IN_YEAR.NON_LEAP;
  while (remainingDays >= currentYearDays) {
    remainingDays -= currentYearDays;
    year++;
    currentYearDays = isLeapYear(year) ? DAYS_IN_YEAR.LEAP : DAYS_IN_YEAR.NON_LEAP;
  }

  return year;
}

console.log(`getFullYear(1771463606792): ${getFullYear(1771463606792)}`);