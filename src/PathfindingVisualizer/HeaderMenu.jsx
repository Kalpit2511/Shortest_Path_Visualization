import React, {useState} from 'react';
let name;

function HeaderMenu() {
  const [selects, setSelects] = useState();
  return (
    <div>
      <select
        value={selects}
        onChange={e => {
          let valueAlgo = e.target.value;
          setSelects(valueAlgo);
          name = valueAlgo;
        }}
        name="algorithm"
        id="algo">
        <option value=""></option>
        <option value="dijkstra">Dijkstra</option>
        <option value="astar">Astar</option>
      </select>
      <h1>{selects}</h1>
    </div>
  );
}

export default HeaderMenu;
export {name};
