import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Axis, Bar, Grid } from 'tuktuktwo/dist/tuktuktwo';
import Header from '../Header/Header';
import './barChart.css';
import colorSchemes from '../../styles/colorSchemes';

const BarChart = (props) => {
  const maxValue = Math.max(...props.data.map(row => Math.max(Object.values(row.values))));
  const barWeight = 10;
  const barChart = row => (
    <Bar
      barWeight={barWeight}
      color={props.colorScheme[0]}
      maxValue={maxValue}
      value={row.values.volume}
      direction={props.direction}
    />
  );
  const labels = props.data.map(row => row.label);
  return (
    <div styleName="container">
      <Header
        header={props.header}
        description={props.description}
        colorScheme={props.colorScheme}
      />
      <div styleName="columnContainer">
        <div styleName={props.direction === 'horizontal' ? 'axisLeftWide' : 'axisLeftNarrow'}>
          <Axis
            labels={props.direction === 'horizontal' ? labels : []}
            maxValue={props.direction === 'vertical' ? maxValue : null}
            position="left"
          />
        </div>
        <div styleName="rowContainer">
          <div styleName={classNames('barsContainer', { horizontalContainer: props.direction === 'horizontal' })}>
            {props.data.map(row => (
              <div
                key={`bar_${row.label}`}
              >
                {barChart(row)}
              </div>
            ))}
          </div>
          <div styleName="grid">
            <Grid
              labels={labels}
              maxValue={maxValue}
              direction={props.direction}
            />
          </div>
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
};

BarChart.displayName = 'Bar Chart';

BarChart.defaultProps = {
  header: '',
  description: '',
  colorScheme: colorSchemes.colorSchemeDefault.sequential,
  direction: 'horizontal',
};

BarChart.propTypes = {
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  header: PropTypes.string,
};

export default BarChart;
