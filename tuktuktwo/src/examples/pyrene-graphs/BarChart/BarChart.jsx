import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../../tuktwo/Bar/Bar';
import RelativeBar from '../../tuktwo/Bar/RelativeBar';
import Title from '../Title/Title';
import getBy from '../../pyrene/SimpleTable/TableUtils';

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
      {props.data.map((d) => {
        const value = typeof graphKey.accessor === 'string' ? getBy(d, graphKey.accessor) : graphKey.accessor(d);
        return (
          props.relative ? (
            <RelativeBar
              barHeight={props.barHeight}
              colorScheme={props.colorScheme}
              maxValue={maxValue}
              value={value}
            />
          ) : (
            <Bar
              barHeight={props.barHeight}
              color={props.colorScheme.primary}
              maxValue={maxValue}
              value={value}
            />
          )
        );
      })}

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
  barHeight: 18,
  relative: false,
  legend: [],
};

BarChart.propTypes = {
  barHeight: PropTypes.number, // eslint-disable-line
  colorScheme: PropTypes.object, // eslint-disable-line
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  keys: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  legend: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  relative: PropTypes.bool,// eslint-disable-line
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default BarChart;
