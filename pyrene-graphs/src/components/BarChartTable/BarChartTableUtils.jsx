import React from 'react';
import { Bar, RelativeBar } from 'tuktuktwo';
import './barChartTable.css';

const getId = d => d.trim().toLowerCase();

export const getValueWithAccessor = (row, accessor) => (typeof accessor === 'string' ? row[accessor] : accessor(row));

const getColumn = ({
  id, accessor, headerName, formatter, align, maxWidth, linkAccessor, cellType, colors, maxValue,
}) => {
  const valueFormatter = formatter || (d => d);
  const barWeightPrimary = 6;
  const barWeightSecondary = 4;
  return {
    id: id.trim().toLowerCase(),
    accessor: accessor,
    headerName: headerName,
    cellRenderCallback: {
      link: linkAccessor ? row => ( // eslint-disable-line react/display-name
        <a
          styleName="labelLink"
          href={getValueWithAccessor(row, linkAccessor)}
        >
          {row.value}
        </a>
      ) : row => valueFormatter(row.value),
      relativeBar: row => ( // eslint-disable-line react/display-name
        <div styleName="barContainer">
          <RelativeBar
            barWeight={barWeightPrimary}
            colors={colors}
            maxValue={maxValue}
            value={row.value}
          />
        </div>
      ),
      default: row => valueFormatter(row.value),
    }[cellType || 'default'],
    align: align,
    maxWidth: maxWidth,
  };
};


