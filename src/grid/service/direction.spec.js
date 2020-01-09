import directionService from './direction';

describe('Direction', () => {
  test('#getDirection', () => {
    expect(directionService.getCompassDirection(-1, -1)).toEqual('nw');
    expect(directionService.getCompassDirection(-1, 0)).toEqual('w');
    expect(directionService.getCompassDirection(0, -1)).toEqual('n');
    expect(directionService.getCompassDirection(-1, 1)).toEqual('sw');
    expect(directionService.getCompassDirection(1, -1)).toEqual('ne');
    expect(directionService.getCompassDirection(1, 1)).toEqual('se');
    expect(directionService.getCompassDirection(0, 1)).toEqual('s');
    expect(directionService.getCompassDirection(1, 0)).toEqual('e');
  });
  test('#rectangularDirections', () => {
    directionService.rectangularDirections.forEach(direction => {
      if (direction.compassDirection === 'n') {
        expect(direction.x).toEqual(0);
        expect(direction.y).toEqual(-1);
        expect(direction.angleRadians).toEqual(0);
        expect(direction.angleDegrees).toEqual(0);
      }
      if (direction.compassDirection === 's') {
        expect(direction.x).toEqual(0);
        expect(direction.y).toEqual(1);
        expect(direction.angleRadians).toEqual(Math.PI);
        expect(direction.angleDegrees).toEqual(180);
      }
      if (direction.compassDirection === 'e') {
        expect(direction.x).toEqual(1);
        expect(direction.y).toEqual(0);
        expect(direction.angleRadians).toEqual(Math.PI / 2);
        expect(direction.angleDegrees).toEqual(90);
      }
      if (direction.compassDirection === 'w') {
        expect(direction.x).toEqual(-1);
        expect(direction.y).toEqual(0);
        expect(direction.angleRadians).toEqual(-Math.PI / 2);
        expect(direction.angleDegrees).toEqual(-90);
      }
      if (direction.compassDirection === 'nw') {
        expect(direction.x).toEqual(-1);
        expect(direction.y).toEqual(-1);
        expect(direction.angleDegrees).toEqual(-45);
      }
    });
  });
});