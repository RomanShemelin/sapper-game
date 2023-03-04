import React, { Dispatch, SetStateAction } from "react";

import { CellStatus, CellValue } from "@utils/gameField";

import "./Cell.scss";

interface CellProps {
  row: number;
  col: number;
  value: CellValue;
  status: CellStatus;
  onClick: (row: number, col: number) => void;
  handleRightMouseClick: (row: number, col: number) => void;
  setEmoji: Dispatch<SetStateAction<string>>;
}

export default function Cell({
  row,
  col,
  value,
  status,
  onClick,
  handleRightMouseClick,
  setEmoji,
}: CellProps) {
  const onHandleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) {
      handleRightMouseClick(row, col);
    } else {
      setEmoji("😮");
    }
  };

  const onHandleMouseUp = (e: React.MouseEvent) => {
    if (e.button === 0) {
      onClick(row, col);
      setEmoji(`😃`);
    }
  };
  return (
    <button
      className={"Cell"}
      onMouseDown={onHandleMouseDown}
      onMouseUp={onHandleMouseUp}
    >
      {status === CellStatus.flaged && <span>🚩</span>}
      {status === CellStatus.question && <span>❓</span>}
      {status === CellStatus.visible &&
        (value === CellValue.mine ? (
          <span>💣</span>
        ) : (
          value !== 0 && <span className={`score-${value}`}>{value}</span>
        ))}
    </button>
  );
}
