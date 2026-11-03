const { expect } = require('chai');
const Matrix = require('../src/matrix');

// The test plan: one skipped it() per planned behaviour.
// it.skip() tests are "pending" — mocha lists them without running.

describe('Matrix constructor', () => {
  it.skip('creates a matrix from a 2D array');
  it.skip('reads elements with get(i, j)');
  it.skip('makes a defensive copy of the input array');
  it.skip('rejects a ragged (non-rectangular) array');
  it.skip('rejects an empty array');
  it.skip('rejects a non-array argument');
});

describe('Element access and factories', () => {
  it.skip('throws when the index is out of range');
  it.skip('zeros(r, c) builds a matrix filled with zeros');
  it.skip('ones(r, c) builds a matrix filled with ones');
  it.skip('eye(n) builds the identity matrix');
});

describe('Addition, subtraction and scaling', () => {
  it.skip('adds two matrices element-wise');
  it.skip('subtracts two matrices element-wise');
  it.skip('multiplies every element by a scalar');
  it.skip('does not modify the operands');
  it.skip('throws when shapes do not match');
});

describe('Matrix multiplication', () => {
  it.skip('multiplies two 2x2 matrices');
  it.skip('multiplies non-square matrices (2x3 by 3x1)');
  it.skip('throws when inner dimensions differ');
});

describe('Transpose', () => {
  it.skip('transposes a 2x3 matrix into a 3x2 matrix');
  it.skip('applied twice gives the original matrix back');
});

describe('Determinant', () => {
  it.skip('is 1 for the identity matrix');
  it.skip('is 0 for a singular matrix');
  it.skip('computes ad - bc for a 2x2 matrix');
  it.skip('computes the determinant of a 3x3 matrix');
  it.skip('throws for a non-square matrix');
});

describe('Output and comparison', () => {
  it.skip('toString() renders one row per line');
  it.skip('equal() is true for matrices with the same content');
  it.skip('equal() is false for different shapes or values');
});
