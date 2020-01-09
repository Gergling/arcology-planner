import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import directionService from '../../grid/service/direction';

const BorderSquare = styled.div`
  position: absolute;
  border: solid 1px red;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: 33%;
  height: 33%;
`;
BorderSquare.defaultProps = {
  top  : 0,
  left : 0
};
const Arrow = styled.i`
  &::before {
    -o-transform: rotate(-${props => props.rotate}deg);
    -webkit-transform: rotate(-${props => props.rotate}deg);
    transform: rotate(-${props => props.rotate}deg);
  }
`;
Arrow.defaultProps = {
  rotate: 0
};

const size = 50/3;

function getLeft(x) {
  return x * size;
}
function getTop(y) {
  return y * size;
}

export default class Sprite extends Component {
  render() {
    const style = {
      position : 'absolute',
      left     : 0,
      right    : 0,
      top      : 0,
      bottom   : 0
    };
    return (
      <div style={style}>
        {directionService.rectangularDirections.map(direction => (
          <BorderSquare
            top={getTop(direction.y + 1)}
            left={getLeft(direction.x + 1)}
          >
            <FontAwesomeIcon icon={faArrowUp} transform={{ rotate: direction.angleDegrees }} />
          </BorderSquare>
        ))}
      </div>
    );
  }
}
