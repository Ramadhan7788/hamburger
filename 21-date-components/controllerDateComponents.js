'use strict';

const { promptMillis, validateInput, displayDateComponents } = require('./viewDateComponents');

/**
 * The main function that runs the date components program.
 */
function main() {
  let millis = promptMillis();

  while (!validateInput(millis)) {
    console.log('Invalid input. Please enter a non-negative number.');
    millis = promptMillis();
  }

  displayDateComponents(millis);
}

module.exports = main;