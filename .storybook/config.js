import { configure } from '@storybook/react';

console.log('fuck you')

// // automatically import all files ending in *.stories.js
// configure(require.context('../stories', true, /\.stories\.js$/), module);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
