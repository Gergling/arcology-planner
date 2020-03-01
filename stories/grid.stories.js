import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import gridViewFactory from '../src/grid/gridViewFactory';
import mapFactory from '../src/grid/mapFactory';

import Grid from '../src/grid/GridViewer';
import Corridor from '../src/sprite/component/Corridor';
import Wall from '../src/sprite/component/Wall';

const gridView = gridViewFactory()
  .setElementSize(50)
  .setContentCallback((x, y) => {
    const isWall = map.findLocationByName(`${x},${y}`).links.length === 0;
    return (isWall ? <Wall /> : <Corridor />);
  });

const map = mapFactory().generateSquare(20, square => {
  return [
    '1,1', '2,1',
           '2,2',
    '1,3', '2,3'
  ].indexOf(square.location.name) === -1;
});

map.locations.forEach(location => {
  gridView.setElement(location.x, location.y);
});

// Need a pedestrian to move between the small squares.
// The small squares need to be mapped but without linking diagonals at corners.
// At some point, will need to replace with a canvas and have that draw the contents. That's still ok, but slightly harder.

function left() {
  gridView.moveOffset(-1, 0);
}
function right() {
  gridView.moveOffset(1, 0);
}
function up() {
  gridView.moveOffset(0, -1);
}
function down() {
  gridView.moveOffset(0, 1);
}

storiesOf('GridView', module)
  .add('simple mapped grid which can be moved by running a gridView function', () => (
    <div>
      <Grid gridView={gridView} />
      <button onClick={left}>Left</button>
      <button onClick={right}>Right</button>
      <button onClick={up}>Up</button>
      <button onClick={down}>Down</button>
    </div>
  ));
