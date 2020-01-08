import gridService from '../../grid/service/grid';
import spriteService from '../service/pathfindingSprite';

describe('Pathfinding Sprite', () => {
  test('#getDirection', () => {
    const gridElement = gridService()
      .setElement(2,2)
      .getElement(2,2);
    const sprite = spriteService()
      .setGridElement(gridElement);
    expect(sprite.getDirection(1, 1)).toEqual('nw');
    expect(sprite.getDirection(1, 2)).toEqual('w');
    expect(sprite.getDirection(2, 1)).toEqual('n');
    expect(sprite.getDirection(1, 3)).toEqual('sw');
    expect(sprite.getDirection(3, 1)).toEqual('ne');
    expect(sprite.getDirection(3, 3)).toEqual('se');
    expect(sprite.getDirection(2, 3)).toEqual('s');
    expect(sprite.getDirection(3, 2)).toEqual('e');
  })
});