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
  mine,
}
export type Cell = {
  value: number;
  status: CellStatus;
};

export const gameField = (): Cell[][] => {
  let cells: Cell[][] = [];
  const rowsLength = 16;
  const collumsLength = 16;
  for (let i = 0; i < rowsLength; i++) {
    cells.push([]);
    for (let j = 0; j < collumsLength; j++) {
      cells[i].push({ value: CellValue.none, status: CellStatus.open });
    }
  }

  let countBomb = 0;
  while (countBomb < 40) {
    let randomRow = Math.floor(Math.random() * rowsLength);
    let randomCol = Math.floor(Math.random() * collumsLength);
    const cell = cells[randomRow][randomCol];
    if (cell.value !== CellValue.mine) {
      cells = cells.map((row, indexRow) =>
        row.map((cell, indexCol) => {
          if (indexRow === randomRow && indexCol === randomCol) {
            return { ...cell, value: CellValue.mine };
          }
          return cell;
        })
      );
      countBomb++;
    }
  }

  for (let i = 0; i < rowsLength; i++) {
    for (let j = 0; j < collumsLength; j++) {
      const current = cells[i][j];
      if (current.value === CellValue.mine) continue;
      let countBomb = 0;
      // проверка ячеек вокруг текущей
      const topLeftPosition = i > 0 && j > 0 ? cells[i - 1][j - 1] : null;
      const topCenterPosition = i > 0 ? cells[i - 1][j] : null;
      const topRightPosition =
        i > 0 && j < collumsLength ? cells[i - 1][j + 1] : null;
      const rightPosition = j < collumsLength - 1 ? cells[i][j + 1] : null;
      const leftPosition = j > 0 ? cells[i][j - 1] : null;
      const bottomLeftPosition =
        i < rowsLength - 1 && j > 0 ? cells[i + 1][j - 1] : null;
      const bottomCentralPosition = i < rowsLength - 1 ? cells[i + 1][j] : null;
      const bottomRightPosition =
        i < rowsLength - 1 && j < collumsLength - 1
          ? cells[i + 1][j + 1]
          : null;

      if (topLeftPosition?.value === CellValue.mine) countBomb++;
      if (topCenterPosition?.value === CellValue.mine) countBomb++;
      if (topRightPosition?.value === CellValue.mine) countBomb++;
      if (rightPosition?.value === CellValue.mine) countBomb++;
      if (leftPosition?.value === CellValue.mine) countBomb++;
      if (bottomLeftPosition?.value === CellValue.mine) countBomb++;
      if (bottomCentralPosition?.value === CellValue.mine) countBomb++;
      if (bottomRightPosition?.value === CellValue.mine) countBomb++;

      // меняем ячейку на количество бомб вокруг
      if (countBomb > 0) {
        cells[i][j] = {
          ...current,
          value: countBomb,
        };
      }
    }
  }

  return cells;
};
