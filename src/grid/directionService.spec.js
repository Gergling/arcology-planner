import {getCompassDirection, rectangularDirections, isAdjacent} from './directionService';

describe('Direction', () => {
  test('#getDirection', () => {
    expect(getCompassDirection(-1, -1)).toEqual('nw');
    expect(getCompassDirection(-1, 0)).toEqual('w');
    expect(getCompassDirection(0, -1)).toEqual('n');
    expect(getCompassDirection(-1, 1)).toEqual('sw');
    expect(getCompassDirection(1, -1)).toEqual('ne');
    expect(getCompassDirection(1, 1)).toEqual('se');
    expect(getCompassDirection(0, 1)).toEqual('s');
    expect(getCompassDirection(1, 0)).toEqual('e');
  });
  test('#rectangularDirections', () => {
    rectangularDirections.forEach(direction => {
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