import mapFactory from './mapFactory';

describe('Map', () => {
  test('#instantiateSquareLocation', () => {
    const squareLocation = mapFactory().instantiateSquareLocation(2,3);
    expect(squareLocation.name).toEqual('2,3');
  });
  test('#generateSingleSquare', () => {
    const square = mapFactory().generateSingleSquare(4,5);
    expect(square.x).toEqual(4);
    expect(square.y).toEqual(5);
  });
  test('#reduceSquares should return an array of square objects', () => {
    const squares = mapFactory().reduceSquares([], 0, [undefined, undefined, undefined]);
    expect(squares.constructor).toEqual([].constructor);
    expect(squares.length).toEqual(3);
    squares.forEach(square => {
      expect(square.constructor).toEqual(({}).constructor);
    });
  });
  test('#getTextDisplay', () => {
    const map = mapFactory().generateSquare(3, square => square.x !== 1 || square.y !== 1);
    const text = map.getTextDisplay();
    expect(text).toEqual('OOO\nOXO\nOOO\n');
  })
});

describe('Square', () => {
  test('#getDistance', () => {
    const map = mapFactory().generateSquare(3);
    const topLeft = map.findLocationByName('0,0');
    const bottomRight = map.findLocationByName('2,2');

    expect(topLeft.getDistance(bottomRight)).toEqual(Math.sqrt(2) * 2);
  });
});