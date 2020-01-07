import React from 'react';
import Sprite from '../component/Sprite';

class SimpleSprite {
  constructor(value) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
  setGridElement(gridElement) {
    this._gridElement = gridElement;
    this._gridElement.setContentCallback(() => this.getComponent());
  }
  getComponent() {
    return (<Sprite sprite={this} />);
  }
}

function instantiate(value) {
  return new SimpleSprite(value);
}

export default instantiate;