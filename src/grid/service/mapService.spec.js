import {isAdjacentSquare} from './mapService';

describe('Map Service', () => {
  test('#isAdjacentSquare', () => {    
    expect(isAdjacentSquare({x:0,y:0}, {x:0,y:1})).toEqual(true);
    expect(isAdjacentSquare({x:0,y:0}, {x:1,y:2})).toEqual(false);
  });
});
