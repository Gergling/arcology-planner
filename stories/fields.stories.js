import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dropdown from '../src/components/Dropdown';

const list = [
  {},
  {
    label: 'Item 1',
    value: 'item-1'
  },
  {
    label: 'Item 2',
    value: 'item-2'
  }
];

storiesOf('Dropdown', module)
  .add('with empty object blank item', () => <Dropdown list={list} select={action('selected with empty object')} />)
  .add('with undefined blank item', () => <Dropdown list={list.map(item => item.value ? item : undefined)} select={action('selected undefined item')} />)
  .add('with placeholder label', () => <Dropdown list={list.map(item => item.value ? item : {label: 'Placeholder'})} select={action('selected placeholder label')} />)
  .add('with no blank items', () => <Dropdown list={list.filter(item => item.value)} select={action('selected with no empty items')} />)
  .add('with preselected item', () => <Dropdown list={list.filter(item => item.value)} selected='item-2' select={action('selected with no empty items')} />);