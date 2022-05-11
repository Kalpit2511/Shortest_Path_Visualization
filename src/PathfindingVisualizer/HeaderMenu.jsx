import React, {useState} from 'react';
import './HeaderMenu.css';
let name, nameNode, nodeType;

function HeaderMenu() {
  const [selectAlgo, setSelectAlgo] = useState();
  const [selectNode, setSelectNode] = useState();
  const [selectNodeType, setSelectNodeType] = useState();
  return (
    <>
      <div className="container">
        {/* <navMenu> */}
        <div className="algo">
          {/* <form>
              <label>Algorithm</label>
            </form> */}
          <select
            value={selectAlgo}
            onChange={e => {
              let valueAlgo = e.target.value;
              setSelectAlgo(valueAlgo);
              name = valueAlgo;
            }}
            required
            name="algorithm"
            id="algo">
            <option value="" id="ph1">
              Algorithms
            </option>
            <option value="dijkstra">Dijkstra</option>
            <option value="astar">Astar</option>
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
          </select>
          {/* <h1>{selectAlgo}</h1> */}
        </div>
        <div className="nodee">
          {/* <form>
              <label>Nodes</label>
            </form> */}
          <select
            value={selectNode}
            onChange={e => {
              let nNode = e.target.value;
              setSelectNode(nNode);
              nameNode = nNode;
            }}
            required
            name="nodes"
            id="nod">
            <option value="" id="ph2">
              Nodes
            </option>
            <option value="start">Start Node</option>
            <option value="end">End Node</option>
            <option value="middle">Middle Node</option>
          </select>
        </div>
        {/* Wall and Weight node */}
        <div className="nodeType">
          {/* <form>
              <label>Select Node</label>
            </form> */}
          <select
            value={selectNodeType}
            onChange={e => {
              let nNode = e.target.value;
              setSelectNodeType(nNode);
              nodeType = nNode;
            }}
            required
            name="nodeType"
            id="nodes">
            <option value="" id="ph3">
              Constraint
            </option>
            <option value="wall">Wall Node</option>
            <option value="weight">Weight-5</option>
            <option value="weight-10">Weight-10</option>
            <option value="weight-15">Weight-15</option>
           
          </select>
        </div>
      </div>
    </>
  );
}

export default HeaderMenu;
export {name, nameNode, nodeType};
