import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Sprite from '../src/sprite/component/Sprite';
import spriteService from '../src/sprite/service/pathfindingSprite';

const sprite = spriteService('wall');

storiesOf('Sprite', module)
  .add('without any interesting configuration', () => <Sprite sprite={sprite} />);
