const rectangularDirections = Array
  .from({length: 3})
  .reduce((carry, junk, xIDX, base) => {
    const x = xIDX - 1;
    return carry.concat(base.map((junk, yIDX) => {
      const y = yIDX - 1;
      const angleRadians = Math.atan2(x, -y);
      const angleDegrees = ((angleRadians * 360) / (Math.PI * 2));
      const compassDirection = getCompassDirection(x, y);
      return {
        x,
        y,
        angleRadians,
        angleDegrees,
        compassDirection,
      };
    }));
  }, [])
  .filter(direction => direction.x !== 0 || direction.y !== 0);

function getDistance(x, y) {
  return getCompassDirection(x, y).length === 2 ? 1.4 : 1;
}

function getCompassDirection(x, y) {
  const v = {
    '-1': 'n',
    '1': 's',
  }[y] || '';
  const h = {
    '-1': 'w',
    '1': 'e',
  }[x] || '';
  return v + h;
}

export {
  getCompassDirection,
  rectangularDirections,
  getDistance
}