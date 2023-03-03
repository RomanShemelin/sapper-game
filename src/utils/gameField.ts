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
  const rowsLength = 16;
  const collumsLength = 16;
  for (let i = 0; i < rowsLength; i++) {
    cells.push([]);
    for (let j = 0; j < collumsLength; j++) {
      cells[i].push({ value: CellValue.none, status: CellStatus.visible });
    }
  }

  let countBomb = 0;
  while (countBomb < 40) {
    let randomRow = Math.floor(Math.random() * rowsLength);
    let randomCol = Math.floor(Math.random() * collumsLength);
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

  for (let i = 0; i < rowsLength; i++) {
    for (let j = 0; j < collumsLength; j++) {
      const current = cells[i][j];
      if (current.value === CellValue.bomb) continue;
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

      if (topLeftPosition?.value === CellValue.bomb) countBomb++;
      if (topCenterPosition?.value === CellValue.bomb) countBomb++;
      if (topRightPosition?.value === CellValue.bomb) countBomb++;
      if (rightPosition?.value === CellValue.bomb) countBomb++;
      if (leftPosition?.value === CellValue.bomb) countBomb++;
      if (bottomLeftPosition?.value === CellValue.bomb) countBomb++;
      if (bottomCentralPosition?.value === CellValue.bomb) countBomb++;
      if (bottomRightPosition?.value === CellValue.bomb) countBomb++;

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
