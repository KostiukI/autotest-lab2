class Matrix {
  constructor(values) {
    if (!Array.isArray(values) || values.length === 0 ||
        !Array.isArray(values[0]) || values[0].length === 0) {
      throw new Error('Matrix: expected a non-empty 2D array of numbers');
    }
    const cols = values[0].length;
    for (const row of values) {
      if (!Array.isArray(row) || row.length !== cols) {
        throw new Error('Matrix: all rows must have the same length');
      }
    }
    this._values = values.map((row) => [...row]);
    this._rows = values.length;
    this._cols = cols;
  }

  get rows() { return this._rows; }
  get cols() { return this._cols; }

  get(i, j) {
    if (!Number.isInteger(i) || !Number.isInteger(j) ||
        i < 0 || j < 0 || i >= this._rows || j >= this._cols) {
      throw new Error(`Matrix: index (${i}, ${j}) is out of range ` +
        `for a ${this._rows}x${this._cols} matrix`);
    }
    return this._values[i][j];
  }

  static zeros(r, c = r) {
    return new Matrix(Array.from({ length: r }, () => new Array(c).fill(0)));
  }

  static ones(r, c = r) {
    return new Matrix(Array.from({ length: r }, () => new Array(c).fill(1)));
  }

  static eye(n) {
    return new Matrix(Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))));
  }

  add(other) {
    if (!(other instanceof Matrix)) {
      throw new Error('Matrix: expected a Matrix instance');
    }
    if (this._rows !== other._rows || this._cols !== other._cols) {
      throw new Error(`Matrix: shape mismatch: ` +
        `${this._rows}x${this._cols} vs ${other._rows}x${other._cols}`);
    }
    return new Matrix(this._values.map((row, i) =>
      row.map((v, j) => v + other._values[i][j])));
  }

  sub(other) {
    if (!(other instanceof Matrix)) {
      throw new Error('Matrix: expected a Matrix instance');
    }
    if (this._rows !== other._rows || this._cols !== other._cols) {
      throw new Error(`Matrix: shape mismatch: ` +
        `${this._rows}x${this._cols} vs ${other._rows}x${other._cols}`);
    }
    return new Matrix(this._values.map((row, i) =>
      row.map((v, j) => v - other._values[i][j])));
  }

  scale(k) {
    return new Matrix(this._values.map((row) => row.map((v) => v * k)));
  }

  multiply(other) {
    if (!(other instanceof Matrix)) {
      throw new Error('Matrix: expected a Matrix instance');
    }
    if (this._cols !== other._rows) {
      throw new Error(`Matrix: cannot multiply a ${this._rows}x${this._cols} ` +
        `matrix by a ${other._rows}x${other._cols} matrix`);
    }
    return new Matrix(this._values.map((row) =>
      Array.from({ length: other._cols }, (_, j) =>
        row.reduce((sum, v, k) => sum + v * other._values[k][j], 0))));
  }

  transpose() {
    return new Matrix(Array.from({ length: this._cols }, (_, j) =>
      Array.from({ length: this._rows }, (_, i) => this._values[i][j])));
  }

  get det() {
    if (this._rows !== this._cols) {
      throw new Error('Matrix: determinant is defined only for square matrices');
    }
    const rec = (m) => {
      if (m.length === 1) return m[0][0];
      let sum = 0;
      for (let j = 0; j < m.length; j++) {
        const minor = m.slice(1).map((row) => row.filter((_, col) => col !== j));
        sum += (j % 2 === 0 ? 1 : -1) * m[0][j] * rec(minor);
      }
      return sum;
    };
    return rec(this._values);
  }

  toString() {
    return this._values.map((row) => row.join(' ')).join('\n');
  }

  static equal(a, b) {
    if (!(a instanceof Matrix) || !(b instanceof Matrix)) {
      throw new Error('Matrix: equal() expects two Matrix instances');
    }
    if (a.rows !== b.rows || a.cols !== b.cols) return false;
    return a._values.every((row, i) =>
      row.every((v, j) => v === b._values[i][j]));
  }
}

module.exports = Matrix;
