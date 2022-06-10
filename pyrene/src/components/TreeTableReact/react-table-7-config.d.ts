import {
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
} from 'react-table';

declare module 'react-table-7' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
      UseResizeColumnsOptions<D>,
      UseRowSelectOptions<D>,
      Record<string, any> {}

  export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseExpandedHooks<D>,
      UseRowSelectHooks<D> {}

  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseExpandedInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      toggleAllRowsExpanded<D>,
      isAllRowsExpanded<D> {}

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseExpandedState<D>,
      UseResizeColumnsState<D> {}

  export type CustomColumn = {
    initiallyHidden?: boolean;
    cellStyle?: CSSProperties;
    headerStyle?: CSSProperties;
    isVisible?: boolean;
  };

  export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseResizeColumnsColumnOptions<D>,
      getResizerProps<D>,
      CustomColumn {}

  export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseResizeColumnsColumnProps<D> {}

  export interface Cell<D extends Record<string, unknown> = Record<string, unknown>, V = any>
    extends UseRowStateCellProps<D> {}

  export type ExtendedRow = Row & {
    depth: number;
    children?: ExtendedRow[];
    subRows?: ExtendedRow<D>[];
    isExpanded?: boolean;
    toggleRowExpanded?: (id: string, value?: boolean | undefined) => void;
  };

  export type CustomRow = {
    canResize: boolean;
    canExpand: boolean;
    depth: number;
    children?: ExtendedRow<D>[];
    subRows?: ExtendedRow<D>[];
    isExpanded?: boolean;
  };

  export interface Row<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseExpandedRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D>,
      getToggleRowSelectedProps<D>,
      CustomRow {}
}
