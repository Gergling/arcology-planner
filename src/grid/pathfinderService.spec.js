import {sortByF} from './pathfinderService';

describe('Pathfinder Service', () => {
  test('#sortByF', () => {
    expect(sortByF({f:0}, {f:1})).toEqual(-1);
    expect(sortByF({f:1}, {f:0})).toEqual(1);
    expect(sortByF({f:0}, {f:0})).toEqual(0);
  });
});
