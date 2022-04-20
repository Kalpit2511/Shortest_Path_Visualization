import React from 'react';
import './Nodeinfo.css';
import { ReactComponent as Start } from './start.svg';
import { ReactComponent as End } from './target.svg';

function Nodeinfo() {
    return (
        <>
            <div className="info">
                <span className="start">
                    <Start/>
                    <p>Start Node</p>
                </span>
                <span className="target">
                    <End/>
                    <p>Target Node</p>
                </span>
                <span className="wall">
                    <div class='box bluewhale'></div><br></br>
                    <p>Wall Node</p>
                </span>
                <span className="visitednode">
                    <div class='box aqua'></div><br></br>
                    <p>Visited Node</p>
                </span>
                <span className="shortest">
                    <div class='box yellow'></div><br></br>
                    <p>Shortest Path</p>
                </span>
                <span className="unvisited">
                    <div class='box blank'></div><br></br>
                    <p>Unvisited Node</p>
                </span>
                <span className="weight">
                    <div class='box orange'></div><br></br>
                    <p>Weight Node<br/>(Value 5)</p>
                </span>
                <span className="weight">
                    <div class='box river'></div><br></br>
                    <p>Weight Node<br/>(Value 10)</p>
                </span>
                <span className="weight">
                    <div class='box stones'></div><br></br>
                    <p>Weight Node<br/>(Value 15)</p>
                </span>
            </div>

        </>

    )

}
export default Nodeinfo;