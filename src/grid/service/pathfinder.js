function isFLower(node1, node2) {
  return node1.f < node2.f;
}

class Path {
  constructor(start, destination) {
    this._open = [];
    this._closed = [];
    this._path = [];

    this._start = start;
    this._destination = destination;

    const startingNode = this.open(start);
    repeat(startingNode, this);
    const destinationNode = this.getDestinationClosed();
    this.addAncestorsToPath(destinationNode);
  }
  get start() {return this._start;}
  get destination() {return this._destination;}
  get closed() {return this._closed;}
  get path() {return this._path;}
  addAncestorsToPath(node) {
    this._path.push(node);
    if (node.parent) {
      this.addAncestorsToPath(node.parent);
    } else {
      this._path.reverse();
    }
  }
  open(location, previousNode) {
    const distance = previousNode ? location.getDistance(previousNode.location) : 0;
    const node = new Node(location, previousNode, distance, this._destination);
    this._open.push(node);
    return node;
  }
  close(node) {
    this._closed.push(node);
    return node;
  }
  closeNextOpenNode() {
    // Get the item in the open list with the lowest F score.
    // Remove it from the open list.
    const node = this._open.sort(isFLower).shift();
    if (node) {
      // Add to the closed list.
      this.close(node);
    }
    return node;
  }
  getClosed(location) {
    return this._closed.find(closed => closed.location === location);
  }
  getOpen(location) {
    return this._open.find(open => open.location.name === location.name);
  }
  getDestinationClosed() {
    return this.getClosed(this.destination);
  }
}

class Node {
  constructor(location, parentNode, distance, destination) {
    this._location = location;
    this.setPrevious(parentNode, distance);
    this.setG();
    this.setH(destination);
    this.updateF();
  }
  get f() {return this._f;}
  get g() {return this._g;}
  get h() {return this._h;}
  get location() {return this._location;}
  get path() {return this._path;}
  get parent() {return this._parentNode;}
  get distance() {return this._distance;}
  updateF() {
    this._f = this.g + this.h;
    return this;
  }
  getAncestorG() {
    return this.parent ? this.parent.getAncestorG() + this.distance : 0;
  }
  setAncestorH(h) {
    this._h = h;
    if (this.parent) {
      this.setAncestorH(h + this.distance);
    }
  }
  setG() {
    this._g = this.getAncestorG();
    return this;
  }
  setH(destination) {
    this._h = this.location.getDistance(destination);
    return this;
  }
  setPrevious(node, distance) {
    this._distance = distance;
    this._parentNode = node;
    return this;
  }
  foreachAdjacent(callback) {
    let halt = false;
    this.location.links.forEach(link => {
      if (halt) return;
      const location = this.location === link.location1 ? link.location2 : link.location1;
      halt = callback(location, link.distance);
    });
  }
}

function repeat(previousNode, path) {
  // Get the square on the open list which has the lowest score. Let’s call this square S.
  // Remove S from the open list and add S to the closed list.
  const sNode = path.closeNextOpenNode();

  // If the open list was empty, we're done.
  if (!sNode) {return;}

  // If the destination is in the closed list, we're done.
  if (path.getDestinationClosed()) {return;}

  // console.log('sNode:', sNode.location.name, sNode.f)

  // TODO: Could save a little time checking if sNode is the destination node.

  // TODO: Consider using a while loop to quit early.
  // For each square T in S’s walkable adjacent tiles:
  sNode.foreachAdjacent((tLocation, distance) => {
    processAdjacentLocation(tLocation, distance, path, sNode);
  });

  // Once all computation is done, repeat for sNode.
  repeat(sNode, path);
}

function processAdjacentLocation(tLocation, distance, path, sNode) {
  // T is a location object.
  // If T is in the closed list: Ignore it.
  if (['1,2', '2,1'].indexOf(tLocation.name) > -1 && false) console.log('checking adjacent:', tLocation.name)
  if (path.getClosed(tLocation)) {return;}

  if (['1,2', '2,1'].indexOf(tLocation.name) > -1 && false) console.log('is not closed')

  // If T is not in the open list: Add it and compute its score.
  const open = path.getOpen(tLocation);
  if (!open) {
    path.open(tLocation, sNode);
    if (['1,2', '2,1'].indexOf(tLocation.name) > -1 && false) console.log('was not open, added')
  } else {
    const tNode = new Node(tLocation, sNode, distance, path.destination);
    // if (['1,2', '2,1'].indexOf(tLocation.name) > -1 && false) console.log('is open', tNode.location.name, tNode.h, open.location.name, open.h)
    // If T is already in the open list: Check if the F score is lower when we use the current generated path to get there.
    // If the F score is lower for the new node, ignore it.
    // TODO: Review this logic.
    if (tNode.g < sNode.g) {
      // If it is, update its score and update its parent as well.
      if (['1,2', '2,1'].indexOf(tLocation.name) > -1 && false) console.log('updating')
      open.setPrevious(sNode, distance);
    }
  }
}

function instantiate(start, destination) {
  return new Path(start, destination);
}

export default instantiate;
