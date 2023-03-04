import React, { useEffect } from "react";
import { useState } from "react";

import "./App.scss";

import Cell from "@components/Cell/Cell";
import Display from "@components/Display/Display";
import { CellStatus, CellValue, gameField } from "@utils/gameField";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [cells, setCells] = useState(gameField());
  const [countMine, setCountMine] = useState<number>(40);
  const [emoji, setEmoji] = useState<string>(`😃`);
  const [timer, setTimer] = useState<number>(0);
  const [startGame, setStartGame] = useState<boolean>(false);

  useEffect(() => {
    if (startGame && timer < 999) {
      const timeInterval = setInterval(() => setTimer(timer + 1), 1000);
      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [startGame, timer]);

  const handleRestartGame = () => {
    if (startGame) {
      setTimer(0);
      setCountMine(40);
      setStartGame(false);
      setCells(gameField());
    }
  };

  const handleClick = (row: number, col: number) => {
    if (!startGame) {
      setStartGame(true);
    }
    const current = cells[row][col];
    const newCells = cells.slice();
    if (
      current.status === CellStatus.flaged ||
      current.status === CellStatus.visible
    )
      return;
    if (current.value === CellValue.mine) {
    } else if (current.value === CellValue.none) {
    } else {
      newCells[row][col].status = CellStatus.visible;
      setCells(newCells);
    }
  };

  const handleRightMouseClick = (row: number, col: number) => {
    const current = cells[row][col];
    const newCells = cells.slice();
    if (!startGame) return;
    if (current.status === CellStatus.visible) return;
    if (current.status === CellStatus.open) {
      newCells[row][col].status = CellStatus.flaged;
      setCells(newCells);
      setCountMine(countMine - 1);
    } else if (current.status === CellStatus.flaged) {
      newCells[row][col].status = CellStatus.question;
    } else {
      newCells[row][col].status = CellStatus.open;
      setCells(newCells);
      setCountMine(countMine + 1);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <Display value={countMine} />
        <button className="smile" onClick={handleRestartGame}>
          <span>{emoji}</span>
        </button>
        <Display value={timer} />
      </div>
      <div className="field">
        {cells.map((row, indexRow) =>
          row.map((cell, indexCol) => (
            <Cell
              key={uuidv4()}
              row={indexRow}
              col={indexCol}
              value={cell.value}
              status={cell.status}
              onClick={handleClick}
              setEmoji={setEmoji}
              handleRightMouseClick={handleRightMouseClick}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
