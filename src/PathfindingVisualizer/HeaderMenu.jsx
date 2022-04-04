import React, {useState} from 'react';
import nodedrop, {name1} from './NodeDrop';
let name;
let nameNode;

function HeaderMenu() {
  const [selectAlgo, setSelectAlgo] = useState();
  const [selectNode, setSelectNode] = useState();
  return (
    <>
    <div>
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
      <h1>{selectAlgo}</h1>
    </div>
    <div>
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
      <option value="wall">Wall Node</option>
    </select>
    <h1>{selectNode}</h1>
  </div>
  </>
  );
}



export default HeaderMenu;
export {name,nameNode};