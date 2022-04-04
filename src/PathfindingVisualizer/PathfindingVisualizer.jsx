import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { astar, getNodesInOrder } from '../algorithms/astar';
import HeaderMenu, { name, nameNode } from './HeaderMenu';
// import NodeDrop, { name1 } from './NodeDrop';

import './PathfindingVisualizer.css';

let START_NODE_COL = 14;
let START_NODE_ROW = 2;
let FINISH_NODE_ROW = 5;
let FINISH_NODE_COL = 30;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    // const ngrid = this.state.grid;
    // let name = document.getElementById(`node-${row}-${col}`).className;
    // console.log(name);
    // console.log(name === 'node node-start');
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleDragEnd(e, row, col) {
    console.log('drag end is running');
    for (let i in e) {
      let x = e[i];
      console.log(x);
    }
    console.log('drag is over.');
    // console.log('I am runnig.' + row + ' ' + col + ' ' + e.target.id + ' ' + e);
    // const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
    // this.setState({grid: newGrid});
  }

  handleDoubleClick(row, col) {
    // let name = document.getElementById(`node-${row}-${col}`).className;
    if(nameNode === 'start'){
      const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }else if(nameNode === 'end'){
      const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
    // console.log('DOuble click is running.');
    // const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
    // this.setState({ grid: newGrid });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAstar() {
    const { grid } = this.state;
    // console.log('Helllo I am runing...');
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // console.log('Helllo I am runing...');
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className="head">
          <HeaderMenu></HeaderMenu>
        </div>
        <button
          onClick={() => {
            if (name === 'dijkstra') {
              this.visualizeDijkstra();
            } else if (name === 'astar') {
              this.visualizeAstar();
            }
          }}>
          Visualize Dijkstra's Algorithm
        </button>
        
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <><Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      onDragEnd={(e, row, col) => this.handleDragEnd(e, row, col)}
                      onDoubleClick={(row, col) => this.handleDoubleClick(row, col)}
                      // onContextMenu={(row, col) =>
                      //   this.handleContextMenu(row, col)
                      // }
                      row={row}></Node></>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}




const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      let node = createNode(col, row);
      node.distance = Infinity;
      node.totalDistance = Infinity;
      currentRow.push(node);
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStartToggled = (grid, row, col) => {

  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  newGrid[START_NODE_ROW][START_NODE_COL] = {
    ...newGrid[START_NODE_ROW][START_NODE_COL],
    isStart: false,
  };
  START_NODE_COL = col;
  START_NODE_ROW = row;
  return newGrid;
};

const getNewGridWithFinishToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[row][col] = newNode;
  newGrid[FINISH_NODE_ROW][FINISH_NODE_COL] = {
    ...newGrid[FINISH_NODE_ROW][FINISH_NODE_COL],
    isFinish: false,
  };
  FINISH_NODE_COL = col;
  FINISH_NODE_ROW = row;
  return newGrid;
};