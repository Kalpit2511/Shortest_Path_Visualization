import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { astar, getNodesInOrder } from '../algorithms/astar';
import HeaderMenu, { name, nameNode, nodeType } from './HeaderMenu';
import { bfs } from '../algorithms/bfs';

import './PathfindingVisualizer.css';

let START_NODE_COL = 14;
let START_NODE_ROW = 2;
let FINISH_NODE_ROW = 5;
let FINISH_NODE_COL = 30;
let nodeCount = 0;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      countNode: 0,
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
    if (nodeType === 'wall') {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    } else if(nodeType === 'weight') {
      const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    if (nodeType === 'wall') {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    } else {
      const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  // handleDragEnd(e, row, col) {
  //   // console.log('drag end is running');
  //   for (let i in e) {
  //     let x = e[i];
  //     // console.log(x);
  //   }
  //   // console.log('drag is over.');
  //   // console.log('I am runnig.' + row + ' ' + col + ' ' + e.target.id + ' ' + e);
  //   // const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
  //   // this.setState({grid: newGrid});
  // }

  handleDoubleClick(row, col) {
    // let name = document.getElementById(`node-${row}-${col}`).className;
    if (nameNode === 'start') {
      const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (nameNode === 'end') {
      const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
    // console.log('DOuble click is running.');
    // const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
    // this.setState({ grid: newGrid });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    nodeCount = nodesInShortestPathOrder.length;
    this.setState({ countNode: nodeCount });
    for (let i = 1; i <= visitedNodesInOrder.length - 1; i++) {
      if (i === visitedNodesInOrder.length - 1) {
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
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
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
    // console.log(nodesInShortestPathOrder);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // console.log('Helllo I am runing...');
  }

  visualizeBFS() {
    const { grid } = this.state;
    // console.log('Helllo I am runing...');
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode, 'dfs');
    // console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInOrder(finishNode);
    // console.log('Hello ' + nodesInShortestPathOrder);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // console.log('Helllo I am runing...');
  }

  clearBoard() {
    const newGrid = this.state.grid;
    // console.log(newGrid[0].length);
    // console.log(newGrid.length + ' ' + newGrid[0].length);

    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        let ele = document.getElementById(
          `node-${newGrid[i][j].row}-${newGrid[i][j].col}`,
        );
        if (ele.className === 'node node-visited') {
          ele.className = 'node';
        } else if (ele.className === 'node node-shortest-path') {
          // console.log(ele.className);
          ele.className = 'node';
          // console.log(ele.className);
        }
        newGrid[i][j].isVisited = false;
        // newGrid[i][j].isWall = false;
        newGrid[i][j].distance = Infinity;
        newGrid[i][j].previousNode = null;
        // ele.className.replace('node node-visited', 'node');
        // ele.className.replace('node node-shortest-path', 'node');
        // console.log(ele.className);
      }
    }
    this.setState({ grid: newGrid, countNode: 0 });
  }

  render() {
    const { grid, mouseIsPressed, countNode } = this.state;

    return (
      <>
        <div className="container">
        <span className='name'>
            <h1>Shortest Pathfinder</h1>
          </span>
          <div className="head">
            <HeaderMenu></HeaderMenu>
          </div>
          <div className="buttonvizu">
            <button className="butvizu"
              onClick={() => {
                if (name === 'dijkstra') {
                  this.visualizeDijkstra();
                } else if (name === 'astar') {
                  this.visualizeAstar();
                }
              }}>
              Visualize Algorithm
            </button>
          </div>
          <div className="buttonrest">
            <button className="butreset"
              onClick={() => {
                this.clearBoard();
              }}>
              Reset
            </button>
          </div>
          <div className="count">
            <h3>Node count: {countNode}</h3>
          </div>
          
        </div>


        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall, isWeight } = node;
                  return (
                    <>
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        isWeight={isWeight}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        // onDragEnd={(e, row, col) =>
                        //   this.handleDragEnd(e, row, col)
                        // }
                        onDoubleClick={(row, col) =>
                          this.handleDoubleClick(row, col)
                        }
                        // onContextMenu={(row, col) =>
                        //   this.handleContextMenu(row, col)
                        // }
                        row={row}></Node>
                    </>
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

// function clearBoard(){

// }

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      let node = createNode(col, row);
      node.distance = Infinity;
      node.totalDistance = Infinity;
      node.weight = 1;
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
    isWeight: false,
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

// weight-15
// split('-') => ar[1] = 15 => parsInt
// Add there -> newNode.weight = parseInt(ar[1]);

const getNewGridWithWeightToggled = (grid, row, col) => {
  // console.log(row + ' ' + col);
  console.log(document.getElementById(`node-${row}-${col}`).className);
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight: !node.isWeight,
  };
  // Add here
  newNode.weight = newNode.isWeight ? 15 : 1;
  // newNode.weight = 15;
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
