import React from 'react';
import Sprite from '../component/Sprite';

class PathfindingSprite {
  constructor(g, h) {
    this._g = g;
    this._h = h;
    this._f = g + h;
  }
  get g() {
    return this._g;
  }
  get h() {
    return this._h;
  }
  get f() {
    return this._f;
  }
  get gridElement() {
    return this._gridElement;
  }
  setGridElement(gridElement) {
    this._gridElement = gridElement;
    this._gridElement.setContentCallback(() => this.getComponent());
    return this;
  }
  getComponent() {
    return (<Sprite sprite={this} />);
  }
  setPrevious(gridElement) {
    this._previous = gridElement;
    return this;
  }
  setNext(gridElement) {
    this._next = gridElement;
    return this;
  }
  getDirection(x, y) {
    const deviation = {
      x: x - this._gridElement.x,
      y: y - this._gridElement.y,
    }
    const v = {
      '-1': 'n',
      '1': 's',
    }[deviation.y] || '';
    const h = {
      '-1': 'w',
      '1': 'e',
    }[deviation.x] || '';
    return v + h;
  }
  getApproachingDirection() {
    return this.getDirection(this._previous.x, this._previous.y);
  }
  getLeaveDirection() {
    return this.getDirection(this._next.x, this._next.y);
  }
}

function instantiate() {
  return new PathfindingSprite();
}

export default instantiate;