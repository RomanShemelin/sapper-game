import React from "react";

import Display from "@components/Display/Display";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Display value={0} />
        <button className="smile">
          <span>🙂</span>
        </button>
        <Display value={0} />
      </div>
      <div className="body">body</div>
    </div>
  );
}

export default App;
