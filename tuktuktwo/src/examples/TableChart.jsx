import React, { Fragment } from 'react';
import { letterFrequency } from '@vx/mock-data';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { Table } from 'pyrene/dist/pyrene.dev';

/* eslint-disable react/display-name, no-nested-ternary */

// We'll use some mock data from `@vx/mock-data` for this.
const data = letterFrequency;

// Define the graph dimensions and margins
const width = 500;
const height = 500;
const margin = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
};

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = d => d.letter;
const y = d => +d.frequency * 100;

// And then scale the graph by our data
const xScale = scaleBand({
  rangeRound: [0, xMax],
  domain: data.map(x),
  padding: 0.4,
});
const yScale = scaleLinear({
  rangeRound: [yMax, 0],
  domain: [0, Math.max(...data.map(y))],
});

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => value => scale(accessor(value));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

const tableData = [
  {
    name: 'Meredith Carney',
    age: 23,
    friend: {
      name: 'Perry Robinson',
      age: 33,
    },
  },
  {
    name: 'Savage Weeks',
    age: 21,
    friend: {
      name: 'Tammi Reese',
      age: 32,
    },
  },
];

const tableColumns = [{
  id: 'name',
  headerName: 'Name',
  accessor: 'name',
  sortMethod: (a, b) => {
    const lastA = a.charAt(a.length - 1);
    const lastB = b.charAt(b.length - 1);
    if (lastA > lastB) {
      return 1;
    } if (lastA < lastB) {
      return -1;
    }
    return 0;

  },
},
{
  id: 'age',
  headerName: 'Age',
  accessor: 'age',
  resizable: false,
  cellRenderCallback: row => (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--neutral-020)',
      }}
    >
      <div
        style={{
          width: `${((row.value - 20) / 20) * 100}%`,
          height: '100%',
          backgroundColor:
            ((row.value - 20) / 20) * 100 > 66
              ? 'var(--acqua-300)'
              : ((row.value - 20) / 20) * 100 > 33
                ? 'var(--teal-300)'
                : 'var(--red-200)',
          transition: 'all .2s ease-out',
        }}
      />
    </div>
  ),
},
];

export default class TableChart extends React.Component {

  render() {
    return (
      <Fragment>
        <Table data={tableData} columns={tableColumns} keyField='name'/>
        <svg width={width} height={height}>
          {data.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            return (
              <Group key={`bar-${i}`}>
                <Bar
                  x={xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill="#fc2e1c"
                />
              </Group>
            );
          })}
        </svg>
      </Fragment>
    );
  }
}
