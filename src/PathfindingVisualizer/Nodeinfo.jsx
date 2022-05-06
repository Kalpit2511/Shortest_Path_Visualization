import React from 'react';
import './Nodeinfo.css';
import { ReactComponent as Start } from './start.svg';
import { ReactComponent as End } from './target.svg';
import { ReactComponent as Middle } from './middle.svg';

function Nodeinfo() {
  return (
    <>
      <div className="info">
        <span className="start">
          <Start />
          <p>Start Node</p>
        </span>
        <span className="target">
          <End />
          <p>Target Node</p>
        </span>
        <span className="middle">
          <Middle />
          <p>Middle Node</p>
        </span>
        <span className="wall">
          <div className="box bluewhale"></div>
          <br></br>
          <p>Wall Node</p>
        </span>
        <span className="visitednode">
          <div className="box aqua"></div>
          <br></br>
          <p>Visited Node</p>
        </span>
        <span className="shortest">
          <div className="box yellow"></div>
          <br></br>
          <p>Shortest Path</p>
        </span>
        <span className="unvisited">
          <div className="box blank"></div>
          <br></br>
          <p>Unvisited Node</p>
        </span>
        <span className="weight">
          <div className="box orange"></div>
          <br></br>
          <p>
            Weight Node
            <br />
            (Value 5)
          </p>
        </span>
        <span className="weight">
          <div className="box river"></div>
          <br></br>
          <p>
            Weight Node
            <br />
            (Value 10)
          </p>
        </span>
        <span className="weight">
          <div className="box stones"></div>
          <br></br>
          <p>
            Weight Node
            <br />
            (Value 15)
          </p>
        </span>
        <div className="buttonsHI">
          <div className="helpbtn">
            <button
              id="btn-help"
              onClick={() => {
                document.getElementById('helpmenu').className = 'show';
              }}>
              Help Menu
            </button>
          </div>
          <div className="infobtn">
            <button
              id="btn-info"
              onClick={() => {
                document.getElementById('algoinfor').className = 'show';
              }}>
              Algorithms<br />
              Information
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
export default Nodeinfo;
