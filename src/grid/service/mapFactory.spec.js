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
});