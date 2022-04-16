import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      isWeight,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      // onDragEnd,
      onDoubleClick,
      // onContextMenu,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : isWeight
      ? 'node-weight'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        // onDragEnd={e => onDragEnd(e, row, col)}
        onDoubleClick={() => onDoubleClick(row, col)}
        draggable={true}
        // onContextMenu={() => onContextMenu(row, col)}
      ></div>
    );
  }
}
