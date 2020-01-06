import React, { Component } from 'react';
import styled from 'styled-components';
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

export default class Grid extends Component {
  render() {
    return (<div>Blarg</div>);
  }
  // constructor(props) {
  //   super();
  //   if (typeof props.list !== 'object') {
  //     throw `Dropdown: 'list' attribute is required.`;
  //   }
  //   if (props.list.constructor !== [].constructor) {
  //     throw `Dropdown: 'list' attribute must be an array.`;
  //   }
  //   const selected = props.list.find(item => (item || {}).value === props.selected) || {};
  //   this.state = {
  //     open: false,
  //     selected
  //   };
  // }
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
  // renderOptions() {
  //   return this.state.open ? (
  //     <OptionsWrapper>
  //       <OptionsList>
  //         {this.props.list.map((item, key) => (
  //           <OptionsListItem
  //             key={key}
  //             data-value={item ? item.value : ''}
  //             onClick={this.handleSelect.bind(this, item)}
  //           >
  //             {item ? item.label : ''}
  //           </OptionsListItem>
  //         ))}
  //       </OptionsList>
  //     </OptionsWrapper>
  //   ) : '';
  // }
  // render() {
  //   return (
  //     <DropdownWrapper tabIndex="1" onBlur={this.handleBlur.bind(this)}>
  //       <div>
  //         <DropdownInputWrapper>
  //           <DropdownInput>{this.state.selected.label}</DropdownInput>
  //         </DropdownInputWrapper>
  //         <DropdownButton onClick={this.handleClick.bind(this)}>
  //           <FontAwesomeIcon icon={faChevronDown} />
  //         </DropdownButton>
  //       </div>
  //       {this.renderOptions()}
  //     </DropdownWrapper>
  //   );
  // }
}
