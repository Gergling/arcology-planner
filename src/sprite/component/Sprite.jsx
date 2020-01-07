import React, { Component } from 'react';

export default class Sprite extends Component {
  render() {
    console.log(this.props.sprite)
    return (
      <div>Blarg {this.props.sprite.value}</div>
    );
  }
}
