'use strict';

const readline = require('readline-sync');

/**
 * Prompts the user for input.
 * @param {string} prompt 
 * @returns {string} The user's input
 */
function promptUser(prompt) {
  return readline.question(prompt);
}

/**
 * Displays a success message.
 * @param {string} itemName 
 * @param {number} change 
 */
function displaySuccess(itemName, change) {
  console.log(`Success: You bought ${itemName}. Change: $${change}\n`);
}

/**
 * Displays an error message.
 * @param {string} error 
 */
function displayError(error) {
  console.log(`Failed: ${error.message}\n`);
}

/**
 * Parses a string to a number.
 * @param {string} str 
 * @returns {number|NaN} The parsed number or NaN if the string is empty or not a valid number
 */
function parseNumber(str) {
  if (typeof str !== 'string' || str.trim() === '') {
    return NaN;
  }
  return Number(str);
}

module.exports = {
  promptUser,
  displaySuccess,
  displayError,
  parseNumber,
};
