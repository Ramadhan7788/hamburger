'use strict';

const readline = require('readline-sync');

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const YEAR = 365;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Parses a string into a number.
 * @param {string} str 
 * @returns {number|NaN}
 */
function parseNumber(str) {
  const string = str.trim();
  if (string === '') {
    return NaN;
  }
  const number = Number(string);
  return Number.isNaN(number) ? NaN : number;
}

const currentTimestamp = parseNumber(readline.question('Enter Current Unix Timestamp (ms): '));
const postTimestamp = parseNumber(readline.question('Enter Post Unix Timestamp (ms): '));

/**
 * Formats a relative timestamp.
 * @param {number} current 
 * @param {number} post 
 * @returns {string}
 */
function formatRelativeTimestamp(current, post) {
  const diff = current - post;

  if (diff < MINUTE) {
    return 'Just now';
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)} minutes ago`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)} hours ago`;
  } else if (diff < WEEK) {
    return `${Math.floor(diff / DAY)} days ago`;
  } else {
    const date = new Date(post);
    const month = MONTHS[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const elapsedDays = Math.floor(diff / DAY);
    
    if (elapsedDays < YEAR) {
      return `${month} ${day}`;
    } else {
      return `${month} ${day}, ${year}`;
    }
  }
}

const relativeTimestamp = formatRelativeTimestamp(currentTimestamp, postTimestamp);

console.log('');
console.log(`Output: ${relativeTimestamp}`);
