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
  xtest('Testing slightly further distances', () => {
    const map = mapFactory().generateSquare(3);
    const startingLocation = map.locations.find(location => location.x === 0 && location.y === 0);
    const destinationLocation = map.locations.find(location => location.x === 2 && location.y === 2);
    const diagonalPath = pathfinderFactory(startingLocation, destinationLocation);
    console.log(diagonalPath.path.map(node => node.location.name))
    console.log(map.locations.map(location => location.links.map(link => `${location.name} => ${link.getLinkedLocation(location).name}`)))
    console.log(diagonalPath.path.map(node => node.location.name))
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
  // Consider test for smaller path functions, such as open.
});
