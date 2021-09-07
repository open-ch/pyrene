export type Row = Record<string, any>;

export interface Action {
  label: string,
  onClick: (row: Row) => void,
}
