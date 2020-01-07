const service = require('./grid').default;

describe('Grid', () => {
  describe('Basic Getting and Setting', () => {
    test('#getElements returns an array', () => {
      const grid = service();
      expect(grid.getElements().constructor).toEqual([].constructor);
    });
  
    test('#setElement and #getElement set an element and subsequently return it', () => {
      const grid = service();
      grid.setElement(1, 2).getElement(1,2, gridElement => {
        expect(gridElement.x).toEqual(1);
        expect(gridElement.y).toEqual(2);
      });
    });
  
    test('#getElements returns an array of all items which have been set', () => {
      const gridElements = service()
        .setElement(1, 2)
        .setElement(2, 3)
        .getElements();

      expect(gridElements[0].x).toEqual(1);
      expect(gridElements[0].y).toEqual(2);
      expect(gridElements[1].x).toEqual(2);
      expect(gridElements[1].y).toEqual(3);
    });
  });

  describe('Grid Attributes', () => {
    test('#setElementSize sets a size and #getElementSize returns it', () => {
      expect(service()
          .setElementSize(10)
          .getElementSize())
        .toEqual(10);
    });
  });

  // Consider a section for chaining.
  // Also need a section for editing grid elements.
});
