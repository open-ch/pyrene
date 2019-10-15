import React from 'react';
import PropTypes from 'prop-types';
import { Popover, SimpleTable } from 'pyrene';
import { Bar, RelativeBar } from 'tuktuktwo';
import Header from '../Header/Header';
import './barChartTable.css';
import colorSchemes from '../../styles/colorSchemes';

function getId(title) {
  return title.trim().toLowerCase();
}

function getValueWithAccessor(row, accessor) {
  return (typeof accessor === 'string' ? row[accessor] : accessor(row));
}

function getProcessedColumnsAndLegend(props, colors, withoutBars) {
  const maxValuePrimary = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const maxValueSecondary = props.columns.secondaryValue ? Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.secondaryValue.accessor))) : maxValuePrimary;
  const maxValue = Math.max(maxValuePrimary, maxValueSecondary);
  const barWeight = 6;
  const barWeightSecondaryComparison = 4;
  const defaultBarChart = row => (
    <div styleName="barContainer">
      <RelativeBar
        barWeight={barWeight}
        colors={colors}
        maxValue={maxValuePrimary}
        value={row.value}
      />
    </div>
  );
  let barChart;
  let legend = [props.columns.primaryValue.title];
  if (props.columns.secondaryValue) legend.push(props.columns.secondaryValue.title);
  switch (props.type) {
    case 'bar':
      barChart = defaultBarChart;
      legend = [];
      break;
    case 'comparison':
      if (props.columns.secondaryValue) {
        barChart = row => ( // eslint-disable-line react/display-name
          <div styleName="comparisonContainer">
            <Bar
              key={getId(`${props.columns.primaryValue.title}_bar_current`)} // eslint-disable-line
              barWeight={barWeight}
              color={colors[0]}
              maxValue={maxValue}
              value={getValueWithAccessor(row, props.columns.primaryValue.accessor)} // eslint-disable-line
            />
            <Bar
              key={getId(`${props.columns.secondaryValue.title}_bar_previous`)} // eslint-disable-line
              barWeight={barWeightSecondaryComparison}
              color={colors[1]}
              maxValue={maxValue}
              value={getValueWithAccessor(row, props.columns.secondaryValue.accessor)} // eslint-disable-line
            />
          </div>
        );
        break;
      } else throw Error('Missing secondary value');
    case 'butterfly':
      if (props.columns.secondaryValue) {
        barChart = defaultBarChart;
        legend = [];
        break;
      } else throw Error('Missing secondary value');
    default:
      throw 'Unknown type';
  }
  const columnLabel = {
    id: getId(props.header),
    accessor: props.columns.label.accessor,
    cellRenderCallback: props.columns.label.linkAccessor ? row => ( // eslint-disable-line react/display-name
      <a
        styleName="labelLink"
        href={getValueWithAccessor(row, props.columns.label.linkAccessor)} // eslint-disable-line
      >
        {row.value}
      </a>
    ) : row => row.value,
    align: 'left',
  };

  const hasColumnSecondaryLabel = !!props.columns.secondaryLabel;
  const columnSecondaryLabel = !hasColumnSecondaryLabel ? {} :
    {
      id: getId(props.columns.secondaryLabel.title),
      accessor: props.columns.secondaryLabel.accessor,
      headerName: props.columns.secondaryLabel.title,
      cellRenderCallback: row => row.value,
      align: 'right',
  };

  const columnPrimaryValue = {
    id: getId(props.columns.primaryValue.title),
    accessor: props.columns.primaryValue.accessor,
    cellRenderCallback: props.columns.primaryValue.formatter ? row => props.columns.primaryValue.formatter(row.value) : null,
    headerName: withoutBars ? props.columns.primaryValue.title : '',
    align: 'right',
    maxWidth: props.columns.primaryValue.maxWidth,
  };
  const columnPrimaryBarChart = {
    id: getId(`${props.columns.primaryValue.title}_bar`),
    accessor: props.columns.primaryValue.accessor,
    cellRenderCallback: barChart,
  };
  const columnSecondaryValue = props.columns.secondaryValue ? {
    id: getId(props.columns.secondaryValue.title),
    accessor: props.columns.secondaryValue.accessor,
    cellRenderCallback: props.columns.secondaryValue.formatter ? row => props.columns.secondaryValue.formatter(row.value) : null,
    headerName: props.columns.secondaryValue.title,
    align: 'right',
    maxWidth: props.columns.secondaryValue.maxWidth,
  } : {};
  let columns;
  switch (props.type) {
    case 'bar':
      columns = [
        columnLabel,
        ...(hasColumnSecondaryLabel ? [columnSecondaryLabel] : []),
        ...(withoutBars ? [] : [{ ...columnPrimaryBarChart, headerName: props.columns.primaryValue.title }]),
        columnPrimaryValue,
        ...(props.columns.secondaryValue ? [columnSecondaryValue] : []),
      ];
      break;
    case 'comparison':
      columns = [
        columnLabel,
        ...(hasColumnSecondaryLabel ? [columnSecondaryLabel] : []),
        { ...columnPrimaryValue, headerName: props.columns.primaryValue.title },
        ...(withoutBars ? [] : [columnPrimaryBarChart]),
        columnSecondaryValue,
      ];
      break;
    case 'butterfly':
      columns = [
        columnLabel,
        ...(hasColumnSecondaryLabel ? [columnSecondaryLabel] : []),
        columnPrimaryValue,
        ...(withoutBars ? [] : [{
          id: getId(`${props.columns.primaryValue.title}_bar_left`),
          headerName: props.columns.primaryValue.title,
          accessor: props.columns.primaryValue.accessor,
          cellRenderCallback: row => ( // eslint-disable-line react/display-name
            <div styleName="barContainer">
              <RelativeBar
                barWeight={barWeight}
                colors={colors}
                maxValue={maxValuePrimary}
                value={row.value} // eslint-disable-line
                mirrored
              />
            </div>
          ),
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
          cellRenderCallback: barChart,
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
      ];
      break;
    default:
      throw 'Unknown type';
  }
  return { columns: columns, legend: legend };
}

/**
 * Bar Chart Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 * The primaryValue is automatically being sorted in descending order and then displayed as a bar chart.
 */
export default class BarChartTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showPopover: false,
    };
  }

   togglePopover = () => {
     this.setState(prevState => ({
       showPopover: !prevState.showPopover,
     }));
   };

   render() {
     const colors = (this.props.type === 'comparison' ? this.props.colorScheme.comparison : this.props.colorScheme.valueGround);
     const columnsAndLegend = getProcessedColumnsAndLegend(this.props, colors);
     const description = this.props.type === 'bar' ? '' : this.props.description;
     const sortedData = this.props.data.sort((a, b) => {
       const sortPrimaryValue = getValueWithAccessor(b, this.props.columns.primaryValue.accessor) - getValueWithAccessor(a, this.props.columns.primaryValue.accessor);
       return this.props.columns.secondaryValue ? sortPrimaryValue || (getValueWithAccessor(b, this.props.columns.secondaryValue.accessor) - getValueWithAccessor(a, this.props.columns.secondaryValue.accessor)) : sortPrimaryValue;
     });
     const displayedRows = this.props.displayedRows < 0 ? this.props.data.length : this.props.displayedRows;
     return (
       <div styleName="container">
         <Header
           header={this.props.header}
           description={description}
           legend={columnsAndLegend.legend}
           colors={colors}
         />
         <div style={{ height: `${(displayedRows + 1) * 32}px` }}>
           <SimpleTable
             columns={columnsAndLegend.columns}
             data={sortedData.slice(0, displayedRows)}
             onRowDoubleClick={this.props.onRowDoubleClick}
           />
         </div>
         {(this.props.data.length > displayedRows) && (
           <div styleName="showMoreLink" onClick={this.togglePopover}>
             {`Show all (${sortedData.length})`}
             {this.state.showPopover && (
               <Popover
                 align="center"
                 children={<div styleName="popOverPlaceholder"></div>} // eslint-disable-line
                 distanceToTarget={-(3 * 32) - 1.5} // to center the popover vertically, so that 3 rows of the popover table are under and 2 rows over the bar chart table, - 1.5 to align borders
                 renderPopoverContent={() => (
                   <div styleName="popOverContainer" style={{ height: `${(displayedRows + 5) * 32 + 32 + 32}px` }}>
                     {/* popover height: (displayedRows + 5 more rows) * 32px + 32px table header + 32px popover header */}
                     <div styleName="popOverHeader">
                       {this.props.header}
                     </div>
                     <div styleName="popOverTable" style={{ height: `${(sortedData.length + 1) * 32}px` }}>
                       <SimpleTable
                         columns={getProcessedColumnsAndLegend(this.props, colors, true).columns}
                         data={sortedData}
                         onRowDoubleClick={this.props.onRowDoubleClick}
                       />
                     </div>
                   </div>
                 )}
                 displayPopover={this.state.showPopover}
                 onClickOutside={this.togglePopover}
               />
             )}
           </div>
         )}

       </div>
     );
   }

}

