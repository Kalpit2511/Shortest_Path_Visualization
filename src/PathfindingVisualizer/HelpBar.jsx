import React from 'react';
import path from './photos/path.png';
// import algo from './photos/algo.png';
import algorithm from './photos/algorithm.png';
import points from './photos/points.png';
// import spath from './photos/spath.png';
import './HelpBar.css';
let page;

export default function Infomration() {
  const [pageCount, setpageCount] = React.useState(1);
  // const [pageVisible, setpageVisible] = React.useState(false);
  // const [showHelp, setshowHelp] = React.useState('hide');

  if (pageCount === 1) {
    page = (
      <>
        <h3>Welcome to Shortest Pathfinder</h3>
        <h4>
          This Helpdesk  will walk you through all of the features of this
          application.
        </h4>
        <p>
          If you want to know how to use this tool press the "Next"
          button below. And press "Close" to go back to visualization.
        </p>
        <div className="photos">
          <img
          id="mainTutorialImage"
          src={path}
          width={200}
          height={200}
          alt="Not Available!"
        />
        </div>
        
      </>
    );
  } else if (pageCount === 2) {
    page = (
      <>
        <h3>What is a pathfinding algorithm?</h3>
        <h4>
          At its core, a pathfinding algorithm seeks to find the shortest path
          between two points. This application visualizes various pathfinding
          algorithms in action.
        </h4>
        <p>
          All of the algorithms on this application are adapted for a 2D grid,
          where 90 degree turns have a "cost" of 1 and movements from a node to
          another have a "cost" of 1.
        </p>
        <div className="photos">
        <img
          id="mainTutorialImage"
          src={points}
          width={200}
          height={200}
          alt="Not Available!"
        />
        </div>
        
      </>
    );
  } else if (pageCount === 3) {
    page = (
      <>
        <h3>Picking an algorithm</h3>
        <h6>Choose an algorithm from the "Algorithms" drop-down menu.</h6>
        <p>
          Note that some algorithms are{' '}
          <i>
            <b>unweighted</b>
          </i>
          , while others are{' '}
          <i>
            <b>weighted</b>
          </i>
          . Unweighted algorithms do not take turns or weight nodes into
          account, whereas weighted ones do. Additionally, not all algorithms
          guarantee the shortest path.{' '}
        </p>
        <img id="secondTutorialImage" src={algorithm} alt="Not Available!" />
      </>
    );
  } else if (pageCount === 4) {
    page = (
      <>
        <h3>Meet the algorithms</h3>
        <h6>Not all algorithms are created equal.</h6>
        <ul>
          <li>
            <b>Dijkstra's Algorithm</b>: the Greedy of pathfinding
            algorithms; guarantees the shortest path
          </li>
          <li>
            <b>A* Search</b>: arguably the best pathfinding
            algorithm; uses heuristics to guarantee the shortest path much
            faster than Dijkstra's Algorithm
          </li>
          <li>
            <b>Breath-first Search</b>: a great algorithm;
            guarantees the shortest path
          </li>
          <li>
            <b>Depth-first Search</b>: a worse algorithm for
            pathfinding; does not guarantee the shortest path
          </li>
        </ul>
      </>
    );
  } else if (pageCount === 5) {
    page = (
      <>
        <h3>Adding walls and weights</h3>
        <h6>
          Select the 'Wall Node' from the given weigth nodes dropdown to add the wall in the
          grid. While you can add the different weight nodes as per the weight
          by selecting 'Weight Node' from the dropdown.
        </h6>
        <p>
          Walls are impenetrable, meaning that a path cannot cross through them.
          Weights, however, are not impassable. They are simply more "costly" to
          move through. In this application, there are many different weight
          nodes with different costs, i.e. 5, 10, 15.
        </p>
        {/* <img id="secondTutorialImage" src={} /> */}
      </>
    );
  } else if (pageCount === 6) {
    page = (
      <>
        <h3>Adding a Middle Node</h3>
        <h6>Click the "Add Middle Node" button.</h6>
        <p>
          Adding a Middle node will change the course of the chosen algorithm.
          In other words, the algorithm will first look for the middle node (in
          an effort to diffuse it) and will then look for the target node.
        </p>
        {/* <img id="secondTutorialImage" src="public/styling/bomb.png" /> */}
      </>
    );
   } 
   //else if (pageCount === 7) {
  //   page = (
  //     <>
  //       <h3>Dragging nodes</h3>
  //       <h6>Click and drag the start, bomb, and target nodes to move them.</h6>
  //       <p>
  //         Note that you can drag nodes even after an algorithm has finished
  //         running. This will allow you to instantly see different paths.
  //       </p>
  //       {/* <img src="public/styling/dragging.gif" /> */}
  //     </>
  //   );
    //}
   else if (pageCount === 7) {
    page = (
      <>
        <h3>Visualizing and more</h3>
        <h6>
          Use the navbar buttons to visualize algorithms and to do other stuff!
        </h6>
        <p>
          You can clear the current path, clear walls and weights, all from the navbar.
          If you want to access this Helpdesk again, click on "How to Use" in the top left corner of your screen.
        </p>
        {/* <img id="secondTutorialImage" src="public/styling/navbar.png" /> */}
      </>
    );
  } else if (pageCount === 8) {
    page = (
      <>
        <h3>Enjoy!</h3>
        <h3>
          {/* I hope you have just as much fun playing around with this
          visualization tool as I had building it! */}
          This Visualizaion will help you to learn shortest algorithms deeply and also fun to playing around with this visualization tool.
        </h3>
        {/* <p>
          If you want to see the source code for this application, check out my{' '}
          <a href="https://github.com/ayushkaneria11/Shortest-Path-Visualization.git">
            github
          </a>
          .
        </p> */}
      </>
    );
  }

  function pageNext() {
    if (pageCount === 8) {
      setpageCount(1);
    } else {
      setpageCount(pageCount => (pageCount + 1) % 10);
    }
  }
  function pagePrev() {
    if (pageCount > 1) {
      setpageCount(pageCount => pageCount - 1);
    }
  }
  // function pageClose() {
  //   setTutorial(false);
  // }

  return (
    <div id="helpbar" className="show">
      <h2>How to use?</h2>
      {page}
      
      <div className="pgcount">{pageCount}/8</div>
      <div className="btns">
        <div className="previousbtn">
          <button id="previousButton" type="button" onClick={pagePrev}>
            Previous
          </button>
        </div>
        
        <div className="nextbtn">
          <button id="nextButton" type="button" onClick={pageNext}>
            Next
          </button>
        </div>
        <div className="closebutton">
          <button
            id="closebtn"
            onClick={() => {
              // console.log(document.getElementById('helpmenu'));
              document.getElementById('helpmenu').className = 'hide';
            }}>
            Close
          </button>
        </div>
        
      </div>
    </div>
  );
}

// export {s};
