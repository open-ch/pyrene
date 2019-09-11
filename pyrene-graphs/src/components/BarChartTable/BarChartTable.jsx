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

function getProcessedColumnsAndLegend(props, colorScheme, withoutBars) {
  const maxValuePrimary = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const maxValueSecondary = props.columns.secondaryValue ? Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.secondaryValue.accessor))) : maxValuePrimary;
  const maxValue = Math.max(maxValuePrimary, maxValueSecondary);
  const barWeight = 6;
  const barWeightSecondaryComparison = 4;
  const defaultBarChart = row => (
    <RelativeBar
      barWeight={barWeight}
      colorScheme={colorScheme}
      maxValue={maxValuePrimary}
      value={row.value}
    />
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
      barChart = row => ( // eslint-disable-line react/display-name
        <div styleName="comparisonContainer">
          <Bar
            key={getId(`${props.columns.primaryValue.title}_bar_current`)} // eslint-disable-line
            barWeight={barWeight}
            color={colorScheme[0]}
            maxValue={maxValue}
            value={getValueWithAccessor(row, props.columns.primaryValue.accessor)} // eslint-disable-line
          />
          <Bar
            key={getId(`${props.columns.secondaryValue.title}_bar_previous`)} // eslint-disable-line
            barWeight={barWeightSecondaryComparison}
            color={colorScheme[1]}
            maxValue={maxValue}
            value={getValueWithAccessor(row, props.columns.secondaryValue.accessor)} // eslint-disable-line
          />
        </div>
      );
      break;
    case 'butterfly':
      legend = [];
      break;
    default:
      barChart = defaultBarChart;
      break;
  }
  const columnLabel = {
    id: getId(props.columns.label.title),
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
  const columnPrimaryValue = {
    id: getId(props.columns.primaryValue.title),
    accessor: props.columns.primaryValue.accessor,
    cellRenderCallback: props.columns.primaryValue.formatter ? row => props.columns.primaryValue.formatter(row.value) : null,
    headerName: withoutBars ? props.columns.primaryValue.title : '',
    align: 'right',
    maxWidth: '90px',
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
    maxWidth: '90px',
  } : {};
  let columns;
  const columnsTable = [
    columnLabel,
    ...(withoutBars ? [] : [{ ...columnPrimaryBarChart, headerName: props.columns.primaryValue.title }]),
    columnPrimaryValue,
  ];
  if (props.columns.secondaryValue) columnsTable.push(columnSecondaryValue);
  switch (props.type) {
    case 'bar':
      columns = columnsTable;
      break;
    case 'comparison':
      columns = [
        columnLabel,
        { ...columnPrimaryValue, headerName: props.columns.primaryValue.title },
        ...(withoutBars ? [] : [columnPrimaryBarChart]),
        columnSecondaryValue,
      ];
      break;
    case 'butterfly':
      columns = [
        columnLabel,
        columnPrimaryValue,
        ...(withoutBars ? [] : [{
          id: getId(`${props.columns.primaryValue.title}_bar_left`),
          headerName: props.columns.primaryValue.title + props.columns.secondaryValue.title,
          accessor: props.columns.primaryValue.accessor,
          cellRenderCallback: row => ( // eslint-disable-line react/display-name
            <div styleName="butterflyContainer">
              <div styleName="butterflyBar">
                <RelativeBar
                  barWeight={barWeight}
                  colorScheme={colorScheme}
                  maxValue={maxValuePrimary}
                  value={getValueWithAccessor(row, props.columns.primaryValue.accessor)} // eslint-disable-line
                  mirrored
                />
              </div>
              <div styleName="verticalLine" />
              <div styleName="butterflyBar">
                <RelativeBar
                  barWeight={barWeight}
                  colorScheme={colorScheme}
                  maxValue={maxValueSecondary}
                  value={getValueWithAccessor(row, props.columns.secondaryValue.accessor)} // eslint-disable-line
                />
              </div>
            </div>
          ),
          align: 'center',
        }]),
        {
          id: getId(props.columns.secondaryValue.title),
          accessor: props.columns.secondaryValue.accessor,
          cellRenderCallback: props.columns.secondaryValue.formatter ? row => props.columns.secondaryValue.formatter(row.value) : null,
          headerName: withoutBars ? props.columns.secondaryValue.title : '',
          align: 'right',
          maxWidth: '90px',
        },
      ];
      break;
    default:
      columns = columnsTable;
      break;
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
     let colorScheme = this.props.colorScheme;
     if (!(colorScheme.length > 0)) colorScheme = (this.props.type === 'comparison' ? colorSchemes.comparison : colorSchemes.valueGround);
     const columnsAndLegend = getProcessedColumnsAndLegend(this.props, colorScheme);
     const description = this.props.type === 'bar' ? '' : this.props.description;
     const sortedData = this.props.data.sort((a, b) => (getValueWithAccessor(b, this.props.columns.primaryValue.accessor) - getValueWithAccessor(a, this.props.columns.primaryValue.accessor)));
     return (
       <div styleName="container">
         <Header
           header={this.props.header}
           description={description}
           legend={columnsAndLegend.legend}
           colorScheme={colorScheme}
         />
         <div style={{ height: `${(this.props.maxRows + 1) * 32}px` }}>
           <SimpleTable
             columns={columnsAndLegend.columns}
             data={sortedData.slice(0, this.props.maxRows)}
             onRowDoubleClick={this.props.onRowDoubleClick}
           />
         </div>
         {(this.props.data.length > 10) && (this.props.maxRows >= 10) && (
           <div styleName="showMoreLink" onClick={this.togglePopover}>
             {'Show more'}
             {this.state.showPopover && (
               <Popover
                 align="center"
                 children={<div styleName="popOverPlaceholder"></div>} // eslint-disable-line
                 distanceToTarget={description !== '' ? 32 - 148 : 48 - 148} // to center the popover vertically, 592px / 4 = 148px + Header of either 32px or 48px, depending if description is empty or not
                 renderPopoverContent={() => (
                   <div styleName="popOver">
                     <div styleName="popOverHeader">
                       {this.props.header}
                     </div>
                     <div styleName="popOverTable">
                       <SimpleTable
                         columns={getProcessedColumnsAndLegend(this.props, colorScheme, true).columns}
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
  colorScheme: [],
  description: '',
  maxRows: 10,
  onRowDoubleClick: () => {},
  type: 'bar',
};

BarChartTable.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: [ string ]
   */
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  /**
   * Sets the Table columns.
   * Type: { label: { accessor: string or func (required), linkAccessor: string or func, title: string (required) }, primaryValue: { accessor: string or func (required), formatter: func, title: string (required) }, secondaryValue: { accessor: string or func (required), formatter: func, title: string (required) }}
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
      title: PropTypes.string.isRequired,
    }),
    primaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      title: PropTypes.string.isRequired,
    }).isRequired,
    secondaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
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
   * Sets the header.
   */
  header: PropTypes.string.isRequired,
  /**
  * Sets the maximum number of table rows.
  */
  maxRows: PropTypes.number,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
  /**
   * Sets the overall style according to the bar chart type.
   */
  type: PropTypes.oneOf(['bar', 'comparison', 'butterfly']),
};
