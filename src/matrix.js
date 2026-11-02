class Matrix {
  constructor(values) { throw new Error('Not implemented: constructor'); }
  get rows() { throw new Error('Not implemented: rows'); }
  get cols() { throw new Error('Not implemented: cols'); }
  get(i, j) { throw new Error('Not implemented: get'); }
  static zeros(r, c) { throw new Error('Not implemented: zeros'); }
  static ones(r, c) { throw new Error('Not implemented: ones'); }
  static eye(n) { throw new Error('Not implemented: eye'); }
  add(other) { throw new Error('Not implemented: add'); }
  sub(other) { throw new Error('Not implemented: sub'); }
  scale(k) { throw new Error('Not implemented: scale'); }
  multiply(other) { throw new Error('Not implemented: multiply'); }
  transpose() { throw new Error('Not implemented: transpose'); }
  get det() { throw new Error('Not implemented: det'); }
  toString() { throw new Error('Not implemented: toString'); }
  static equal(a, b) { throw new Error('Not implemented: equal'); }
}

module.exports = Matrix;
