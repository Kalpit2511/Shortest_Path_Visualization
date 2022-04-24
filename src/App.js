import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HelpBar from './PathfindingVisualizer/HelpBar';

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
          <Route exact path="/helpbar" element={<HelpBar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
