'use strict';

const readline = require('readline-sync');

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

// Hey Edward, your age is 25.

/**
 * Prompts the user to enter their name.
 * @returns {string}
 */
function promptName() {
  return readline.question('Enter name: ');
}

/**
 * Prompts the user to enter a year.
 * @returns {number|NaN}
 */
function promptYear() {
  return parseNumber(readline.question('Enter birth year: '));
}

/**
 * Prompts the user to enter a month.
 * @returns {number|NaN}
 */
function promptMonth() {
  return parseNumber(readline.question('Enter birth month (1-12): '));
}

/**
 * Prompts the user to enter a day.
 * @returns {number|NaN}
 */
function promptDay() {
  return parseNumber(readline.question('Enter birth day (1-31): '));
}

/**
 * Validates a date.
 * @param {number|NaN} year 
 * @param {number|NaN} month 
 * @param {number|NaN} day 
 * @returns {boolean}
 */
function validateDate(year, month, day) {
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return false;
  }

  if (year < 1000 || year > 9999) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  return true;
}

const name = promptName();

function getUserBirthDate() {
  const year = promptYear();
  const month = promptMonth();
  const day = promptDay();
  
  if (!validateDate(year, month, day)) {
    console.log('Invalid date. Please try again.');
    return getUserBirthDate();
  }

  return new Date(year, month - 1, day).getTime();
}

const person = {
  name: name,
  birthDate: getUserBirthDate(),
  getAge() {
    const now = new Date();
    const birthDate = new Date(this.birthDate);
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
};

console.log('');
console.log(`Hey ${person.name}, your age is ${person.getAge()}.`);
