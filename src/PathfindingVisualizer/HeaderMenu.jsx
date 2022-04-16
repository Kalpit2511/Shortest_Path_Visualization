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
        <nav className="navb">
          {/* <navMenu> */}
          <div>
            <form>
              <label>Algorithm</label>
            </form>
            <select
              value={selectAlgo}
              onChange={e => {
                let valueAlgo = e.target.value;
                setSelectAlgo(valueAlgo);
                name = valueAlgo;
              }}
              name="algorithm"
              id="algo">
              <option value=""></option>
              <option value="dijkstra">Dijkstra</option>
              <option value="astar">Astar</option>
            </select>
            {/* <h1>{selectAlgo}</h1> */}
          </div>
          <div>
            <form>
              <label>Nodes</label>
            </form>
            <select
              value={selectNode}
              onChange={e => {
                let nNode = e.target.value;
                setSelectNode(nNode);
                nameNode = nNode;
              }}
              name="nodes"
              id="nod">
              <option value=""></option>
              <option value="start">Start Node</option>
              <option value="end">End Node</option>
            </select>
          </div>
          {/* Wall and Weight node */}
          <div className="nodeType">
            <form>
              <label>Select Node</label>
            </form>
            <select
              value={selectNodeType}
              onChange={e => {
                let nNode = e.target.value;
                setSelectNodeType(nNode);
                nodeType = nNode;
              }}
              name="nodeType"
              id="nodes">
              <option value=""></option>
              <option value="wall">Wall Node</option>
              <option value="weight">Weight Node</option>
            </select>
          </div>
        </nav>
      </div>
    </>
  );
}

export default HeaderMenu;
export {name, nameNode, nodeType};
