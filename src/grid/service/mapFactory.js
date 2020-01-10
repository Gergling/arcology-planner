import directionService from './direction';

function isAdjacentSquare(square1, square2) {
  return square1.x === square2.x + 1
    || square1.x === square2.x - 1
    || square1.y === square2.y + 1
    || square1.y === square2.y - 1;
}

class Link {
  constructor(location1, location2, distance) {
    this._distance = distance;
    this._location1 = location1;
    this._location2 = location2;
  }
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
  }
  getContent() {
    return typeof this._callback === 'function' ? this._map.runCallback(this) : undefined;
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
  generateSquare(size) {
    // Generate locations.
    // Array of objects: {x, y, location: Location}
    const squares = Array
      .from({length: size})
      .reduce((square, junk, x, base) => {
        return base.map((junk, y) => square.concat({x,y,location: new Location(`${x},${y}`, 'square', {x,y}, this)}));
      });

    // Generate links.
    squares.forEach(square1 => {
      squares.forEach(square2 => {
        if (isAdjacentSquare(square1, square2)) {
          // Add a link for all adjacent squares.
          const distance = directionService.getDirection(square1.x - square2.x, square1.y - square2.y);
          square1.location.setLink(square2.location, distance);
        }
      });
    });

    this._locations = this._locations.concat(squares.map(square => square.location));
  }
}

function instantiate() {
  return new Map();
}

export default instantiate;