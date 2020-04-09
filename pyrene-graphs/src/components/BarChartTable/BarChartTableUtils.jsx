import React from 'react';
import {
  Bar,
  RelativeBar,
  scaleLinear,
} from 'tuktuktwo';
import './barChartTable.css';

const getId = (d) => d.trim().toLowerCase();

export const getValueWithAccessor = (row, accessor) => (typeof accessor === 'string' ? row[accessor] : accessor(row));

const getValueScale = (direction, width, maxValue) => (
  scaleLinear(0, maxValue, 0, Math.max(0, width), direction)
);

const getColumn = ({
  id, accessor, accessorSecondary, headerName, dataFormat = (d) => d, align, width, linkAccessor, onClick, cellType, colors, maxValue, labelAccessor,
}) => {
  const barWeightPrimary = 6;
  const barWeightSecondary = 4;
  const comparisonMargin = 6;
  const bottomBorder = 1;
  const svgHeight = barWeightPrimary + bottomBorder;
  const svgHeightComparison = barWeightPrimary + barWeightSecondary + comparisonMargin + bottomBorder;
  const direction = 'horizontal';
  return {
    id: getId(id),
    accessor: accessor,
    headerName: headerName,
    align: align,
    width: width > 0 ? width : 0,
    cellRenderCallback: {
      link: (row) => {
        if (linkAccessor || onClick) {
          return (
            <a
              styleName="labelLink"
              href={onClick ? '#' : getValueWithAccessor(row, linkAccessor)}
              onClick={(e) => {
                if (onClick) {
                  e.preventDefault();
                  onClick(row);
                }
              }}
            >
              {row.value}
            </a>
          );
        }
        if (row.value !== null) return dataFormat(row.value);
        return row.value;
      },
      relativeBar: (row) => ( // eslint-disable-line react/display-name
        <svg width="100%" height={svgHeight}>
          {width > 0 && (
            <RelativeBar
              barWeight={barWeightPrimary}
              colors={colors}
              direction={direction}
              maxValue={maxValue}
              scale={getValueScale(direction, width, maxValue)}
              value={getValueWithAccessor(row, accessor)}
            />
          )}
        </svg>
      ),
      relativeBarMirrored: (row) => ( // eslint-disable-line react/display-name
        <svg width="100%" height={svgHeight}>
          {width > 0 && (
            <RelativeBar
              barWeight={barWeightPrimary}
              colors={colors}
              direction={direction}
              maxValue={maxValue}
              scale={getValueScale(direction, width, maxValue)}
              value={getValueWithAccessor(row, accessor)}
              mirrored
            />
          )}
        </svg>
      ),
      verticalLine: () => ( // eslint-disable-line react/display-name
        <div styleName="verticalLine" />
      ),
      comparisonBars: (row) => { // eslint-disable-line react/display-name
        const scale = getValueScale(direction, width, maxValue);
        return (
          <svg width="100%" height={svgHeightComparison}>
            {width > 0 && (
              <g>
                <Bar
                  key={`${getId(getValueWithAccessor(row, labelAccessor))}_bar_current`}
                  barWeight={barWeightPrimary}
                  color={colors[0]}
                  direction={direction}
                  scale={scale}
                  value={getValueWithAccessor(row, accessor)}
                />
                <Bar
                  key={`${getId(getValueWithAccessor(row, labelAccessor))}_bar_previous`}
                  barWeight={barWeightSecondary}
                  color={colors[1]}
                  direction={direction}
                  scale={scale}
                  top={barWeightPrimary + comparisonMargin}
                  value={getValueWithAccessor(row, accessorSecondary)}
                />
              </g>
            )}
          </svg>
        );
      },
      default: (row) => (row.value !== null ? dataFormat(row.value) : row.value),
    }[cellType || 'default'],
  };
};

export const getLegend = (type, columns, colorScheme) => {
  switch (type) {
    case 'comparison':
      return [{
        color: colorScheme.comparison[0],
        label: columns.primaryValue.title,
      }, {
        color: colorScheme.comparison[1],
        label: columns.secondaryValue.title,
      }];
    default:
      return [];
  }
};

