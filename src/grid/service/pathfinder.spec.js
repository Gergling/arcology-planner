import mapFactory from './mapFactory';
import pathfinderFactory from './pathfinder';

describe('Pathfinder', () => {
  // Test for adjacent squares
  test('Testing adjacent squares', () => {
    const map = mapFactory().generateSquare(3);
    const startingLocation = map.locations.find(location => location.x === 1 && location.y === 1);
    const adjacentLocation = map.locations.find(location => location.x === 1 && location.y === 2);
    const diagonalLocation = map.locations.find(location => location.x === 2 && location.y === 2);
    const adjacentPath = pathfinderFactory(startingLocation, adjacentLocation);
    const diagonalPath = pathfinderFactory(startingLocation, diagonalLocation);
    console.log('donk')
    console.log(adjacentPath.path)
    expect(adjacentPath.path.length).toEqual(2);
    expect(diagonalPath.path.length).toEqual(2);
    expect(adjacentPath.path[0].g).toEqual(0);
    expect(adjacentPath.path[1].g).toEqual(1);
    expect(adjacentPath.path[0].h).toEqual(1);
    expect(adjacentPath.path[1].h).toEqual(0);
    expect(adjacentPath.path[0].f).toEqual(1);
    expect(adjacentPath.path[1].f).toEqual(1);
  });
  // Test for 2-4 distance free space
  xtest('Testing slightly further distances', () => {
    const map = mapFactory().generateSquare(3);
    const startingLocation = map.locations.find(location => location.x === 0 && location.y === 0);
    const destinationLocation = map.locations.find(location => location.x === 2 && location.y === 2);
    const diagonalPath = pathfinderFactory(startingLocation, destinationLocation);
    expect(diagonalPath.path.length).toEqual(3);
  });
  // Test for going around a flat wall
  xtest('Testing with single-tile obstacle', () => {
    const map = mapFactory().generateSquare(3, square => square.x !== 1 || square.y !== 1);
    // console.log(map.getTextDisplay())
    const startingLocation = map.locations.find(location => location.x === 0 && location.y === 0);
    const destinationLocation = map.locations.find(location => location.x === 2 && location.y === 2);
    const skirtingPath = pathfinderFactory(startingLocation, destinationLocation);
    console.log(skirtingPath.path.map(node => node.location.name))
    expect(skirtingPath.path.length).toEqual(4);
  });
  // Test for "bowl".
});
