import React from 'react';
import { Bar, RelativeBar, Responsive } from 'tuktuktwo';
import './barChartTable.css';

const getId = d => d.trim().toLowerCase();

export const getValueWithAccessor = (row, accessor) => (typeof accessor === 'string' ? row[accessor] : accessor(row));

const getColumn = ({
  id, accessor, accessorSecondary, headerName, formatter = d => d, align, maxWidth, linkAccessor, cellType, colors, maxValue, labelAccessor,
}) => {
  const barWeightPrimary = 6;
  const barWeightSecondary = 4;
  const comparisonMargin = 6;
  return {
    id: getId(id),
    accessor: accessor,
    headerName: headerName,
    align: align,
    maxWidth: maxWidth,
    cellRenderCallback: {
      link: linkAccessor ? row => ( // eslint-disable-line react/display-name
        <a
          styleName="labelLink"
          href={getValueWithAccessor(row, linkAccessor)}
        >
          {row.value}
        </a>
      ) : row => formatter(row.value),
      relativeBar: row => ( // eslint-disable-line react/display-name
        <Responsive>
          {parent => (
            <svg width={parent.width} height={barWeightPrimary}>
              <RelativeBar
                barWeight={barWeightPrimary}
                colors={colors}
                maxValue={maxValue}
                value={row.value}
                parentSize={parent}
              />
            </svg>
          )}
        </Responsive>
      ),
      relativeBarMirrored: row => ( // eslint-disable-line react/display-name
        <Responsive>
          {parent => (
            <svg width={parent.width} height={barWeightPrimary}>
              <RelativeBar
                barWeight={barWeightPrimary}
                colors={colors}
                maxValue={maxValue}
                value={row.value}
                parentSize={parent}
                mirrored
              />
            </svg>
          )}
        </Responsive>
      ),
      verticalLine: () => ( // eslint-disable-line react/display-name
        <div styleName="verticalLine" />
      ),
      comparisonBars: row => ( // eslint-disable-line react/display-name
        <Responsive>
          {parent => (
            <svg width={parent.width} height={barWeightPrimary + comparisonMargin + barWeightSecondary}>
              <Bar
                key={`${getId(getValueWithAccessor(row, labelAccessor))}_bar_current`} // eslint-disable-line
                barWeight={barWeightPrimary}
                color={colors[0]}
                maxValue={maxValue}
                value={getValueWithAccessor(row, accessor)} // eslint-disable-line
                parentSize={parent}
              />
              <Bar
                key={`${getId(getValueWithAccessor(row, labelAccessor))}_bar_previous`} // eslint-disable-line
                barWeight={barWeightSecondary}
                color={colors[1]}
                maxValue={maxValue}
                value={getValueWithAccessor(row, accessorSecondary)} // eslint-disable-line
                parentSize={parent}
                top={barWeightPrimary + comparisonMargin}
              />
            </svg>
          )}
        </Responsive>
      ),
      default: row => formatter(row.value),
    }[cellType || 'default'],
  };
};


