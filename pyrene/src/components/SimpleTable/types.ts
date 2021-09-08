export interface Action <R>{
  label: string,
  onClick: (row: R) => void,
}


export type ExtendsRow<R> = R & {
  value?: string | number;
};
