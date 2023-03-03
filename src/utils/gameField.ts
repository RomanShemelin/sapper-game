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

export const getCells = () => {
  const cells: Cell[][] = [];
  const rows = 16;
  const col = 16;
  for (let i = 0; i < rows; i++) {
    cells.push([]);
    for (let j = 0; j < col; j++) {
      cells[i].push({ value: CellValue.none, status: CellStatus.visible });
    }
  }
};
