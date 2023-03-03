import React from "react";

import { CellStatus, CellValue } from "@utils/gameField";

import "./Cell.scss";

interface CellProps {
  row: number;
  col: number;
  value: CellValue;
  status: CellStatus;
}

export default function Cell({ row, col, value, status }: CellProps) {
  return (
    <button className={"Cell"}>
      {status === CellStatus.flaged && <span>🚩</span>}
      {status === CellStatus.visible &&
        (value === CellValue.bomb ? (
          <span>💣</span>
        ) : (
          value !== 0 && <span className={`score-${value}`}>{value}</span>
        ))}
    </button>
  );
}
