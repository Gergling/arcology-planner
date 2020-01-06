import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import bodypartRaw from './bodyparts-resultset';

import Bodymap from '../src/components/Bodymap';

storiesOf('Bodymap', module)
  .add('default', () => <Bodymap
    front={bodypartRaw.group_front}
    back={bodypartRaw.group_back}
    onUpdate={action('updated injuries')}
  />);
