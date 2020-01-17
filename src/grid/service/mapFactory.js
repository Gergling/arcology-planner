import directionService from './direction';

function isAdjacentSquare(square1, square2) {
  return square1.x === square2.x + 1
    || square1.x === square2.x - 1
    || square1.y === square2.y + 1
    || square1.y === square2.y - 1;
}

// function isPassable(square, impassableSquares) {
//   return impassableSquares.find(impassableSquare => square.x === impassableSquare.x && square.y === impassableSquare.y) === undefined;
// }

function getDistance(location1, location2) {
  return location1.type === 'square' && location2.type === 'square' ? getSquareDistance(location1, location2) : -1;
}

function getSquareDistance(location1, location2) {
  // Take the square root of the smallest square and add the difference to the larger.
  const dx = Math.abs(location1.x - location2.x);
  const dy = Math.abs(location1.y - location2.y);
  const smallestSquare = Math.min(dx, dy);
  const dd = Math.abs(dx - dy);
  const hypotenuse = Math.sqrt(Math.pow(smallestSquare, 2) * 2);
  return dd + hypotenuse;
}

function getHypotenuseLength(location1, location2) {
  const dx = Math.abs(location1.x - location2.x);
  const dy = Math.abs(location1.y - location2.y);
  return Math.sqrt((dx * dx) + (dy * dy));
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
  getLinkedLocation(sourceLocation) {
    return [this.location1, this.location2].find(linkedLocation => sourceLocation.name !== linkedLocation.name);
  }
}

class Location {
  constructor(name, map) {
    this._name = name;
    this._links = [];
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
  getAdjacentLocationDistance(location) {
    return location !== this ? 0 : (this.links.find(link => link.location1 === location || link.location2 === location) || {}).distance;
  }
  get links() {
    return this._links;
  }
  get name() {
    return this._name;
  }
}

class Square extends Location {
  constructor(map, x, y) {
    super(`${x},${y}`, map);
    this._x = x;
    this._y = y;
  }
  getAdjacentsNearestDestination(destinationLocation) {
    // Wrap all adjacents with an H value.
    const hLinks = this.links.map(link => {
      const location = link.getLinkedLocation(this);
      return {
        location,
        g: link.distance,
        h: getHypotenuseLength(destinationLocation, location)
      };
    });

    // Find the lowest H value.
    const hLowest = hLinks.reduce((lowest, hLink) => lowest === undefined ? hLink.h : Math.min(hLink.h));

    // Get the nearest locations by their h values.
    const nearest = hLinks
      .filter(hLink => hLink.h === hLowest)
      .map(hLink => hLink.location);

    return nearest;
  }
  // TODO: What if I just approximate by "crow flight", then just correct the H value in the pathfinder?
  // Pathfinding distance isn't the remit of Square.
  // getDistance(location) {
  //   // Get nearest adjacents.
  //   // Find their nearest adjacents.
  //   // When the adjacent IS the destination.

  //   // const adjacentDistance = this.getAdjacentLocationDistance(location);
  //   // return adjacentDistance ? adjacentDistance : getDistance(this, location);
  // }
  getDistance(location) {
    // const adjacentDistance = this.getAdjacentLocationDistance(location);
    // return adjacentDistance ? adjacentDistance : getDistance(this, location);
    // return Math.abs(this.x - location.x) + Math.abs(this.y - location.y);
    return getSquareDistance(this, location);
  }
  get x() {return this._x;}
  get y() {return this._y;}
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
    return new Square(this, x, y);
  }
  generateSingleSquare(x, y) {
    return {x,y,location: this.instantiateSquareLocation(x, y)};
  }
  reduceSquares(squares, x, base) {
    return base.reduce((squares2, junk, y) => squares2.concat([this.generateSingleSquare(x, y)]), squares);
  }
  generateSquare(size, isPassable = () => true) {
    // Generate locations.
    // Array of objects: {x, y, location: Location}
    const squares = Array
      .from({length: size})
      .reduce((squares, junk, x, base) => this.reduceSquares(squares, x, base), []);

    // Generate links.
    squares.forEach(square1 => {
      squares.forEach(square2 => {
        if (isAdjacentSquare(square1, square2) && isPassable(square1) && isPassable(square2)) {
          // Add a link for all adjacent squares.
          const distance = directionService.getDistance(square1.x - square2.x, square1.y - square2.y);
          square1.location.setLink(square2.location, distance);
        }
      });
    });

    this._locations = this._locations.concat(squares.map(square => square.location));
    return this;
  }
  getTextDisplay() {
    const maxX = this.locations.reduce((greatest, location) => Math.max(greatest, location.x), 0);
    return this.locations
      .map(location => {
        const x = location.x;
        const y = location.y;
        return ({x, y, character: (location.links.length > 0 ? 'O' : 'X') + (maxX === location.x ? '\n' : '')})
      })
      .sort((a, b) => {
        const orderX = a.x < b.x ? -1 : (a.x > b.x ? 1 : 0);
        const orderY = a.y < b.y ? -1 : (a.y > b.y ? 1 : 0);
        return orderY || orderX;
      })
      .map(data => data.character)
      .join('');
  }
  findLocationByName(name) {
    return this.locations.find(location => location.name === name);
  }
  get locations() {
    return this._locations;
  }
}

function instantiate() {
  return new Map();
}

export default instantiate;