export const getProcessedColumnsAndLegend = ({ props, colors, withoutBars }) => {
  const maxValuePrimary = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const maxValueSecondary = props.columns.secondaryValue ? Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.secondaryValue.accessor))) : maxValuePrimary;
  const maxValue = Math.max(maxValuePrimary, maxValueSecondary);
  const hasColumnSecondaryLabel = !!props.columns.secondaryLabel;

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
          ...(hasColumnSecondaryLabel ? [getColumn({
            id: props.columns.secondaryLabel.title,
            accessor: props.columns.secondaryLabel.accessor,
            headerName: props.columns.secondaryLabel.title,
            align: 'right',
          })] : []),
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
          ...(props.columns.secondaryValue ? [getColumn({
            id: props.columns.secondaryValue.title,
            accessor: props.columns.secondaryValue.accessor,
            formatter: props.columns.secondaryValue.formatter,
            headerName: props.columns.secondaryValue.title,
            align: 'right',
            maxWidth: props.columns.secondaryValue.maxWidth,
          })] : []),
        ],
      };
    case 'comparison':
      if (props.columns.secondaryValue) {
        return {
          columns: [
            getColumn({
              id: props.header,
              accessor: props.columns.label.accessor,
              linkAccessor: props.columns.label.linkAccessor,
              align: 'left',
              cellType: 'link',
            }),
            ...(hasColumnSecondaryLabel ? [getColumn({
              id: props.columns.secondaryLabel.title,
              accessor: props.columns.secondaryLabel.accessor,
              headerName: props.columns.secondaryLabel.title,
              align: 'right',
            })] : []),
            getColumn({
              id: props.columns.primaryValue.title,
              accessor: props.columns.primaryValue.accessor,
              formatter: props.columns.primaryValue.formatter,
              headerName: props.columns.primaryValue.title,
              align: 'right',
              maxWidth: props.columns.primaryValue.maxWidth,
            }),
            ...(withoutBars ? [] : [getColumn({
              id: `${props.columns.primaryValue.title}_bar`,
              accessor: props.columns.primaryValue.accessor,
              accessorSecondary: props.columns.secondaryValue.accessor,
              cellType: 'comparisonBars',
              colors: colors,
              maxValue: maxValue,
              labelAccessor: props.columns.label.accessor,
            })]),
            getColumn({
              id: props.columns.secondaryValue.title,
              accessor: props.columns.secondaryValue.accessor,
              formatter: props.columns.secondaryValue.formatter,
              headerName: props.columns.secondaryValue.title,
              align: 'right',
              maxWidth: props.columns.secondaryValue.maxWidth,
            }),
          ],
          legend: [props.columns.primaryValue.title, props.columns.secondaryValue.title],
        };
      } throw Error('Missing secondary value');
    case 'butterfly':
      if (props.columns.secondaryValue) {
        return {
          columns: [
            getColumn({
              id: props.header,
              accessor: props.columns.label.accessor,
              linkAccessor: props.columns.label.linkAccessor,
              align: 'left',
              cellType: 'link',
            }),
            ...(hasColumnSecondaryLabel ? [getColumn({
              id: props.columns.secondaryLabel.title,
              accessor: props.columns.secondaryLabel.accessor,
              headerName: props.columns.secondaryLabel.title,
              align: 'right',
            })] : []),
            getColumn({
              id: props.columns.primaryValue.title,
              accessor: props.columns.primaryValue.accessor,
              formatter: props.columns.primaryValue.formatter,
              headerName: withoutBars ? props.columns.primaryValue.title : '',
              align: 'right',
              maxWidth: props.columns.primaryValue.maxWidth,
            }),
            ...(withoutBars ? [] : [getColumn({
              id: `${props.columns.primaryValue.title}_bar_left`,
              accessor: props.columns.primaryValue.accessor,
              headerName: props.columns.primaryValue.title,
              align: 'right',
              cellType: 'relativeBarMirrored',
              colors: colors,
              maxValue: maxValue,
            })]),
            ...(withoutBars ? [] : [getColumn({
              id: `${props.columns.primaryValue.title}_vertical_line`,
              accessor: props.columns.primaryValue.accessor,
              align: 'center',
              maxWidth: '1px',
              cellType: 'verticalLine',
            })]),
            ...(withoutBars ? [] : [getColumn({
              id: `${props.columns.secondaryValue.title}_bar_right`,
              headerName: props.columns.secondaryValue.title,
              accessor: props.columns.secondaryValue.accessor,
              align: 'left',
              colors: colors,
              maxValue: maxValue,
              cellType: 'relativeBar',
            })]),
            getColumn({
              id: props.columns.secondaryValue.title,
              accessor: props.columns.secondaryValue.accessor,
              formatter: props.columns.secondaryValue.formatter,
              headerName: withoutBars ? props.columns.secondaryValue.title : '',
              align: 'right',
              maxWidth: props.columns.secondaryValue.maxWidth,
            }),
          ],
        };
      } throw Error('Missing secondary value');
    default:
      throw Error('Unknown type');
  }
};
