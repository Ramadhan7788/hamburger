'use strict';

const  { 
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
  MONTH_DAYS,
  } = require('./constants');

class MyDate { 
  /**
   * 13 digits, the number of milliseconds since the Unix Epoch
   * @type {number}
   */
  #millis;

  /**
   * The number of years since the Unix Epoch
   * @type {number}
   * @example
   */
  #year;

  /**
   * The number of months since the Unix Epoch
   * @type {number}
   */
  #month;

  /**
   * The number of days since the Unix Epoch
   * @type {number}
   */
  #date;

  /**
   * The number of hours since the Unix Epoch
   * @type {number}
   */
  #hours;

  /**
   * The number of minutes since the Unix Epoch
   * @type {number}
   */
  #minutes;

  /**
   * The number of seconds since the Unix Epoch
   * @type {number}
   */
  #seconds;
  
  /**
   * The number of milliseconds since the Unix Epoch
   * @type {number}
   */
  #milliseconds;

  /**
   * Creates a new MyDate instance
   * @param {number} millis 
   */
  constructor(millis) {
    this.#millis = millis;
    this.#decompose();
  }

  /**
   * Decomposes the milliseconds into its components
   * @private
   * @returns {void}
   */
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

    const isLeap = this.#isLeapYear();
    const monthDays = isLeap ? MONTH_DAYS.LEAP : MONTH_DAYS.NON_LEAP;
  
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

  /**
   * Returns the year component of the date
   * @returns {number} Year
   */
  getFullYear() {
    return this.#year;
  }

  /**
   * Returns the month component of the date
   * @returns {number} Month (0 - 11)
   */
  getMonth() {
    return this.#month;
  }

  /**
   * Returns the day of the month
   * @returns {number} Day of the month (1 - 31)
   */
  getDate() {
    return this.#date;
  }
  
  /**
   * Returns the hours component of the date
   * @returns {number} Hour (0 - 23)
   */
  getHours() {
    return this.#hours;
  }
  
  /**
   * Returns the minutes component of the date
   * @returns {number} Minute (0 - 59)
   */
  getMinutes() {
    return this.#minutes;
  }

  /**
   * Returns the seconds component of the date
   * @returns {number} Second (0 - 59)
   */
  getSeconds() {
    return this.#seconds;
  }

  /**
   * Returns the milliseconds component of the date
   * @returns {number} Millisecond (0 - 999)
   */
  getMilliseconds() {
    return this.#milliseconds;
  }

  /**
   * Returns the ISO 8601 formatted string representation of the date
   * @returns {string} ISO 8601 formatted string 
   * @example "2026-02-19T01:13:26.792Z"
   */
  toISOString() {
    const year = this.#year.toString().padStart(4, '0');
    const month = (this.#month + 1).toString().padStart(2, '0');
    const date = this.#date.toString().padStart(2, '0');
    const hours = this.#hours.toString().padStart(2, '0');
    const minutes = this.#minutes.toString().padStart(2, '0');
    const seconds = this.#seconds.toString().padStart(2, '0');
    const milliseconds = this.#milliseconds.toString().padStart(3, '0');

    return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;  
  }

  /**
   * Returns the primitive value of the date
   * @returns {number} The number of milliseconds since the Unix epoch
   */
  valueOf() {
    return this.#millis;
  }

  // private methods
  /**
   * Determines if the current year is a leap year
   * @private
   * @returns {boolean} True if leap year, false otherwise 
   */
  #isLeapYear() {
    return this.#year % CENTURY_LEAP_CYCLE === 0 || (
      this.#year % STANDARD_CYCLE === 0 && 
      this.#year % CENTURY_EXCEPTION !== 0 );
  }

  /**
   * Counts the number of leap years up to the current year
   * @private
   * @param {number} year - The year to count leap years up to
   * @returns {number} The number of leap years
   */
  #countLeapYearsUpTo(year) {
    return Math.floor(year / STANDARD_CYCLE)
      - Math.floor(year / CENTURY_EXCEPTION)
      + Math.floor(year / CENTURY_LEAP_CYCLE);
  }

  /**
   * Calculates the number of days between the Unix Epoch and the current year
   * @private
   * @returns {number} The number of days
   */
  #daysBetweenEpochAndYear() {
    const totalLeap = this.#countLeapYearsUpTo(this.#year - 1) - this.#countLeapYearsUpTo(EPOCH.YEAR - 1);
    const totalYears = this.#year - EPOCH.YEAR;
    const totalNonLeap = totalYears - totalLeap;

    return totalLeap * DAYS_IN_YEAR.LEAP + totalNonLeap * DAYS_IN_YEAR.NON_LEAP;
  }

  /**
   * Returns the number of days in the current year
   * @private
   * @returns {number} The number of days in the year
   */
  #daysInYear() {
    return this.#isLeapYear() ? DAYS_IN_YEAR.LEAP : DAYS_IN_YEAR.NON_LEAP;
  }
}

module.exports = MyDate;
