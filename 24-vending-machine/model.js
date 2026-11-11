'use strict';

const { 
  ItemNotFoundError,
  OutOfStockError,
  InvalidPaymentError,
  InsufficientPaymentError, 
} = require('./errors');

/**
 * A vending machine that dispenses products.
 */
class VendingMachine {
  /**
   * 
   * @param {Array} inventory
   */
  constructor(inventory) {
    this.items = inventory;
  }

  /**
   * Purchases a product from the vending machine.
   * @param {string} code 
   * @param {number} payment
   */
  purchase(code, payment) {
    const item = this.findItem(code);
    if (!item) {
      throw new ItemNotFoundError(code);
    }

    if (!this.#isInStock(item)) {
      throw new OutOfStockError(item.name);
    }

    if (!this.#isPaymentValid(payment)) {
      throw new InvalidPaymentError();
    }

    if (!this.#isPaymentSufficient(payment, item.price)) {
      throw new InsufficientPaymentError(item.name, item.price, payment);
    }

    item.stock -= 1;
    return payment - item.price;
  }

  /**
   * Finds an item in the vending machine by its code.
   * @param {string} code 
   * @returns {object|undefined} The item if found, otherwise undefined.
   */
  findItem(code) {
    return this.items.find(item => item.code === code);
  }

  /**
   * Checks if an item is in stock.
   * @param {object} item 
   * @returns {boolean}
   */
  #isInStock(item) {
    return item.stock > 0;
  }

  /**
   * Checks if the payment is positive whole number.
   * @param {number} payment 
   * @returns {boolean}
   */
  #isPaymentValid(payment) {
    return Number.isInteger(payment) && payment > 0;
  }

  /**
   * Checks if the payment is sufficient to cover the price.
   * @param {number} payment 
   * @param {number} price 
   * @returns {boolean}
   */
  #isPaymentSufficient(payment, price) {
    return payment >= price;
  }
}

module.exports = VendingMachine;
