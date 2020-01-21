import {isFLower, sortByF} from './pathfinderService';

xdescribe('Pathfinder Service', () => {
  test('#isFLower', () => {
    expect(isFLower).toEqual(true);
  });
  test('#sortByF', () => {
    expect(sortByF).toEqual(true);
  });
});
