import React, {useState} from 'react';
import './HeaderMenu.css';
let name, nameNode;

function HeaderMenu() {
  const [selectAlgo, setSelectAlgo] = useState();
  const [selectNode, setSelectNode] = useState();
  return (
    <>
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
      </nav>
    </>
  );
}

export default HeaderMenu;
export {name, nameNode};
