import directionService from './direction';

function isAdjacentSquare(square1, square2) {
  return square1.x === square2.x + 1
    || square1.x === square2.x - 1
    || square1.y === square2.y + 1
    || square1.y === square2.y - 1;
}

function isPassable(square, impassableSquares) {
  return impassableSquares.find(impassableSquare => square.x === impassableSquare.x && square.y === impassableSquare.y) === undefined;
}

function getDistance(location1, location2) {
  return location1,type === 'square' && location2.type === 'square' ? getSquareDistance(location1, location2) : -1;
}

function getSquareDistance(location1, location2) {
  // return Math.abs(location1.x - location2.x) + Math.abs(location1.y - location2.y);
  // Take the square root of the smallest square and add the difference to the larger.
  const dx = Math.abs(location1.x - location2.x);
  const dy = Math.abs(location1.y - location2.y);
  const smallestSquare = Math.min(dx, dy);
  const dd = Math.abs(dx - dy);
  const hypotenuse = Math.sqrt(Math.pow(smallestSquare, 2) * 2);
  return dd + hypotenuse;
}

class Link {
  constructor(location1, location2, distance) {
    this._distance = distance;
    this._location1 = location1;
    this._location2 = location2;
  }
  get distance() {return this._distance;}
  get location1() {return this._location1;}
  get location2() {return this._location2;}
}

class Location {
  constructor(name, generator, data, map) {
    this._generator = generator;
    this._name = name;
    this._links = [];
    this._data = data;
    this._map = map;
  }
  setLink(newLocation, distance) {
    // Sets up a link to another location, if the link is present.
    if (this._links.find(existingLink => {
      return existingLink.location1 === newLocation
        || existingLink.location2 === newLocation;
    }) === undefined) {
      this._links.push(new Link(this, newLocation, distance));
    }
    return this;
  }
  getContent() {
    return typeof this._callback === 'function' ? this._map.runCallback(this) : undefined;
  }
  get data() {
    return this._data;
  }
  getDistance(location) {
    return getDistance(this, location)
  }
  get links() {
    return this._links;
  }
  get name() {
    return this._name;
  }
}

class Map {
  constructor(callback) {
    this._locations = [];
    this._callback = callback;
  }
  runCallback(location) {
    this._callback(location);
  }
  instantiateSquareLocation(x, y) {
    return new Location(`${x},${y}`, 'square', {x,y}, this);
  }
  generateSingleSquare(x, y) {
    return {x,y,location: this.instantiateSquareLocation(x, y)};
  }
  reduceSquares(squares, x, base) {
    return base.reduce((squares2, junk, y) => squares2.concat([this.generateSingleSquare(x, y)]), squares);
  }
  generateSquare(size, impassable = []) {
    // Generate locations.
    // Array of objects: {x, y, location: Location}
    const squares = Array
      .from({length: size})
      .reduce((squares, junk, x, base) => this.reduceSquares(squares, x, base), []);

    // Generate links.
    squares.forEach(square1 => {
      squares.forEach(square2 => {
        if (isAdjacentSquare(square1, square2) && isPassable(square1, impassable) && isPassable(square2, impassable)) {
          // Add a link for all adjacent squares.
          const distance = directionService.getDirection(square1.x - square2.x, square1.y - square2.y);
          square1.location.setLink(square2.location, distance);
        }
      });
    });

    this._locations = this._locations.concat(squares.map(square => square.location));
    return this;
  }
  get locations() {
    return this._locations;
  }
}

function instantiate() {
  return new Map();
}

export default instantiate;