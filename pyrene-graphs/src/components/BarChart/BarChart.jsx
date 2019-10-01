import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Axis, Bar, BarStack, Grid, Responsive,
} from 'tuktuktwo/dist/tuktuktwo';
import Header from '../Header/Header';
import './barChart.css';
import colorSchemes from '../../styles/colorSchemes';

const BarChart = (props) => {
  const barWeight = 10;
  const labels = props.data.map(row => row.label);
  return (
    <div styleName="container">
      <Header
        header={props.header}
        description={props.description}
        colors={props.colorScheme.categorical}
        legend={props.legend}
      />
      <div styleName="responsiveContainer">
        <Responsive>
          {(parent) => {
            let maxValue = Math.max(...props.data.map(row => Math.max(...row.values)));
            maxValue = props.direction === 'horizontal' ? maxValue / (parent.width - 102 - 16) * (parent.width - 102) : maxValue / (parent.height - 24 - 16) * (parent.height - 24);
            return (
              <div styleName="columnContainer">
                <div styleName={classNames('axisLeft', { axisLeftWide: props.direction === 'horizontal', axisLeftNarrow: props.direction === 'vertical' })}>
                  <Axis
                    labels={props.direction === 'horizontal' ? labels : []}
                    maxValue={props.direction === 'vertical' ? maxValue : null}
                    position="left"
                  />
                </div>
                <div styleName="rowContainer">
                  <div styleName="grid">
                    <Grid
                      labels={labels}
                      maxValue={maxValue}
                      direction={props.direction}
                    />
                  </div>
                  <div styleName={classNames('barsContainer', { horizontalContainer: props.direction === 'horizontal' })}>
                    {props.legend.length > 1 ? (
                      <BarStack
                        barWeight={barWeight}
                        colors={props.colorScheme.categorical}
                        maxValue={maxValue}
                        keys={props.legend}
                        data={props.data}
                        direction={props.direction}
                      />
                    )
                      : props.data.map(row => (
                        <div
                          key={`bar_${row.label}`}
                        >
                          <Bar
                            barWeight={barWeight}
                            color={props.colorScheme.categorical[0]}
                            maxValue={maxValue}
                            value={row.values[0]}
                            direction={props.direction}
                          />
                        </div>
                      ))
                    }
                    <div styleName="axisBottom">
                      <Axis
                        labels={props.direction === 'vertical' ? labels : []}
                        maxValue={props.direction === 'horizontal' ? maxValue : null}
                        position="bottom"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Responsive>
      </div>
    </div>
  );
};

BarChart.displayName = 'Bar Chart';

BarChart.defaultProps = {
  header: '',
  description: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  direction: 'horizontal',
};

BarChart.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  description: PropTypes.string,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  header: PropTypes.string,
  legend: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BarChart;