export const getColumns = ({
  dataAvailable,
  props,
  colors,
  width,
  simpleMode = false,
}) => {
  const maxValuePrimary = dataAvailable && Math.max(...props.data.map((dataRow) => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const maxValueSecondary = dataAvailable && props.columns.secondaryValue ? Math.max(...props.data.map((dataRow) => getValueWithAccessor(dataRow, props.columns.secondaryValue.accessor))) : maxValuePrimary;
  const maxValue = Math.max(maxValuePrimary, maxValueSecondary);
  const hasColumnSecondaryLabel = !!props.columns.secondaryLabel;
  const hasColumnSecondaryValue = !!props.columns.secondaryValue;
  const margin = 16;
  const marginLeftRight = 8;
  const valueColumnWidthDefault = 64;
  const secondaryLabelColumnWidthDefault = 32;
  const labelResponsiveWidthRatio = 0.6;
  const barResponsiveWidthRatio = 1 - labelResponsiveWidthRatio;

  const primaryValueColumnWidth = props.columns.primaryValue.width ? props.columns.primaryValue.width : valueColumnWidthDefault;
  const secondaryValueColumnWidth = (hasColumnSecondaryValue && (props.columns.secondaryValue.width ? props.columns.secondaryValue.width : valueColumnWidthDefault)) || valueColumnWidthDefault;
  const secondaryLabelColumnWidth = hasColumnSecondaryLabel && (props.columns.secondaryLabel.width ? props.columns.secondaryLabel.width : secondaryLabelColumnWidthDefault);
  const valueColumnWidthDouble = primaryValueColumnWidth + margin + secondaryValueColumnWidth;

  switch (props.type) {
    case 'bar': {
      // responsive width = 100% - value columns on the right - all margins = label and bar columns
      // marginLeft {LABEL1 + MARGIN + LABEL2} margin BAR margin value1 margin value2 marginRight
      const responsiveWidth = width - marginLeftRight - margin - margin - primaryValueColumnWidth - margin - secondaryValueColumnWidth - marginLeftRight;
      const secondaryLabelWidth = hasColumnSecondaryLabel ? secondaryLabelColumnWidth + margin : 0;
      return [
        getColumn({
          id: props.title,
          accessor: props.columns.label.accessor,
          linkAccessor: props.columns.label.linkAccessor,
          onClick: props.columns.label.onClick,
          align: 'left',
          cellType: 'link',
          width: responsiveWidth * labelResponsiveWidthRatio - secondaryLabelWidth,
        }),
        ...(hasColumnSecondaryLabel ? [getColumn({
          id: props.columns.secondaryLabel.title,
          accessor: props.columns.secondaryLabel.accessor,
          headerName: props.columns.secondaryLabel.title,
          align: 'right',
          width: secondaryLabelColumnWidth,
        })] : []),
        ...(simpleMode ? [] : [getColumn({
          id: `${props.columns.primaryValue.title}_bar`,
          accessor: props.columns.primaryValue.accessor,
          headerName: props.columns.primaryValue.title,
          cellType: 'relativeBar',
          colors: colors,
          maxValue: maxValue,
          width: responsiveWidth * barResponsiveWidthRatio + (hasColumnSecondaryValue ? 0 : secondaryValueColumnWidth + margin),
        })]),
        getColumn({
          id: props.columns.primaryValue.title,
          accessor: props.columns.primaryValue.accessor,
          dataFormat: props.columns.primaryValue.dataFormat,
          headerName: simpleMode ? props.columns.primaryValue.title : '',
          align: 'right',
          width: primaryValueColumnWidth,
        }),
        ...(hasColumnSecondaryValue ? [getColumn({
          id: props.columns.secondaryValue.title,
          accessor: props.columns.secondaryValue.accessor,
          dataFormat: props.columns.secondaryValue.dataFormat,
          headerName: props.columns.secondaryValue.title,
          align: 'right',
          width: secondaryValueColumnWidth,
        })] : []),
      ];
    }
    case 'comparison':
      if (props.columns.secondaryValue) {
        // responsive width = 100% - value columns on the right - all margins = label and bar columns
        // marginLeft LABEL1 margin BAR margin value1 margin value2 marginRight
        const responsiveWidth = width - marginLeftRight - margin - margin - primaryValueColumnWidth - margin - secondaryValueColumnWidth - marginLeftRight;
        return [
          getColumn({
            id: props.title,
            accessor: props.columns.label.accessor,
            linkAccessor: props.columns.label.linkAccessor,
            onClick: props.columns.label.onClick,
            align: 'left',
            cellType: 'link',
            width: responsiveWidth * labelResponsiveWidthRatio,
          }),
          ...(simpleMode ? [] : [getColumn({
            id: `${props.columns.primaryValue.title}_bar`,
            accessor: props.columns.primaryValue.accessor,
            accessorSecondary: props.columns.secondaryValue.accessor,
            cellType: 'comparisonBars',
            colors: colors,
            maxValue: maxValue,
            labelAccessor: props.columns.label.accessor,
            width: responsiveWidth * barResponsiveWidthRatio,
          })]),
          getColumn({
            id: props.columns.primaryValue.title,
            accessor: props.columns.primaryValue.accessor,
            dataFormat: props.columns.primaryValue.dataFormat,
            headerName: props.columns.primaryValue.title,
            align: 'right',
            width: primaryValueColumnWidth,
          }),
          getColumn({
            id: props.columns.secondaryValue.title,
            accessor: props.columns.secondaryValue.accessor,
            dataFormat: props.columns.secondaryValue.dataFormat,
            headerName: props.columns.secondaryValue.title,
            align: 'right',
            width: secondaryValueColumnWidth,
          }),
        ];
      } throw Error('Missing secondary value');
    case 'butterfly':
      if (props.columns.secondaryValue) {
        const verticalLineWidth = 1;
        // responsive width = (100% - value columns - all margins) / 3 = label and bars column width
        // marginLeft {LABEL + MARGIN + VALUE1} margin BAR margin value2 marginRight
        // value2 is twice as big to align with bar charts
        const responsiveWidthLabel = ((width - marginLeftRight - margin - margin - valueColumnWidthDouble - marginLeftRight) * labelResponsiveWidthRatio) - margin - primaryValueColumnWidth;
        // marginLeft responsiveWidthLabel margin BAR1 margin verticalLine margin BAR2 margin value2 marginRight
        const responsiveWidthBar = (width - marginLeftRight - responsiveWidthLabel - margin - margin - verticalLineWidth - margin - margin - valueColumnWidthDouble - marginLeftRight) / 2;
        return [
          getColumn({
            id: props.title,
            accessor: props.columns.label.accessor,
            linkAccessor: props.columns.label.linkAccessor,
            onClick: props.columns.label.onClick,
            align: 'left',
            cellType: 'link',
            width: responsiveWidthLabel,
          }),
          getColumn({
            id: props.columns.primaryValue.title,
            accessor: props.columns.primaryValue.accessor,
            dataFormat: props.columns.primaryValue.dataFormat,
            headerName: simpleMode ? props.columns.primaryValue.title : '',
            align: 'right',
            width: primaryValueColumnWidth,
          }),
          ...(simpleMode ? [] : [getColumn({
            id: `${props.columns.primaryValue.title}_bar_left`,
            accessor: props.columns.primaryValue.accessor,
            headerName: props.columns.primaryValue.title,
            align: 'right',
            cellType: 'relativeBarMirrored',
            colors: colors,
            maxValue: maxValue,
            width: responsiveWidthBar,
          })]),
          ...(simpleMode ? [] : [getColumn({
            id: `${props.columns.primaryValue.title}_vertical_line`,
            accessor: props.columns.primaryValue.accessor,
            align: 'center',
            cellType: 'verticalLine',
            width: verticalLineWidth,
          })]),
          ...(simpleMode ? [] : [getColumn({
            id: `${props.columns.secondaryValue.title}_bar_right`,
            headerName: props.columns.secondaryValue.title,
            accessor: props.columns.secondaryValue.accessor,
            align: 'left',
            colors: colors,
            maxValue: maxValue,
            cellType: 'relativeBar',
            width: responsiveWidthBar,
          })]),
          getColumn({
            id: props.columns.secondaryValue.title,
            accessor: props.columns.secondaryValue.accessor,
            dataFormat: props.columns.secondaryValue.dataFormat,
            headerName: simpleMode ? props.columns.secondaryValue.title : '',
            align: 'right',
            width: secondaryValueColumnWidth,
          }),
        ];
      } throw Error('Missing secondary value');
    default:
      throw Error('Unknown type');
  }
};
