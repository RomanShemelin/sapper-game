import React from "react";
import { useState } from "react";

import "./App.scss";

import Cell from "@components/Cell/Cell";
import Display from "@components/Display/Display";
import { gameField } from "@utils/gameField";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [cells, setCells] = useState(gameField());

  console.log(cells);
  return (
    <div className="App">
      <div className="header">
        <Display value={0} />
        <button className="smile">
          <span>🙂</span>
        </button>
        <Display value={0} />
      </div>
      <div className="body">
        {cells.map((row, indexRow) =>
          row.map((cell, indexCol) => (
            <Cell
              key={uuidv4()}
              row={indexRow}
              col={indexCol}
              value={cell.value}
              status={cell.status}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
