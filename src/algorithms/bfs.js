export function bfs(grid, startNode, finishNode, name) {
  let structure = [startNode];
  const visitedNodesInOrder = [];
  let temp = `node-${startNode.row}-${startNode.col}`;

  let exploreNodes = {};
  exploreNodes[temp] = true;
  // console.log('finishNode ' + JSON.stringify(finishNode));
  // console.log(startNode.row);
  while (structure.length) {
    let currentNode = name === 'bfs' ? structure.shift() : structure.pop();
    visitedNodesInOrder.push(currentNode);
    if (name === 'dfs') {
      let cNode = `node-${currentNode.row}-${currentNode.col}`;
      exploreNodes[cNode] = true;
    }
    // console.log('currentNode ' + JSON.stringify(currentNode));
    // console.log('finishNode ' + JSON.stringify(finishNode));
    currentNode.isVisited = true;
    if (currentNode === finishNode) {
      console.log('Hello I am running');
      return visitedNodesInOrder;
    }
    let currentNeighbors = getUnvisitedNeighbors(currentNode, grid, name);
    // let check;
    // console.log(JSON.stringify(currentNeighbors));

    currentNeighbors.forEach(neighbor => {
      // if (node.isWall) continue;
      // console.log('neighbor' + JSON.stringify(neighbor));
      // console.log(JSON.stringify(neighbor));
      // console.log();

      // console.log(check === neighbor);
      // console.log('he ' + exploreNodes[neighbor]);

      if (!exploreNodes[neighbor]) {
        if (name === 'bfs') {
          exploreNodes[neighbor] = true;
        }
        // document.getElementById(neighbor).previousNode = currentNode;
        // structure.push(document.getElementById(neighbor));
        let x = neighbor.split('-');
        let r = parseInt(x[1]);
        let c = parseInt(x[2]);
        let node = grid[r][c];
        // console.log('node ' + JSON.stringify(node));
        if (!node.isWall) {
          node.previousNode = currentNode;
          structure.push(node);
        }
      }
    });

    // console.log('this' + structure);
  }
  // return visitedNodesInOrder;
}

function getUnvisitedNeighbors(currentNode, grid, name) {
  const neighbors = [];
  const {col, row} = currentNode;
  // node-${node.row}-${node.col}
  // console.log('rc ' + row + ' ' + col);
  if (col < grid[0].length - 1) {
    if (name === 'bfs') neighbors.push(`node-${row}-${col + 1}`);
    else neighbors.unshift(`node-${row}-${col + 1}`);
  }
  if (row < grid.length - 1) {
    if (name === 'bfs') neighbors.push(`node-${row + 1}-${col}`);
    else neighbors.unshift(`node-${row + 1}-${col}`);
  }
  if (col > 0) {
    if (name === 'bfs') neighbors.push(`node-${row}-${col - 1}`);
    else neighbors.unshift(`node-${row}-${col - 1}`);
  }
  if (row > 0) {
    if (name === 'bfs') neighbors.push(`node-${row - 1}-${col}`);
    else neighbors.unshift(`node-${row - 1}-${col}`);
  }

  // if (name === 'dfs') {
  //   return neighbors.filter(
  //     neighbor => !document.getElementById(neighbor).isVisited,
  //   );
  // }
  return neighbors.filter(
    neighbor =>
      !document.getElementById(neighbor).isVisited &&
      !document.getElementById(neighbor).isWall,
  );
}
