const { expect } = require('chai');
const Matrix = require('../src/matrix');

describe('Matrix constructor', () => {
  it('creates a matrix from a 2D array', () => {
    const m = new Matrix([[1, 2, 3], [4, 5, 6]]);
    expect(m.rows).to.equal(2);
    expect(m.cols).to.equal(3);
  });

  it('reads elements with get(i, j)', () => {
    const m = new Matrix([[1, 2, 3], [4, 5, 6]]);
    expect(m.get(1, 2)).to.equal(6);
    expect(m.get(0, 0)).to.equal(1);
  });

  it('makes a defensive copy of the input array', () => {
    const src = [[1, 2], [3, 4]];
    const m = new Matrix(src);
    src[0][0] = 99;
    expect(m.get(0, 0)).to.equal(1);
  });

  it('rejects a ragged (non-rectangular) array', () => {
    const makeBad = () => new Matrix([[1, 2], [3]]);
    expect(makeBad).to.throw(/same length/);
  });

  it('rejects an empty array', () => {
    const makeEmpty = () => new Matrix([]);
    expect(makeEmpty).to.throw(/non-empty/);
  });

  it('rejects a non-array argument', () => {
    const makeBad = () => new Matrix('not a matrix');
    expect(makeBad).to.throw(/2D array/);
  });
});

describe('Element access and factories', () => {
  it('throws when the index is out of range', () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    expect(() => m.get(0, 5)).to.throw(/out of range/);
    expect(() => m.get(-1, 0)).to.throw(/out of range/);
  });

  it('zeros(r, c) builds a matrix filled with zeros', () => {
    const m = Matrix.zeros(2, 3);
    expect(m.rows).to.equal(2);
    expect(m.cols).to.equal(3);
    expect(m.get(1, 2)).to.equal(0);
  });

  it('ones(r, c) builds a matrix filled with ones', () => {
    const m = Matrix.ones(2, 2);
    expect(m.get(0, 1)).to.equal(1);
    expect(m.get(1, 0)).to.equal(1);
  });

  it('eye(n) builds the identity matrix', () => {
    const m = Matrix.eye(3);
    expect(m.get(0, 0)).to.equal(1);
    expect(m.get(1, 1)).to.equal(1);
    expect(m.get(0, 1)).to.equal(0);
    expect(m.get(2, 0)).to.equal(0);
  });
});

describe('Addition, subtraction and scaling', () => {
  it('adds two matrices element-wise', () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[5, 6], [7, 8]]);
    const c = a.add(b);
    expect(c.get(0, 0)).to.equal(6);
    expect(c.get(0, 1)).to.equal(8);
    expect(c.get(1, 0)).to.equal(10);
    expect(c.get(1, 1)).to.equal(12);
  });

  it('subtracts two matrices element-wise', () => {
    const a = new Matrix([[5, 6], [7, 8]]);
    const b = new Matrix([[1, 2], [3, 4]]);
    const c = a.sub(b);
    expect(c.get(0, 0)).to.equal(4);
    expect(c.get(1, 1)).to.equal(4);
  });

  it('multiplies every element by a scalar', () => {
    const a = new Matrix([[1, -2], [3, 4]]);
    const c = a.scale(2);
    expect(c.get(0, 1)).to.equal(-4);
    expect(c.get(1, 0)).to.equal(6);
  });

  it('does not modify the operands', () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[5, 6], [7, 8]]);
    a.add(b).sub(b).scale(3);
    expect(a.get(0, 0)).to.equal(1);
    expect(a.get(1, 1)).to.equal(4);
  });

  it('throws when shapes do not match', () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[1, 2, 3], [4, 5, 6]]);
    expect(() => a.add(b)).to.throw(/shape mismatch/);
    expect(() => a.sub(b)).to.throw(/shape mismatch/);
  });
});

describe('Matrix multiplication', () => {
  it('multiplies two 2x2 matrices', () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[5, 6], [7, 8]]);
    const c = a.multiply(b);
    expect(c.get(0, 0)).to.equal(19);
    expect(c.get(0, 1)).to.equal(22);
    expect(c.get(1, 0)).to.equal(43);
    expect(c.get(1, 1)).to.equal(50);
  });

  it('multiplies non-square matrices (2x3 by 3x1)', () => {
    const a = new Matrix([[1, 2, 3], [4, 5, 6]]);
    const b = new Matrix([[7], [8], [9]]);
    const c = a.multiply(b);
    expect(c.rows).to.equal(2);
    expect(c.cols).to.equal(1);
    expect(c.get(0, 0)).to.equal(50);
    expect(c.get(1, 0)).to.equal(122);
  });

  it('throws when inner dimensions differ', () => {
    const a = new Matrix([[1, 2], [3, 4]]);        // 2x2
    const b = new Matrix([[1, 2], [3, 4], [5, 6]]); // 3x2
    expect(() => a.multiply(b)).to.throw(/cannot multiply/);
  });
});

describe('Transpose', () => {
  it('transposes a 2x3 matrix into a 3x2 matrix', () => {
    const a = new Matrix([[1, 2, 3], [4, 5, 6]]);
    const t = a.transpose();
    expect(t.rows).to.equal(3);
    expect(t.cols).to.equal(2);
    expect(t.get(0, 1)).to.equal(4);
    expect(t.get(2, 0)).to.equal(3);
  });

  it('applied twice gives the original matrix back', () => {
    const a = new Matrix([[1, 2], [3, 4], [5, 6]]);
    const t = a.transpose().transpose();
    expect(t.rows).to.equal(3);
    expect(t.cols).to.equal(2);
    expect(t.get(2, 1)).to.equal(6);
  });
});

describe('Determinant', () => {
  it('is 1 for the identity matrix', () => {
    expect(Matrix.eye(4).det).to.equal(1);
  });

  it('is 0 for a singular matrix', () => {
    const m = new Matrix([[1, 2], [2, 4]]);
    expect(m.det).to.equal(0);
  });

  it('computes ad - bc for a 2x2 matrix', () => {
    const m = new Matrix([[3, 8], [4, 6]]);
    expect(m.det).to.equal(-14);
  });

  it('computes the determinant of a 3x3 matrix', () => {
    const m = new Matrix([[6, 1, 1], [4, -2, 5], [2, 8, 7]]);
    expect(m.det).to.equal(-306);
  });

  it('throws for a non-square matrix', () => {
    const m = new Matrix([[1, 2, 3], [4, 5, 6]]);
    expect(() => m.det).to.throw(/square/);
  });
});

describe('Output and comparison', () => {
  it('toString() renders one row per line', () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    expect(m.toString()).to.equal('1 2\n3 4');
  });

  it('equal() is true for matrices with the same content', () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[1, 2], [3, 4]]);
    expect(Matrix.equal(a, b)).to.equal(true);
  });

  it('equal() is false for different shapes or values', () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[1, 2, 3], [4, 5, 6]]);
    const c = new Matrix([[1, 2], [3, 5]]);
    expect(Matrix.equal(a, b)).to.equal(false);
    expect(Matrix.equal(a, c)).to.equal(false);
  });
});
