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
const rowsLength = 16;
const collumsLength = 16;

export const gameField = (): Cell[][] => {
  let cells: Cell[][] = [];
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
      const {
        topLeftPosition,
        topCenterPosition,
        topRightPosition,
        rightPosition,
        leftPosition,
        bottomCentralPosition,
        bottomLeftPosition,
        bottomRightPosition,
      } = checkCellsAroundCurrent(cells, i, j);

      if (topLeftPosition?.value === CellValue.mine) countBomb++;
      if (topCenterPosition?.value === CellValue.mine) countBomb++;
      if (topRightPosition?.value === CellValue.mine) countBomb++;
      if (rightPosition?.value === CellValue.mine) countBomb++;
      if (leftPosition?.value === CellValue.mine) countBomb++;
      if (bottomLeftPosition?.value === CellValue.mine) countBomb++;
      if (bottomCentralPosition?.value === CellValue.mine) countBomb++;
      if (bottomRightPosition?.value === CellValue.mine) countBomb++;

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

const checkCellsAroundCurrent = (cells: Cell[][], row: number, col: number) => {
  const topLeftPosition = row > 0 && col > 0 ? cells[row - 1][col - 1] : null;
  const topCenterPosition = row > 0 ? cells[row - 1][col] : null;
  const topRightPosition =
    row > 0 && col < collumsLength ? cells[row - 1][col + 1] : null;
  const rightPosition = col < collumsLength - 1 ? cells[row][col + 1] : null;
  const leftPosition = col > 0 ? cells[row][col - 1] : null;
  const bottomLeftPosition =
    row < rowsLength - 1 && col > 0 ? cells[row + 1][col - 1] : null;
  const bottomCentralPosition =
    row < rowsLength - 1 ? cells[row + 1][col] : null;
  const bottomRightPosition =
    row < rowsLength - 1 && col < collumsLength - 1
      ? cells[row + 1][col + 1]
      : null;
  return {
    topLeftPosition,
    topCenterPosition,
    topRightPosition,
    leftPosition,
    rightPosition,
    bottomLeftPosition,
    bottomCentralPosition,
    bottomRightPosition,
  };
};

export const openCellsWithoutMine = (
  cells: Cell[][],
  row: number,
  col: number
): Cell[][] => {
  const current = cells[row][col];
  const {
    topLeftPosition,
    topCenterPosition,
    topRightPosition,
    rightPosition,
    leftPosition,
    bottomCentralPosition,
    bottomLeftPosition,
    bottomRightPosition,
  } = checkCellsAroundCurrent(cells, row, col);
  if (
    current.status === CellStatus.flaged ||
    current.status === CellStatus.question ||
    current.status === CellStatus.visible
  ) {
    return cells;
  }
  let newCells = cells.slice();
  newCells[row][col].status = CellStatus.visible;
  if (
    topLeftPosition?.status === CellStatus.open &&
    topLeftPosition.value !== CellValue.mine
  ) {
    if (topLeftPosition.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row - 1, col - 1);
    } else {
      newCells[row - 1][col - 1].status = CellStatus.visible;
    }
  }
  if (
    topCenterPosition?.status === CellStatus.open &&
    topCenterPosition.value !== CellValue.mine
  ) {
    if (topCenterPosition.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row - 1, col);
    } else {
      newCells[row - 1][col].status = CellStatus.visible;
    }
  }
  if (
    topRightPosition?.status === CellStatus.open &&
    topRightPosition.value !== CellValue.mine
  ) {
    if (topRightPosition.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row - 1, col + 1);
    } else {
      newCells[row - 1][col + 1].status = CellStatus.visible;
    }
  }
  if (
    rightPosition?.status === CellStatus.open &&
    rightPosition.value !== CellValue.mine
  ) {
    if (rightPosition.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row, col + 1);
    } else {
      newCells[row][col + 1].status = CellStatus.visible;
    }
  }
  if (
    leftPosition?.status === CellStatus.open &&
    leftPosition.value !== CellValue.mine
  ) {
    if (leftPosition.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row, col - 1);
    } else {
      newCells[row][col - 1].status = CellStatus.visible;
    }
  }
  if (
    bottomLeftPosition?.status === CellStatus.open &&
    bottomLeftPosition.value !== CellValue.mine
  ) {
    if (bottomLeftPosition.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row + 1, col - 1);
    } else {
      newCells[row + 1][col - 1].status = CellStatus.visible;
    }
  }
  if (
    bottomCentralPosition?.status === CellStatus.open &&
    bottomCentralPosition.value !== CellValue.mine
  ) {
    if (bottomCentralPosition.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row + 1, col);
    } else {
      newCells[row + 1][col].status = CellStatus.visible;
    }
  }
  if (
    bottomRightPosition?.status === CellStatus.open &&
    bottomRightPosition.value !== CellValue.mine
  ) {
    if (bottomRightPosition.value === CellValue.none) {
      newCells = openCellsWithoutMine(newCells, row + 1, col + 1);
    } else {
      newCells[row + 1][col + 1].status = CellStatus.visible;
    }
  }
  return newCells;
};

export const checkWin = (
  cells: Cell[][],
  row: number,
  col: number
): boolean => {
  let won = false;
  for (let i = 0; i < rowsLength; i++) {
    for (let j = 0; j < collumsLength; j++) {
      const current = cells[i][j];
      if (
        current.value !== CellValue.mine &&
        current.status === CellStatus.open
      ) {
        won = true;
        break;
      }
    }
  }
  return won;
};
