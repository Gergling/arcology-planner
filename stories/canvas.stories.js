import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Canvas from '../src/canvas/Canvas';

const gridSquareSize = 10;

const setup = (ctx, forceUpdate) => {
  const line = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 1;
    // ctx.strokeStyle = '#ff0000';
    ctx.stroke();
  }

  const verticalLine = x => {
    line(x, 0, x, ctx.canvas.height);
  }
  const horizontalLine = y => {
    line(0, y, ctx.canvas.width, y);
  }

  const vLines = ctx.canvas.width / gridSquareSize;
  const hLines = ctx.canvas.height / gridSquareSize;
  const map = (junk, idx) => idx * gridSquareSize;
  Array.from({length: vLines}).map(map).forEach(idx => verticalLine(idx));
  Array.from({length: hLines}).map(map).forEach(idx => horizontalLine(idx));
};

storiesOf('Canvas', module)
  .add('canvas', () => <Canvas setup={setup} width="640" height="425" />);
