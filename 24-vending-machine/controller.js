'use strict';

const inventory = require('./inventory');
const VendingMachine = require('./model');
const {
  promptUser,
  displaySuccess,
  displayError,
  parseNumber,
} = require('./views');
const {
  ItemNotFoundError,
  OutOfStockError,
  InvalidPaymentError,
  InsufficientPaymentError,
} = require('./errors');

/**
 * The main function that runs the vending machine application.
 */
function main() {
  const machine = new VendingMachine(inventory);

  while (true) {
    const code = promptUser('Enter item code (or "exit" to quit): ');

    if (code === 'exit') {
      console.log('Goodbye!');
      break;
    }

    const paymentInput = parseNumber(promptUser('Enter payment: '));

    try {
      const item = machine.findItem(code);
      const change = machine.purchase(code, paymentInput);
      displaySuccess(item.name, change);

    } catch (err) {
      if (err instanceof ItemNotFoundError ||
        err instanceof OutOfStockError ||
        err instanceof InvalidPaymentError ||
        err instanceof InsufficientPaymentError) {
          displayError(err);
        } else {
          console.error('Something went wrong:', err);
        }
    }
  }
}

module.exports = main;
