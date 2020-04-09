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

  getDisplayRows = (dataLength) => {
    if (this.props.displayedRows < 0) {
      return dataLength;
    }
    if (dataLength < this.props.displayedRows) {
      return dataLength;
    }
    return this.props.displayedRows;
  };

  togglePopover = () => {
    this.setState((prevState) => ({
      showPopover: !prevState.showPopover,
    }));
  };

  render() {
    const dataAvailable = this.props.data && this.props.data.length > 0;

    const colors = (this.props.type === 'comparison' ? this.props.colorScheme.comparison : this.props.colorScheme.valueGround);
    const description = this.props.type === 'bar' ? '' : this.props.description;
    const sortedData = dataAvailable && this.props.data.sort((a, b) => {
      const sortPrimaryValue = getValueWithAccessor(b, this.props.columns.primaryValue.accessor) - getValueWithAccessor(a, this.props.columns.primaryValue.accessor);
      return this.props.columns.secondaryValue ? sortPrimaryValue || (getValueWithAccessor(b, this.props.columns.secondaryValue.accessor) - getValueWithAccessor(a, this.props.columns.secondaryValue.accessor)) : sortPrimaryValue;
    });
    const displayedRows = dataAvailable ? this.getDisplayRows(this.props.data.length) : 0;
    const popOverAdditionalRows = 5;
    const rowHeight = 36;
    return (
      <div styleName="container">
        <Header
          title={this.props.title}
          description={description}
          legend={getLegend(this.props.type, this.props.columns, this.props.colorScheme)}
          colors={colors}
        />
        {/* table height: displayedRows + 1 header row + conditional showMoreLink div */}
        <div style={{ height: dataAvailable ? `${displayedRows * rowHeight + rowHeight + (this.props.data.length > displayedRows && this.props.loading ? 26 : 0)}px` : '90px' }}>
          <Responsive>
            {(parent) => (
              <SimpleTable
                actions={this.props.actions}
                columns={getColumns({
                  dataAvailable: dataAvailable,
                  props: this.props,
                  colors: colors,
                  width: parent.width,
                })}
                data={dataAvailable ? sortedData.slice(0, displayedRows) : []}
                onRowDoubleClick={this.props.onRowDoubleClick}
                loading={this.props.loading}
              />
            )}
          </Responsive>
        </div>
        {dataAvailable && (this.props.data.length > displayedRows) && !this.props.loading && (
          <div styleName="showMoreLink" onClick={this.togglePopover}>
            {`Show more (${sortedData.length})`}
            {this.state.showPopover && (
              <Popover
                align="center"
                children={<div styleName="popOverPlaceholder"></div>} // eslint-disable-line
                distanceToTarget={-((popOverAdditionalRows - 2) * rowHeight) - 1.5} // to center the popover vertically, so that 3 rows of the popover table are under and 2 rows over the bar chart table, - 1.5 to align borders
                renderPopoverContent={() => (
                  <div styleName="popOverContainer" style={{ height: `${(displayedRows + popOverAdditionalRows) * rowHeight + rowHeight + rowHeight}px` }}>
                    <Responsive>
                      {(parent) => (
                        <>
                          {/* popover height: (displayedRows + 5 more rows) * 32px + 32px table header + 32px popover header */}
                          <div styleName="popOverHeader">
                            {this.props.title}
                          </div>
                          <div styleName="popOverBody" style={{ height: `${(displayedRows + 5) * 32 + 32}px` }}>
                            <div styleName="tableContainer">
                              <SimpleTable
                                actions={this.props.actions}
                                columns={getColumns({
                                  props: this.props,
                                  colors: colors,
                                  width: parent.width,
                                  simpleMode: true,
                                })}
                                data={sortedData}
                                onRowDoubleClick={this.props.onRowDoubleClick}
                              />
                            </div>
                            {this.props.popoverFooter && (
                              <div styleName="footerContainer">
                                {this.props.popoverFooter}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </Responsive>
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
  actions: [],
  colorScheme: colorSchemes.colorSchemeDefault,
  description: '',
  displayedRows: 10,
  loading: false,
  onRowDoubleClick: () => {},
  popoverFooter: null,
  type: 'bar',
};

BarChartTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })),
  /**
   * Sets the colors of the bar chart. Type: { comparison: [ string ], valueGround: [ string ] }
   */
  colorScheme: PropTypes.shape({
    comparison: PropTypes.arrayOf(PropTypes.string),
    valueGround: PropTypes.arrayOf(PropTypes.string),
  }),
  /**
   * Sets the Table columns.
   * Type: { label: { accessor: string or func (required), linkAccessor: string or func, title: string (required) }, primaryValue: { accessor: string or func (required), dataFormat: func, width: number }, secondaryLabel: { accessor: string or func (required), title: string (required), width: number }, secondaryValue: { accessor: string or func (required), dataFormat: func, title: string (required), width: number }}
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
      onClick: PropTypes.func,
    }),
    primaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      dataFormat: PropTypes.func,
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
      dataFormat: PropTypes.func,
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
   * An additional component attached to the bottom of the popover.
   */
  popoverFooter: PropTypes.node,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
  /**
   * Sets the overall style according to the bar chart type.
   */
  type: PropTypes.oneOf(['bar', 'comparison', 'butterfly']),
};