export const getProcessedColumnsAndLegend = (props, colors, withoutBars) => {
  const maxValuePrimary = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const maxValueSecondary = props.columns.secondaryValue ? Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.secondaryValue.accessor))) : maxValuePrimary;
  const maxValue = Math.max(maxValuePrimary, maxValueSecondary);
  switch (props.type) {
    case 'bar':
      break;
    case 'comparison':
      if (props.columns.secondaryValue) {
        // barChart = row => ( // eslint-disable-line react/display-name
        //   <div styleName="comparisonContainer">
        //     <Bar
        //       key={getId(`${props.columns.primaryValue.title}_bar_current`)} // eslint-disable-line
        //       barWeight={barWeightPrimary}
        //       color={colors[0]}
        //       maxValue={maxValue}
        //       value={getValueWithAccessor(row, props.columns.primaryValue.accessor)} // eslint-disable-line
        //     />
        //     <Bar
        //       key={getId(`${props.columns.secondaryValue.title}_bar_previous`)} // eslint-disable-line
        //       barWeight={barWeightSecondary}
        //       color={colors[1]}
        //       maxValue={maxValue}
        //       value={getValueWithAccessor(row, props.columns.secondaryValue.accessor)} // eslint-disable-line
        //     />
        //   </div>
        // );
        break;
      } else throw Error('Missing secondary value');
    case 'butterfly':
      if (props.columns.secondaryValue) {
        // barChart = defaultBarChart;
        break;
      } else throw Error('Missing secondary value');
    default:
      throw Error('Unknown type');
  }

  const hasColumnSecondaryLabel = !!props.columns.secondaryLabel;
  const columnSecondaryLabel = !hasColumnSecondaryLabel ? {}
    : {
      id: getId(props.columns.secondaryLabel.title),
      accessor: props.columns.secondaryLabel.accessor,
      headerName: props.columns.secondaryLabel.title,
      cellRenderCallback: row => row.value,
      align: 'right',
    };

  const columnSecondaryValue = props.columns.secondaryValue ? {
    id: getId(props.columns.secondaryValue.title),
    accessor: props.columns.secondaryValue.accessor,
    cellRenderCallback: props.columns.secondaryValue.formatter ? row => props.columns.secondaryValue.formatter(row.value) : null,
    headerName: props.columns.secondaryValue.title,
    align: 'right',
    maxWidth: props.columns.secondaryValue.maxWidth,
  } : {};
  switch (props.type) {
    case 'bar':
      return {
        columns: [
          getColumn({
            id: props.header,
            accessor: props.columns.label.accessor,
            linkAccessor: props.columns.label.linkAccessor,
            align: 'left',
            cellType: 'link',
          }),
          ...(hasColumnSecondaryLabel ? [columnSecondaryLabel] : []),
          ...(withoutBars ? [] : [getColumn({
            id: `${props.columns.primaryValue.title}_bar`,
            accessor: props.columns.primaryValue.accessor,
            headerName: props.columns.primaryValue.title,
            cellType: 'relativeBar',
            colors: colors,
            maxValue: maxValue,
          })]),
          getColumn({
            id: props.columns.primaryValue.title,
            accessor: props.columns.primaryValue.accessor,
            formatter: props.columns.primaryValue.formatter,
            headerName: withoutBars ? props.columns.primaryValue.title : '',
            align: 'right',
            maxWidth: props.columns.primaryValue.maxWidth,
          }),
          ...(props.columns.secondaryValue ? [columnSecondaryValue] : []),
        ],
        legend: [],
      };
    case 'comparison':
      return {
        columns: [
          getColumn({
            id: props.header,
            accessor: props.columns.label.accessor,
            linkAccessor: props.columns.label.linkAccessor,
            align: 'left',
            cellType: 'link',
            colors: colors,
            maxValue: maxValue,
          }),
          ...(hasColumnSecondaryLabel ? [columnSecondaryLabel] : []),
          getColumn({
            id: props.columns.primaryValue.title,
            accessor: props.columns.primaryValue.accessor,
            formatter: props.columns.primaryValue.formatter,
            headerName: withoutBars ? props.columns.primaryValue.title : '',
            align: 'right',
            maxWidth: props.columns.primaryValue.maxWidth,
          }),
          // ...(withoutBars ? [] : [columnPrimaryBarChart]),
          columnSecondaryValue,
        ],
        legend: [props.columns.primaryValue.title, props.columns.secondaryValue ? props.columns.secondaryValue.title : null],
      };
    case 'butterfly':
      return {
        columns: [
          getColumn({
            id: props.header,
            accessor: props.columns.label.accessor,
            linkAccessor: props.columns.label.linkAccessor,
            align: 'left',
            cellType: 'link',
            colors: colors,
            maxValue: maxValue,
          }),
          ...(hasColumnSecondaryLabel ? [columnSecondaryLabel] : []),
          getColumn({
            id: props.columns.primaryValue.title,
            accessor: props.columns.primaryValue.accessor,
            formatter: props.columns.primaryValue.formatter,
            headerName: withoutBars ? props.columns.primaryValue.title : '',
            align: 'right',
            maxWidth: props.columns.primaryValue.maxWidth,
          }),
          ...(withoutBars ? [] : [{
            id: getId(`${props.columns.primaryValue.title}_bar_left`),
            headerName: props.columns.primaryValue.title,
            accessor: props.columns.primaryValue.accessor,
            // cellRenderCallback: row => ( // eslint-disable-line react/display-name
            //   <div styleName="barContainer">
            //     <RelativeBar
            //       barWeight={barWeightPrimary}
            //       colors={colors}
            //       maxValue={maxValuePrimary}
            //       value={row.value} // eslint-disable-line
            //       mirrored
            //     />
            //   </div>
            // ),
            align: 'right',
          }]),
          ...(withoutBars ? [] : [{
            id: getId(`${props.columns.primaryValue.title}_vertical_line`),
            accessor: props.columns.primaryValue.accessor,
            cellRenderCallback: () => ( // eslint-disable-line react/display-name
              <div styleName="verticalLine" />
            ),
            align: 'center',
            maxWidth: '1px',
          }]),
          ...(withoutBars ? [] : [{
            id: getId(`${props.columns.secondaryValue.title}_bar_right`),
            headerName: props.columns.secondaryValue.title,
            accessor: props.columns.secondaryValue.accessor,
            // cellRenderCallback: barChart,
            align: 'left',
          }]),
          {
            id: getId(props.columns.secondaryValue.title),
            accessor: props.columns.secondaryValue.accessor,
            cellRenderCallback: props.columns.secondaryValue.formatter ? row => props.columns.secondaryValue.formatter(row.value) : null,
            headerName: withoutBars ? props.columns.secondaryValue.title : '',
            align: 'right',
            maxWidth: props.columns.secondaryValue.maxWidth,
          },
        ],
        legend: [],
      };
    default:
      throw Error('Unknown type');
  }
};
