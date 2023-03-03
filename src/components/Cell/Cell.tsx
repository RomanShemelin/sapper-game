import React from "react";

import { CellStatus, CellValue } from "@utils/gameField";

import styles from "./Cell.module.scss";

interface CellProps {
  row: number;
  col: number;
  value: CellValue;
  status: CellStatus;
}

export default function Cell({ row, col, value, status }: CellProps) {
  return (
    <button className={styles.Cell}>
      {status === CellStatus.flaged && <span>🚩</span>}
      {status === CellStatus.visible && value === CellValue.bomb && (
        <span>💣</span>
      )}
    </button>
  );
}
