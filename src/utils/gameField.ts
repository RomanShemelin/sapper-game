export enum CellStatus {
  visible,
  open,
  flaged,
  question,
}
export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}
export type Cell = {
  value: number;
  status: CellStatus;
};

export const gameField = (): Cell[][] => {
  let cells: Cell[][] = [];
  const rows = 16;
  const col = 16;
  for (let i = 0; i < rows; i++) {
    cells.push([]);
    for (let j = 0; j < col; j++) {
      cells[i].push({ value: CellValue.none, status: CellStatus.visible });
    }
  }

  let countBomb = 0;
  while (countBomb < 40) {
    let randomRow = Math.floor(Math.random() * rows);
    let randomCol = Math.floor(Math.random() * col);
    const cell = cells[randomRow][randomCol];
    if (cell.value !== CellValue.bomb) {
      cells = cells.map((row, indexRow) =>
        row.map((cell, indexCol) => {
          if (indexRow === randomRow && indexCol === randomCol) {
            return { ...cell, value: CellValue.bomb };
          }
          return cell;
        })
      );
      countBomb++;
    }
  }

  return cells;
};
