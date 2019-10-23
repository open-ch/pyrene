import moment from 'moment';

const _genData = () => {
  const dataSeries = [];
  const timeFrame = moment.duration({ hours: 1 }).valueOf();
  const from = moment('2019-10-01 00:00').valueOf();

  for (let i = 0; i < 98; i++) {
    dataSeries.push([from + i * timeFrame, Math.random() * 10 + 1]);
  }

  return dataSeries;
};

/* eslint-disable import/prefer-default-export */
export const downloadedVolumes = _genData();
