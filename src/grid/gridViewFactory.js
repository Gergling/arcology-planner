class GridView {
  constructor() {
    this._elements    = [];
    this._elementSize = 1;
    this._callback    = () => '';
    this._onChange    = () => {};
    this._offset      = {};
  }
  get elements() {
    return this._elements;
  }
  // Deprecate this.
  getElements() {
    return this._elements;
  }
  getElement(x, y, callback) {
    const element = this._elements.find(gridElement => x === gridElement.x && y === gridElement.y);
    if (callback === undefined) {
      return element;
    } else {
      callback(element);
      return this;
    }
  }
  setElement(x, y) {
    const element = this.getElement(x, y);
    if (element === undefined) {
      this._elements.push(new GridElement(x, y, this));
    }
    return this;
  }
  setElementSize(size) {
    this._elementSize = size;
    return this;
  }
  getElementSize() {
    return this._elementSize;
  }
  setContentCallback(callback) {
    this._callback = callback;
    return this;
  }
  getContentCallback(x, y) {
    return this._callback(x, y);
  }
  onChange(callback) {
    this._onChange = callback;
    return this;
  }
  setOffset(x, y) {
    this._offset.x = x;
    this._offset.y = y;
    return this;
  }
  moveOffset(dx, dy) {
    this._offset.x += dx;
    this._offset.y += dy;
    return this;
  }
  get offset() {
    return this._offset;
  }
}

class GridElement {
  constructor(x, y, grid) {
    this._x = x;
    this._y = y;
    this._grid = grid;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get grid() {
    return this._grid;
  }
  set x(value) {
    throw new Error('Cannot set x.');
  }
  set y(value) {
    throw new Error('Cannot set y.');
  }
  set grid(value) {
    throw new Error('Cannot set grid.');
  }
  getContentCallback() {
    return this.grid.getContentCallback(this.x, this.y);
  }
}

function instantiate() {
  return new GridView();
}

export default instantiate;
