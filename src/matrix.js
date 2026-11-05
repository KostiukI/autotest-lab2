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
      this._checkIndex(i, j);
      return this._values[i][j];
    }

  _checkIndex(i, j) {
      const ok = Number.isInteger(i) && Number.isInteger(j) &&
      i >= 0 && j >= 0 && i < this._rows && j < this._cols;
      if (!ok) {
        throw new Error(`Matrix: index (${i}, ${j}) is out of range ` +
        `for a ${this._rows}x${this._cols} matrix`);
      }
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
    Matrix._requireSameShape(this, other);
    return new Matrix(this._values.map((row, i) =>
    row.map((v, j) => v + other._values[i][j])));
  }

  sub(other) {
    Matrix._requireSameShape(this, other);
    return new Matrix(this._values.map((row, i) =>
    row.map((v, j) => v - other._values[i][j])));
  }

  static _requireSameShape(a, b) {
    if (!(b instanceof Matrix)) {
      throw new Error('Matrix: expected a Matrix instance');
    }
    if (a._rows !== b._rows || a._cols !== b._cols) {
      throw new Error(`Matrix: shape mismatch: ` +
      `${a._rows}x${a._cols} vs ${b._rows}x${b._cols}`);
    }
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
    return Matrix._det(this._values);
  }

  static _det(m) {
    if (m.length === 1) return m[0][0];
    let sum = 0;
    for (let j = 0; j < m.length; j++) {
      const minor = m.slice(1).map((row) => row.filter((_, col) => col !== j));
      sum += (j % 2 === 0 ? 1 : -1) * m[0][j] * Matrix._det(minor);
    }
    return sum;
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
