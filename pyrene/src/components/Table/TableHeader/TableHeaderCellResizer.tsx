/* eslint-disable react/prop-types */
import React, {
  FunctionComponent,
  MouseEvent,
  TouchEvent,
} from "react";

import styles from "./TableHeaderCellResizer.module.css";;
import ResizeIcon from '../images/resize.svg'

export interface TableHeaderCellResizerProps {
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  resizableColumn: boolean
}


const TableHeaderCellResizer: FunctionComponent<TableHeaderCellResizerProps> = (
  props
) => props.resizableColumn ? (
  <div
    className={styles.resizer}
    {...props}
  >
    <ResizeIcon/>
  </div>
) : (<></>);

export default TableHeaderCellResizer;