BarChartTable.displayName = 'Bar Chart Table';

BarChartTable.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  description: '',
  displayedRows: 10,
  onRowDoubleClick: () => {},
  type: 'bar',
};

BarChartTable.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { comparison: [ string ] (required), valueGround: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    comparison: PropTypes.arrayOf(PropTypes.string).isRequired,
    valueGround: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the Table columns.
   * Type: { label: { accessor: string or func (required), linkAccessor: string or func, title: string (required) }, primaryValue: { accessor: string or func (required), formatter: func, maxWidth: string }, secondaryValue: { accessor: string or func (required), formatter: func, maxWidth: string, title: string (required) }}
   */
  columns: PropTypes.shape({
    label: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      linkAccessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
    }),
    secondaryLabel: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      title: PropTypes.string.isRequired,
    }),
    primaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      maxWidth: PropTypes.string,
      title: PropTypes.string.isRequired,
    }).isRequired,
    secondaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      maxWidth: PropTypes.string,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  /**
   * Sets the Table data displayed in the rows. It gets sorted automatically by primaryValue. Type: [ JSON ]
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Sets the description.
   */
  description: PropTypes.string,
  /**
  * Sets the number of displayed rows.
  */
  displayedRows: PropTypes.number,
  /**
   * Sets the header.
   */
  header: PropTypes.string.isRequired,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
  /**
   * Sets the overall style according to the bar chart type.
   */
  type: PropTypes.oneOf(['bar', 'comparison', 'butterfly']),
};
