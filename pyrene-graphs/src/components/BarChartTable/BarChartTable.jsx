import React from 'react';
import PropTypes from 'prop-types';
import { Popover, SimpleTable } from 'pyrene';
import { Responsive } from 'tuktuktwo';
import Header from '../Header/Header';
import { getValueWithAccessor, getColumns, getLegend } from './BarChartTableUtils';
import './barChartTable.css';
import colorSchemes from '../../styles/colorSchemes';

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
     this.setState((prevState) => ({
       showPopover: !prevState.showPopover,
     }));
   };

   render() {
     const colors = (this.props.type === 'comparison' ? this.props.colorScheme.comparison : this.props.colorScheme.valueGround);
     const description = this.props.type === 'bar' ? '' : this.props.description;
     const sortedData = this.props.data.sort((a, b) => {
       const sortPrimaryValue = getValueWithAccessor(b, this.props.columns.primaryValue.accessor) - getValueWithAccessor(a, this.props.columns.primaryValue.accessor);
       return this.props.columns.secondaryValue ? sortPrimaryValue || (getValueWithAccessor(b, this.props.columns.secondaryValue.accessor) - getValueWithAccessor(a, this.props.columns.secondaryValue.accessor)) : sortPrimaryValue;
     });
     const displayedRows = this.props.displayedRows < 0 ? this.props.data.length : this.props.displayedRows;
     return (
       <div styleName="container">
         <Header
           title={this.props.title}
           description={description}
           legend={getLegend(this.props.type, this.props.columns)}
           colors={colors}
         />
         {/* table height: displayedRows + 1 header row + conditional showMoreLink div */}
         <div style={{ height: `${displayedRows * 32 + 32 + (this.props.data.length > displayedRows && this.props.loading ? 26 : 0)}px` }}>
           <Responsive>
             {(parent) => (
               <SimpleTable
                 columns={getColumns({ props: this.props, colors: colors, width: parent.width })}
                 data={sortedData.slice(0, displayedRows)}
                 onRowDoubleClick={this.props.onRowDoubleClick}
                 loading={this.props.loading}
               />
             )}
           </Responsive>
         </div>
         {(this.props.data.length > displayedRows) && !this.props.loading && (
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
                       {this.props.title}
                     </div>
                     <div styleName="popOverTable" style={{ height: `${(displayedRows + 5) * 32 + 32}px` }}>
                       <SimpleTable
                         columns={getColumns({ props: this.props, colors: colors })}
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
  loading: false,
  onRowDoubleClick: () => {},
  type: 'bar',
};

BarChartTable.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { comparison: [ string ], valueGround: [ string ] }
   */
  colorScheme: PropTypes.shape({
    comparison: PropTypes.arrayOf(PropTypes.string),
    valueGround: PropTypes.arrayOf(PropTypes.string),
  }),
  /**
   * Sets the Table columns.
   * Type: { label: { accessor: string or func (required), linkAccessor: string or func, title: string (required) }, primaryValue: { accessor: string or func (required), formatter: func, width: number }, secondaryLabel: { accessor: string or func (required), title: string (required), width: number }, secondaryValue: { accessor: string or func (required), formatter: func, title: string (required), width: number }}
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
    primaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      title: PropTypes.string.isRequired,
      width: PropTypes.number,
    }).isRequired,
    secondaryLabel: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      title: PropTypes.string.isRequired,
      width: PropTypes.number,
    }),
    secondaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      title: PropTypes.string.isRequired,
      width: PropTypes.number,
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
  * If set, a loader is shown.
  */
  loading: PropTypes.bool,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
  /**
   * Sets the overall style according to the bar chart type.
   */
  type: PropTypes.oneOf(['bar', 'comparison', 'butterfly']),
};
