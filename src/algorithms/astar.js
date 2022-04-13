import {getAllNodes} from './dijkstra.js';

export function astar(grid, startNode, targetNode) {
  startNode.distance = 0;
  startNode.totalDistance = 0;
  startNode.direction = 'up';
  const visitedNodesInOrder = [];

  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    let closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;
    if (closestNode === targetNode) return visitedNodesInOrder;
    updateNeighbors(closestNode, grid, startNode, targetNode);
  }
}
export function getNodesInOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
// Function of closestNode - to sort the nodes by distance
function sortNodesByDistance(unvisitedNodes) {
  // console.log(unvisitedNodes);
  let index, currentClosest;
  for (let j = 0; j <= unvisitedNodes.length - 1; j++) {
    if (
      !currentClosest ||
      currentClosest.totalDistance > unvisitedNodes[j].totalDistance
    ) {
      currentClosest = unvisitedNodes[j];
      index = j;
    } else if (
      currentClosest.totalDistance === unvisitedNodes[j].totalDistance
    ) {
      if (
        currentClosest.heuristicDistance > unvisitedNodes[j].heuristicDistance
      ) {
        currentClosest = unvisitedNodes[j];
        index = j;
      }
    }
  }

  [unvisitedNodes[0], unvisitedNodes[index]] = [
    unvisitedNodes[index],
    unvisitedNodes[0],
  ];
  return unvisitedNodes;
}

function updateNeighbors(closestNode, grid, startNode, targetNode) {
  let neighbors = getUnvisitedNeighbors(closestNode, grid);
  for (let neighbor of neighbors) {
    updateNode(closestNode, neighbor, targetNode);
  }
}

function updateNode(closestNode, neighbor, targetNode) {
  let distance = getDistance(closestNode, neighbor);

  if (!neighbor.heuristicDistance) {
    neighbor.heuristicDistance = manhattanDistance(neighbor, targetNode);
  }

  let distanceToCompare = closestNode.distance + distance[0];
  if (distanceToCompare < neighbor.distance) {
    neighbor.distance = distanceToCompare;
    neighbor.totalDistance = neighbor.distance + neighbor.heuristicDistance;
    neighbor.previousNode = closestNode;
    neighbor.path = distance[1];
    neighbor.direction = distance[2];
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getDistance(nodeOne, nodeTwo) {
  const {row: x1, col: y1} = nodeOne;
  const {row: x2, col: y2} = nodeTwo;

  if (x2 < x1 && y1 === y2) {
    if (nodeOne.direction === 'up') {
      return [1, ['f'], 'up'];
    } else if (nodeOne.direction === 'right') {
      return [2, ['l', 'f'], 'up'];
    } else if (nodeOne.direction === 'left') {
      return [2, ['r', 'f'], 'up'];
    } else if (nodeOne.direction === 'down') {
      return [3, ['r', 'r', 'f'], 'up'];
    } else if (nodeOne.direction === 'up-right') {
      return [1.5, null, 'up'];
    } else if (nodeOne.direction === 'down-right') {
      return [2.5, null, 'up'];
    } else if (nodeOne.direction === 'up-left') {
      return [1.5, null, 'up'];
    } else if (nodeOne.direction === 'down-left') {
      return [2.5, null, 'up'];
    }
  } else if (x2 > x1 && y1 === y2) {
    if (nodeOne.direction === 'up') {
      return [3, ['r', 'r', 'f'], 'down'];
    } else if (nodeOne.direction === 'right') {
      return [2, ['r', 'f'], 'down'];
    } else if (nodeOne.direction === 'left') {
      return [2, ['l', 'f'], 'down'];
    } else if (nodeOne.direction === 'down') {
      return [1, ['f'], 'down'];
    } else if (nodeOne.direction === 'up-right') {
      return [2.5, null, 'down'];
    } else if (nodeOne.direction === 'down-right') {
      return [1.5, null, 'down'];
    } else if (nodeOne.direction === 'up-left') {
      return [2.5, null, 'down'];
    } else if (nodeOne.direction === 'down-left') {
      return [1.5, null, 'down'];
    }
  }
  if (y2 < y1 && x1 === x2) {
    if (nodeOne.direction === 'up') {
      return [2, ['l', 'f'], 'left'];
    } else if (nodeOne.direction === 'right') {
      return [3, ['l', 'l', 'f'], 'left'];
    } else if (nodeOne.direction === 'left') {
      return [1, ['f'], 'left'];
    } else if (nodeOne.direction === 'down') {
      return [2, ['r', 'f'], 'left'];
    } else if (nodeOne.direction === 'up-right') {
      return [2.5, null, 'left'];
    } else if (nodeOne.direction === 'down-right') {
      return [2.5, null, 'left'];
    } else if (nodeOne.direction === 'up-left') {
      return [1.5, null, 'left'];
    } else if (nodeOne.direction === 'down-left') {
      return [1.5, null, 'left'];
    }
  } else if (y2 > y1 && x1 === x2) {
    if (nodeOne.direction === 'up') {
      return [2, ['r', 'f'], 'right'];
    } else if (nodeOne.direction === 'right') {
      return [1, ['f'], 'right'];
    } else if (nodeOne.direction === 'left') {
      return [3, ['r', 'r', 'f'], 'right'];
    } else if (nodeOne.direction === 'down') {
      return [2, ['l', 'f'], 'right'];
    } else if (nodeOne.direction === 'up-right') {
      return [1.5, null, 'right'];
    } else if (nodeOne.direction === 'down-right') {
      return [1.5, null, 'right'];
    } else if (nodeOne.direction === 'up-left') {
      return [2.5, null, 'right'];
    } else if (nodeOne.direction === 'down-left') {
      return [2.5, null, 'right'];
    }
  }
}

function manhattanDistance(nodeA, nodeB) {
  let xChange = Math.abs(nodeA.row - nodeB.row);
  let yChange = Math.abs(nodeA.col - nodeB.col);

  return xChange + yChange;
}

// module.exports = astar;
