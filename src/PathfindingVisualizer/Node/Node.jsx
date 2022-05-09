import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isMiddle,
      isWall,
      isWeight,
      isWeight10,
      isWeight15,
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
      : isWeight10
      ? 'node-weight-10'
      : isWeight15
      ? 'node-weight-15'
      : isMiddle
      ? 'node-middle'
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
