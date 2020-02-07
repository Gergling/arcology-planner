import mapFactory from './mapFactory';
import pathfinderFactory from './pathfinder';

describe('Pathfinder', () => {
  test('Testing adjacent square path', () => {
    const map = mapFactory().generateSquare(3);
    const startingLocation = map.locations.find(location => location.x === 1 && location.y === 1);
    const adjacentLocation = map.locations.find(location => location.x === 1 && location.y === 2);
    const adjacentPath = pathfinderFactory(startingLocation, adjacentLocation);
    expect(adjacentPath.path.length).toEqual(2);
  });
  test('Testing adjacent square distance', () => {
    const map = mapFactory().generateSquare(3);
    const startingLocation = map.locations.find(location => location.x === 1 && location.y === 1);
    const adjacentLocation = map.locations.find(location => location.x === 1 && location.y === 2);
    const adjacentPath = pathfinderFactory(startingLocation, adjacentLocation);
    expect(adjacentPath.path[0].g).toEqual(0);
    expect(adjacentPath.path[1].g).toEqual(1);
    expect(adjacentPath.path[0].h).toEqual(1);
    expect(adjacentPath.path[1].h).toEqual(0);
    expect(adjacentPath.path[0].f).toEqual(1);
    expect(adjacentPath.path[1].f).toEqual(1);
  });
  test('Testing adjacent diagonal square', () => {
    const map = mapFactory().generateSquare(3);
    const startingLocation = map.locations.find(location => location.x === 1 && location.y === 1);
    const diagonalLocation = map.locations.find(location => location.x === 2 && location.y === 2);
    const diagonalPath = pathfinderFactory(startingLocation, diagonalLocation);
    expect(diagonalPath.path.length).toEqual(2);
  });
  test('Testing slightly further distances', () => {
    const map = mapFactory().generateSquare(3);
    const startingLocation = map.locations.find(location => location.x === 0 && location.y === 0);
    const destinationLocation = map.locations.find(location => location.x === 2 && location.y === 2);
    const diagonalPath = pathfinderFactory(startingLocation, destinationLocation);
    expect(diagonalPath.path.length).toEqual(3);
  });
  // Test for going around a flat wall
  test('Testing with single-tile obstacle', () => {
    const map = mapFactory().generateSquare(3, square => square.x !== 1 || square.y !== 1);
    const startingLocation = map.locations.find(location => location.x === 0 && location.y === 0);
    const destinationLocation = map.locations.find(location => location.x === 2 && location.y === 2);
    const skirtingPath = pathfinderFactory(startingLocation, destinationLocation);
    expect(skirtingPath.path.length).toEqual(4);
  });
  // Test for "bowl".
  test('Testing with bowl obstacle', () => {
    const map = mapFactory().generateSquare(5, square => {
      return [
        '1,1', '2,1',
                '2,2',
        '1,3', '2,3'
      ].indexOf(square.location.name) === -1;
    });
    const startingLocation = map.locations.find(location => location.x === 1 && location.y === 2);
    const destinationLocation = map.locations.find(location => location.x === 4 && location.y === 2);
    const skirtingPath = pathfinderFactory(startingLocation, destinationLocation);
    expect(skirtingPath.path.length).toEqual(6);
  });
  test('Testing with bigger bowl obstacle', () => {
    const map = mapFactory().generateSquare(7, square => {
      return [
        '2,1', '3,1', '4,1',
                      '4,2',
                      '4,3',
                      '4,4',
        '2,5', '3,5', '4,5'
      ].indexOf(square.location.name) === -1;
    });
    const startingLocation = map.locations.find(location => location.x === 0 && location.y === 3);
    const destinationLocation = map.locations.find(location => location.x === 6 && location.y === 3);
    const skirtingPath = pathfinderFactory(startingLocation, destinationLocation);
    expect(skirtingPath.path.length).toEqual(9);
  });
  // Test for no path.
  test('Testing for no available path', () => {
    const map = mapFactory().generateSquare(5, square => {
      return [
        '2,0',
        '2,1',
        '2,2',
        '2,3',
        '2,4',
      ].indexOf(square.location.name) === -1;
    });
    const startingLocation = map.locations.find(location => location.x === 0 && location.y === 0);
    const destinationLocation = map.locations.find(location => location.x === 4 && location.y === 4);
    const impossiblePath = pathfinderFactory(startingLocation, destinationLocation);
    expect(impossiblePath.path.length).toEqual(0);
  });
  // Test for already reaching the destination.
  test('Testing for being at destination already', () => {
    const map = mapFactory().generateSquare(3);
    const startingLocation = map.locations.find(location => location.x === 1 && location.y === 1);
    const adjacentLocation = map.locations.find(location => location.x === 1 && location.y === 1);
    const singleSquarePath = pathfinderFactory(startingLocation, adjacentLocation);
    expect(singleSquarePath.path.length).toEqual(1);
  });
});
