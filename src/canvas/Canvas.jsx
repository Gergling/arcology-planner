// Looks like flooring. Maybe some squares.

import React, { Component } from 'react';
// import Konva from 'konva';

// console.log(Konva)

// Need to pass in an object which the component can call when it "did mount".

export default class Canvas extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.font = "40px Courier"
    ctx.fillText('TAXT!', 210, 75)

    if (typeof this.props.setup === 'function') {
      this.props.setup(ctx, this.forceUpdate.bind(this));
    } else {
      throw new Error('Expecting callback parameter to be a function.');
    }
  }
  render() {
    const style={
      border: 'solid 1px black'
    }
    return(
      <div>
        <canvas style={style} ref="canvas" width={this.props.width} height={this.props.height} />
      </div>
    );
  }
}
