import React, { Component } from 'react';

export default class Canvas extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    if (typeof this.props.setup === 'function') {
      this.props.setup(ctx, this.forceUpdate.bind(this));
    } else {
      throw new Error('Expecting "setup" parameter to be a function.');
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
