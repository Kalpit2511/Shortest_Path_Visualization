import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {astar, getNodesInOrder} from '../algorithms/astar';
import HeaderMenu, {name, nameNode, nodeType} from './HeaderMenu';
import {bfs} from '../algorithms/bfs';
// import HelpBar from './HelpBar';
// import {Link} from 'react-router-dom';
import Nodeinfo from './Nodeinfo';
import HelpBar from './HelpBar';
import './PathfindingVisualizer.css';
import Algoinfo from './Algoinfo';
// import {Link} from 'react-router-dom';

let START_NODE_COL = 14;
let START_NODE_ROW = 2;
let FINISH_NODE_ROW = 5;
let FINISH_NODE_COL = 30;
let MIDDLE_NODE_COL = 0;
let MIDDLE_NODE_ROW = 0;
let nodeCount = 0;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      countNode: 0,
      showHelp: 'hide',
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    if (nodeType === 'wall') {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    } else if (nodeType === 'weight') {
      const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    } else if (nodeType === 'weight-10') {
      const newGrid = getNewGridWithWeightTenToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    } else if (nodeType === 'weight-15') {
      const newGrid = getNewGridWithWeightFifteenToggled(
        this.state.grid,
        row,
        col,
      );
      this.setState({grid: newGrid, mouseIsPressed: true});
    } else if (nameNode === 'middle') {
      const newGrid = getNewGridWithMiddleToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    if (nodeType === 'wall') {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    } else if (nodeType === 'weight') {
      const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    } else if (nameNode === 'middle') {
      const newGrid = getNewGridWithMiddleToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    }
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  handleDoubleClick(row, col) {
    if (nameNode === 'start') {
      const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
      this.setState({grid: newGrid});
    } else if (nameNode === 'end') {
      const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
      this.setState({grid: newGrid});
    }
  }
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    nodeCount = nodesInShortestPathOrder.length;
    const start_row = START_NODE_ROW;
    const start_col = START_NODE_COL;
    const end_row = FINISH_NODE_ROW;
    const end_col = FINISH_NODE_COL;
    this.setState({countNode: nodeCount});
    for (let i = 0; i <= visitedNodesInOrder.length - 1; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];

        if (node.row === start_row && node.col === start_col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited node-start';
        } else if (node.row === end_row && node.col === end_col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited node-finish';
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    const start_row = START_NODE_ROW;
    const start_col = START_NODE_COL;
    const end_row = FINISH_NODE_ROW;
    const end_col = FINISH_NODE_COL;
    const middle_row = MIDDLE_NODE_ROW;
    const middle_col = MIDDLE_NODE_COL;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.row === start_row && node.col === start_col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path node-start';
        } else if (node.row === end_row && node.col === end_col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path node-finish';
        } else if (node.row === middle_row && node.col === middle_col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path node-middle';
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDijkstraWithMiddle(name) {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    let middleNode = grid[MIDDLE_NODE_ROW][MIDDLE_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;
    let nodesInShortestPathOrder;

    if (name === 'dijkstra') {
      visitedNodesInOrder = dijkstra(grid, startNode, middleNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(middleNode);
    } else {
      visitedNodesInOrder = astar(grid, startNode, middleNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(middleNode);
    }

    this.clearBoard();
    let newvisitedNodesInOrder, newnodesInShortestPathOrder;
    if (name === 'dijkstra') {
      newvisitedNodesInOrder = dijkstra(grid, middleNode, finishNode);
      newnodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    } else {
      newvisitedNodesInOrder = astar(grid, middleNode, finishNode);
      newnodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    }

    nodesInShortestPathOrder.push(...newnodesInShortestPathOrder);
    for (let i = 0; i <= visitedNodesInOrder.length - 1; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        for (let j = 0; j < newvisitedNodesInOrder.length; j++) {
          if (j === newvisitedNodesInOrder.length - 1) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, i * 10 + 10 * j + 10);
          }
          setTimeout(() => {
            const node = newvisitedNodesInOrder[j];
            if (node === startNode) {
              document.getElementById(
                `node-${node.row}-${node.col}`,
              ).className = 'node node-visited-middle node-start';
            } else if (node === finishNode) {
              document.getElementById(
                `node-${node.row}-${node.col}`,
              ).className = 'node node-visited-middle node-finish';
            } else if (node === middleNode) {
              document.getElementById(
                `node-${node.row}-${node.col}`,
              ).className = 'node node-visited-middle node-middle';
            } else {
              document.getElementById(
                `node-${node.row}-${node.col}`,
              ).className = 'node node-visited-middle';
            }
          }, i * 10 + 10 * j);
        }
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node === startNode) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited node-start';
        } else if (node === finishNode) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited node-finish';
        } else if (node === middleNode) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited-middle node-middle';
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
    this.setState({countNode: nodesInShortestPathOrder.length});
  }

  visualizeAstar() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBFS(name) {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode, name);
    const nodesInShortestPathOrder = getNodesInOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  clearBoard() {
    const newGrid = this.state.grid;

    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        let ele = document.getElementById(
          `node-${newGrid[i][j].row}-${newGrid[i][j].col}`,
        );
        if (
          ele.className === 'node node-visited' ||
          ele.className === 'node node-shortest-path'
        ) {
          ele.className = 'node';
        }
        newGrid[i][j].isVisited = false;
        // newGrid[i][j].isWall = false;
        newGrid[i][j].distance = Infinity;
        newGrid[i][j].previousNode = null;
        newGrid[i][j].totalDistance = Infinity;
      }
    }
    this.setState({grid: newGrid, countNode: 0});
  }

  render() {
    const {grid, mouseIsPressed, countNode} = this.state;

    return (
      <>
        <div className="container">
          <span className="name">
            <h1>Shortest Pathfinder</h1>
          </span>
          <div className="head">
            <HeaderMenu></HeaderMenu>
          </div>
          <div className="buttonvizu">
            <button
              className="butvizu"
              onClick={() => {
                if (
                  (name === 'dijkstra' || name === 'astar') &&
                  nameNode === 'middle'
                ) {
                  this.visualizeDijkstraWithMiddle(name);
                } else if (name === 'dijkstra') {
                  this.visualizeDijkstra();
                } else if (name === 'astar') {
                  this.visualizeAstar();
                } else if (name === 'bfs' || name === 'dfs') {
                  this.visualizeBFS(name);
                }
              }}>
              Visualize Algorithm
            </button>
          </div>
          <div className="buttonrest">
            <button
              className="butreset"
              onClick={() => {
                this.clearBoard();
              }}>
              Reset
            </button>
          </div>
          <div className="count">
            <p>Node count: {countNode}</p>
          </div>
        </div>
        <div className="nodinfo">
          <Nodeinfo></Nodeinfo>
        </div>

        <div id="helpmenu" className="hide">
          <HelpBar />
        </div>
        <div id="algoinfor" className="hide">
          <Algoinfo />
        </div>
        {/* <HelpBar /> */}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    isWeight,
                    isWeight10,
                    isWeight15,
                    isMiddle,
                  } = node;
                  return (
                    <>
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        isWeight={isWeight}
                        isWeight15={isWeight15}
                        isWeight10={isWeight10}
                        isMiddle={isMiddle}
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
  newNode.weight = newNode.isWeight ? 5 : 1;
  // newNode.weight = 15;
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithWeightTenToggled = (grid, row, col) => {
  // console.log(row + ' ' + col);
  console.log(document.getElementById(`node-${row}-${col}`).className);
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight10: !node.isWeight10,
  };
  // Add here
  newNode.weight = newNode.isWeight10 ? 10 : 1;
  // newNode.weight = 15;
  newGrid[row][col] = newNode;
  return newGrid;
};
const getNewGridWithWeightFifteenToggled = (grid, row, col) => {
  // console.log(row + ' ' + col);
  console.log(document.getElementById(`node-${row}-${col}`).className);
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight15: !node.isWeight15,
  };
  // Add here
  newNode.weight = newNode.isWeight15 ? 15 : 1;
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

const getNewGridWithMiddleToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isMiddle: !node.isMiddle,
  };

  newGrid[row][col] = newNode;
  newGrid[MIDDLE_NODE_ROW][MIDDLE_NODE_COL] = {
    ...newGrid[MIDDLE_NODE_ROW][MIDDLE_NODE_COL],
    isMiddle: false,
  };
  MIDDLE_NODE_COL = col;
  MIDDLE_NODE_ROW = row;
  console.log('In func ' + MIDDLE_NODE_ROW + ' ' + MIDDLE_NODE_COL);
  return newGrid;
};
