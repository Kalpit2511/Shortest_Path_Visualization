import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <PathfindingVisualizer></PathfindingVisualizer>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
