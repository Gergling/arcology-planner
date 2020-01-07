import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Grid from '../src/component/Grid';
import gridService from '../src/service/grid';

console.log(gridService)

const grid = gridService()
  .setElementSize(50)
  .setElement(0,0)
  .setElement(0,1)
  .setElement(1,1)
  .setElement(1,0);

storiesOf('Grid', module)
  .add('without any interesting configuration', () => <Grid grid={grid} />);

  // .add('with undefined blank item', () => <Dropdown list={list.map(item => item.value ? item : undefined)} select={action('selected undefined item')} />)
  // .add('with placeholder label', () => <Dropdown list={list.map(item => item.value ? item : {label: 'Placeholder'})} select={action('selected placeholder label')} />)
  // .add('with no blank items', () => <Dropdown list={list.filter(item => item.value)} select={action('selected with no empty items')} />)
  // .add('with preselected item', () => <Dropdown list={list.filter(item => item.value)} selected='item-2' select={action('selected with no empty items')} />)