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
  } = require('./constants.js');

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
   * 
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
   * 
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
  getMonth() {}
  /**
   * Returns the day of the month
   * @returns {number} Day of the month (1 - 31)
   */
  getDate() {
    // return this.#date;
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

  toISOString() {}

  // private methods
  #isLeapYear() {
    return this.#year % CENTURY_LEAP_CYCLE === 0 || (
      this.#year % STANDARD_CYCLE === 0 && 
      this.#year % CENTURY_EXCEPTION !== 0 );
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

const tanggal = new MyDate(1771463606792);
const tahun = tanggal.getFullYear();
const tanggalan = tanggal.getDate();
const hours = tanggal.getHours();
const minutes = tanggal.getMinutes();
const seconds = tanggal.getSeconds();
const milsecon = tanggal.getMilliseconds();

console.log(`tahun: ${tahun}`);
console.log(`tanggal: ${tanggalan}`);
console.log(`jam: ${hours}`);
console.log(`menit: ${minutes}`);
console.log(`detik: ${seconds}`);
console.log(`milidetik: ${milsecon}`);