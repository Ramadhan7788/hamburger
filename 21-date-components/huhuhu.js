'use strict';

const {
  EPOCH,
  SECONDS_PER_MINUTE,
  MINUTES_PER_HOUR,
  HOURS_PER_DAY,
  MILLIS_PER_SECOND,
  MILLIS_PER_MINUTE,
  MILLIS_PER_HOUR,
  MILLIS_PER_DAY,
  DAYS_PER_GREGORIAN_YEAR,
  STANDARD_CYCLE,
  CENTURY_EXCEPTION,
  CENTURY_LEAP_CYCLE,
  DAYS_IN_YEAR,
} = require('./constants.js');

class MyDate {
  #millis;
  #year;
  #month;
  #date;
  #hours;
  #minutes;
  #seconds;
  #milliseconds;

  constructor(millis) {
    this.#millis = millis;
    this.#decompose();
  }

  #decompose() {
    let remainingDays = Math.floor(this.#millis / MILLIS_PER_DAY);

    this.#year = EPOCH.YEAR;

    const probablyYear = Math.floor(remainingDays / DAYS_PER_GREGORIAN_YEAR);
    this.#year += probablyYear;
    remainingDays -= this.#daysBetweenEpochAndYear();

    while (remainingDays < 0) {
      this.#year--;
      remainingDays += this.#daysInYear();
    }

    let currentYearDays = this.#daysInYear();
    while (remainingDays >= currentYearDays) {
      remainingDays -= currentYearDays;
      this.#year++;
      currentYearDays = this.#daysInYear();
    }

    // remainingDays is now day-of-year (0-indexed)
    const isLeap = this.#isLeapYear();
    const monthDays = isLeap ? MONTH_DAYS_LEAP : MONTH_DAYS_NON_LEAP;
    let month = 0;
    while (remainingDays >= monthDays[month]) {
      remainingDays -= monthDays[month];
      month++;
    }
    this.#month = month;
    this.#date = remainingDays + 1;

    this.#hours = Math.floor(this.#millis / MILLIS_PER_HOUR) % HOURS_PER_DAY;
    this.#minutes = Math.floor(this.#millis / MILLIS_PER_MINUTE) % MINUTES_PER_HOUR;
    this.#seconds = Math.floor(this.#millis / MILLIS_PER_SECOND) % SECONDS_PER_MINUTE;
    this.#milliseconds = this.#millis % MILLIS_PER_SECOND;
  }

  getFullYear() {
    return this.#year;
  }

  getMonth() {
    return this.#month;
  }

  getDate() {
    return this.#date;
  }

  getHours() {
    return this.#hours;
  }

  getMinutes() {
    return this.#minutes;
  }

  getSeconds() {
    return this.#seconds;
  }

  getMilliseconds() {
    return this.#milliseconds;
  }

  toISOString() {
    const pad = (n, w) => String(n).padStart(w, '0');
    return `${pad(this.#year, 4)}-${pad(this.#month + 1, 2)}-${pad(this.#date, 2)}` +
      `T${pad(this.#hours, 2)}:${pad(this.#minutes, 2)}:${pad(this.#seconds, 2)}` +
      `.${pad(this.#milliseconds, 3)}Z`;
  }

  // Enable comparison with <, >, <=, >=
  valueOf() {
    return this.#millis;
  }

  #isLeapYear() {
    return this.#year % CENTURY_LEAP_CYCLE === 0 || (
      this.#year % STANDARD_CYCLE === 0 &&
      this.#year % CENTURY_EXCEPTION !== 0);
  }

  #countLeapYearsUpTo() {
    return Math.floor(this.#year / STANDARD_CYCLE)
      - Math.floor(this.#year / CENTURY_EXCEPTION)
      + Math.floor(this.#year / CENTURY_LEAP_CYCLE);
  }

  #daysBetweenEpochAndYear() {
    const totalLeap = this.#countLeapYearsUpTo(this.#year - 1) - this.#countLeapYearsUpTo(EPOCH.YEAR - 1);
    const totalYears = this.#year - EPOCH.YEAR;
    const totalNonLeap = totalYears - totalLeap;

    return totalLeap * DAYS_IN_YEAR.LEAP + totalNonLeap * DAYS_IN_YEAR.NON_LEAP;
  }

  #daysInYear() {
    return this.#isLeapYear() ? DAYS_IN_YEAR.LEAP : DAYS_IN_YEAR.NON_LEAP;
  }
}

const MONTH_DAYS_NON_LEAP = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Read from stdin
const chunks = [];
process.stdin.on('data', (c) => chunks.push(c));
process.stdin.on('end', () => {
  const input = Buffer.concat(chunks).toString().trim();
  const millis = Number(input);
  const d = new MyDate(millis);

  console.log(`getFullYear(): ${d.getFullYear()}`);
  console.log(`getMonth(): ${d.getMonth()}`);
  console.log(`getDate(): ${d.getDate()}`);
  console.log(`getHours(): ${d.getHours()}`);
  console.log(`getMinutes(): ${d.getMinutes()}`);
  console.log(`getSeconds(): ${d.getSeconds()}`);
  console.log(`getMilliseconds(): ${d.getMilliseconds()}`);
  console.log();
  console.log(`toISOString(): ${d.toISOString()}`);
  console.log();
  console.log(`new MyDate(1000) < new MyDate(2000): ${new MyDate(1000) < new MyDate(2000)}`);
});