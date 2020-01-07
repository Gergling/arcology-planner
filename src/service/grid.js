class Grid {
  constructor() {
    this._elements = [];
    this._elementSize = 1;
  }
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
}

function instantiate() {
  return new Grid();
}

export default instantiate;
