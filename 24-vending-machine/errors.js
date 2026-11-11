'use strict';

class ItemNotFoundError extends Error {
  constructor(code) {
    super(`Item ${code} does not exist.`);
    this.name = 'ItemNotFoundError';
    this.code = code;
  }
}

class OutOfStockError extends Error {
  constructor(name) {
    super(`${name} is out of stock.`);
    this.name = 'OutOfStockError';
    this.itemName = name;
  }
}

class InvalidPaymentError extends Error {
  constructor() {
    super('Payment must be a positive whole number.');
    this.name = 'InvalidPaymentError';
  }
}

class InsufficientPaymentError extends Error {
  constructor(name, price, payment) {
    super(`${name} costs $${price}, but you paid $${payment}.`);
    this.name = 'InsufficientPaymentError';
    this.itemName = name;
    this.price = price;
    this.payment = payment;
  }
}

module.exports = {
  ItemNotFoundError,
  OutOfStockError,
  InvalidPaymentError,
  InsufficientPaymentError
};