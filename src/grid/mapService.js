function isAdjacentSquare(square1, square2) {
  const dx = Math.abs(square1.x - square2.x);
  const dy = Math.abs(square1.y - square2.y);
  const isInRange = [dx, dy].filter(d => d >= 2).length === 0;
  const isCenter = dx === 0 && dy === 0;
  return isInRange && !isCenter;
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

export {
  isAdjacentSquare,
  getSquareDistance,
  getHypotenuseLength
}