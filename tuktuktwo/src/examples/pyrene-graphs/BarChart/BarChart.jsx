import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Bar from '../../tuktwo/Bar/Bar';
import RelativeBar from '../../tuktwo/Bar/RelativeBar';
import Title from '../Title/Title';
import Axis from '../../tuktwo/Axis/Axis';
import getBy from '../../pyrene/SimpleTable/TableUtils';
import './barChart.css';

const BarChart = (props) => {
  const graphKey = props.keys.filter(key => key.graph)[0];
  const maxValue = Math.max(...props.data.map(d => (typeof graphKey.accessor === 'string' ? getBy(d, graphKey.accessor) : graphKey.accessor(d))));
  return (
    <div>
      <Title
        title={props.title}
        subtitle={props.subtitle}
        legend={props.legend}
        colorScheme={props.colorScheme}
      />
      <div styleName={classNames({ verticalContainer: props.direction === 'vertical' })}>
        {props.data.map((d) => {
          const value = typeof graphKey.accessor === 'string' ? getBy(d, graphKey.accessor) : graphKey.accessor(d);
          return (
            props.relative ? (
              <RelativeBar
                barWeight={props.barWeight}
                colorScheme={props.colorScheme}
                maxValue={maxValue}
                value={value}
                direction={props.direction}
              />
            ) : (
              <Bar
                barWeight={props.barWeight}
                color={props.colorScheme.primary}
                maxValue={maxValue}
                value={value}
                direction={props.direction}
              />
            )
          );
        })}
      </div>
      {props.direction === 'vertical' && <Axis />}
    </div>
  );
};

BarChart.displayName = 'Bar Table';

BarChart.defaultProps = {
  title: '',
  subtitle: '',
  colorScheme: {
    primary: 'blue',
    secondary: 'lightblue',
  },
  barWeight: 18,
  relative: false,
  legend: [],
  direction: 'horizontal',
};

BarChart.propTypes = {
  barWeight: PropTypes.number, // eslint-disable-line
  colorScheme: PropTypes.object, // eslint-disable-line
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  direction: PropTypes.string,
  keys: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  legend: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  relative: PropTypes.bool,// eslint-disable-line
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default BarChart;
