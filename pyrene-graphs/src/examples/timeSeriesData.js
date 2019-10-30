import moment from 'moment';

const genData = () => {
  const dataSeries = {
    label: 'Volume',
    data: [],
  };

  const timeFrame = moment.duration({ hours: 1 }).valueOf();
  const from = moment('2019-10-01 00:00').valueOf();

  for (let i = 0; i < 60; i += 1) {
    dataSeries.data.push([from + i * timeFrame, Math.random() * 10000 + 1]);
  }

  return dataSeries;
};

/* eslint-disable import/prefer-default-export */
export const downloadedVolumes = genData();
