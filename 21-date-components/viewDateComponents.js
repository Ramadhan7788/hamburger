'use strict';

const readline = require('readline-sync');
const MyDate = require('./modelDateComponents');

/**
 * Parses a string to a number.
 * @param {string} str 
 * @returns {number|NaN} The parsed number or NaN if the string is empty or not a valid number
 */
function parseNumber(str) {
  const string = str.trim();
  if (string === '') {
    return NaN;
  }
  const number = Number(string);
  return Number.isNaN(number) ? NaN : number;
}

/**
 * Prompts the user to enter milliseconds and returns the parsed number.
 * @returns {number|NaN}
 */
function promptMillis() {
  return parseNumber(readline.question('Enter milliseconds: '));
}

/**
 * Validates the input milliseconds.
 * @param {number|NaN} millis 
 * @returns {boolean}
 */
function validateInput(millis) {
  if (Number.isNaN(millis) || millis < 0) {
    return false;
  }
  
  return true;
}

/**
 * Displays the components of a date.
 * @param {number} millis - The number of milliseconds since the Unix epoch.
 */
function displayDateComponents(millis) {
  const myDate = new MyDate(millis);
  console.log(`\nYear: ${myDate.getFullYear()}`);
  console.log(`Month: ${myDate.getMonth()}`);
  console.log(`Date: ${myDate.getDate()}`);
  console.log(`Hours: ${myDate.getHours()}`);
  console.log(`Minutes: ${myDate.getMinutes()}`);
  console.log(`Seconds: ${myDate.getSeconds()}`);
  console.log(`Milliseconds: ${myDate.getMilliseconds()}`);
  console.log(`\nISO 8601: ${myDate.toISOString()}`);
}

module.exports = {
  parseNumber,
  promptMillis,
  validateInput,
  displayDateComponents,
};