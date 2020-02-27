import React, { Component } from 'react';
import styled from 'styled-components';

import Canvas from '../canvas/Canvas';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// const buttonWidth = 34;
// const inputPadding = 8;

// const DropdownWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   box-sizing: border-box;
//   float: left;
//   min-height: 0.125rem;
//   margin: 0;
// `;
// const DropdownInputWrapper = styled.div`
//   padding: 0;
//   background: #FFF;
//   border-radius: 2px;
//   border: 1px solid #6D6D6D;
//   box-shadow: none;
//   outline: none;
//   width: 100%;
// `;
// const DropdownInput = styled.div`
//   margin: 0;
//   background: transparent;
//   display: block;
//   height: 16px;
//   padding: ${inputPadding}px;
//   padding-right: ${buttonWidth + inputPadding}px;
//   font-size: 14px;
//   font-weight: 400;
//   color: #232323;
//   box-shadow: none;
//   outline: none;
// `;

// const buttonHeightTotal = 34;
// const buttonPaddingTop = 8;
// const buttonHeightActual = buttonHeightTotal - buttonPaddingTop;

// const DropdownButton = styled.a`
//   color: #094367;
//   font-size: 16px;
//   width: ${buttonWidth}px;
//   height: ${buttonHeightActual}px;
//   position: absolute;
//   top: 0;
//   right: 0;
//   padding-top: ${buttonPaddingTop}px;
//   text-align: center;
//   border-left: 1px solid #6D6D6D;
// `;
// const OptionsWrapper = styled.div`
//   position: absolute;
//   background-color: #FFF;
//   border: 1px solid #6D6D6D;
//   border-top: none;
//   overflow-y: hidden;
//   overflow-x: hidden;
//   border-bottom-left-radius: 4px;
//   border-bottom-right-radius: 4px;
//   width: 100%;
//   z-index: 1;
// `;

// const OptionsList = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   max-height: 200px;
//   overflow: hidden auto;
// `;
// const OptionsListItem = styled.li`
//   padding: 5px;
//   font-size: 14px;
//   cursor: default;
//   overflow: hidden;
//   word-wrap: break-word;
//   height: 16px;

//   &:hover {
//     background: #ECECEC;
//   }
// `;

// Handle size of grid elements through a styled component.

// class GridElement extends Component {
//   render() {
//     const element = this.props.element;
//     const size = element.grid.getElementSize();
//     const x = element.x * size;
//     const y = element.y * size;
//     const style = {
//       position: 'absolute',
//       left: x + 'px',
//       top: y + 'px',
//       width: size + 'px',
//       height: size + 'px',
//       border: 'solid 1px black',
//     };
//     return (<div style={style}>{element.getContentCallback()}</div>);
//   }
// }

function updateFactory(ctx, forceUpdate) {
  // The grid and viewModel are reconciled to output graphics which are attached
  return grid => {
    const size = grid.getElementSize();
    grid.getElements().forEach(element => {
      const x = element.x * size;
      const y = element.y * size;
      console.log(ctx)
      // ctx.rect(x, y, size, size);
      ctx.strokeRect(x, y, size, size);
      console.log(x, y, size)
      // ctx.strokeRect()
    });
    forceUpdate();
  };
}

function setupFactory(gridView) {
  const setup = (ctx, forceUpdate) => {
    const update = updateFactory(ctx, forceUpdate);
    gridView.onChange(update);
    update(gridView);
  }
  return setup;
}
// const setup = (ctx, forceUpdate) => {
//   const line = (x1, y1, x2, y2) => {
//     ctx.beginPath();
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.lineWidth = 1;
//     // ctx.strokeStyle = '#ff0000';
//     ctx.stroke();
//   }

//   const verticalLine = x => {
//     line(x, 0, x, ctx.canvas.height);
//   }
//   const horizontalLine = y => {
//     line(0, y, ctx.canvas.width, y);
//   }

//   const vLines = ctx.canvas.width / gridSquareSize;
//   const hLines = ctx.canvas.height / gridSquareSize;
//   const map = (junk, idx) => idx * gridSquareSize;
//   Array.from({length: vLines}).map(map).forEach(idx => verticalLine(idx));
//   Array.from({length: hLines}).map(map).forEach(idx => horizontalLine(idx));
// };

export default class GridViewer extends Component {
  constructor(props) {
    super();
    // this.state = {
    //   gridElements: props.gridView.getElements()
    // };
    this.setup = setupFactory(props.gridView);
  }
  render() {
    // const style = {
    //   position: 'relative'
    // };
    return (
      // <div style={style}>{this.state.gridElements
      //   .map((item, key) => <GridElement
      //     key={key}
      //     element={item}
      //   />)}
      // </div>
      <Canvas setup={this.setup} width="640" height="425" />
    );
  }
  // handleSelect(item) {
  //   this.props.select(item);
  //   this.setState({
  //     open: false,
  //     selected: item
  //   });
  // }
  // handleClick() {
  //   this.setState({open: !this.state.open});
  // }
  // handleBlur() {
  //   this.setState({open: false});
  // }
}
