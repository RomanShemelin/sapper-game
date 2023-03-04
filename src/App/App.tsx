import React, { useEffect } from "react";
import { useState } from "react";

import "./App.scss";

import Cell from "@components/Cell/Cell";
import Display from "@components/Display/Display";
import {
  CellStatus,
  CellValue,
  checkWin,
  gameField,
  openCellsWithoutMine,
} from "@utils/gameField";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [cells, setCells] = useState(gameField());
  const [countMine, setCountMine] = useState<number>(40);
  const [emoji, setEmoji] = useState<string>(`😃`);
  const [timer, setTimer] = useState<number>(0);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);

  useEffect(() => {
    if (startGame && !win && !gameOver && timer < 999) {
      const timeInterval = setInterval(() => setTimer(timer + 1), 1000);
      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [startGame, timer, win, gameOver]);
  useEffect(() => {
    if (gameOver) {
      setEmoji("😵");
    }
  }, [gameOver]);

  const handleRestartGame = () => {
    if (startGame || gameOver) {
      setTimer(0);
      setCountMine(40);
      setStartGame(false);
      setWin(false);
      setCells(gameField());
      setEmoji(`😃`);
    }
  };

  const handleClick = (row: number, col: number) => {
    let current = cells[row][col];
    let newCells = cells.slice();
    if (!startGame) {
      while (current.value === CellValue.mine) {
        newCells = gameField();
        current = newCells[row][col];
      }
      setStartGame(true);
    }
    if (current.value === CellValue.mine) {
      let newCells = cells.slice();
      newCells = newCells.map((row) =>
        row.map((col) => {
          if (col.value === CellValue.mine) {
            return {
              ...col,
              status: CellStatus.visible,
            };
          }
          return col;
        })
      );
      setCells(newCells);
      setStartGame(false);
      setGameOver(true);
      return;
    } else if (current.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row, col);
    } else {
      newCells[row][col].status = CellStatus.visible;
    }

    let won = checkWin(newCells, row, col);
    if (!won) {
      newCells = newCells.map((row) =>
        row.map((col) => {
          if (col.value === CellValue.mine) {
            return {
              ...col,
              status: CellStatus.flaged,
            };
          }
          return col;
        })
      );
      setWin(true);
    }
    setCells(newCells);
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
      setCells(newCells);
      newCells[row][col].status = CellStatus.question;
    } else if ((newCells[row][col].status = CellStatus.open)) {
      setCells(newCells);
      setCountMine(countMine + 1);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <Display value={countMine} />
        <button className="smile" onClick={handleRestartGame}>
          <span>{win ? "😎" : emoji}</span>
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
