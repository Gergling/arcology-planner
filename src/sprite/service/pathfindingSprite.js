import React from 'react';
import Sprite from '../component/Sprite';

import direction from '../../grid/service/direction';

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
    return direction.getCompassDirection(x - this._gridElement.x, y - this._gridElement.y);
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