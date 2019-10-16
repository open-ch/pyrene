export const checkZoomInBound = (from, to, minZoomRange) => {
  const boundedTimeRange = {
    from: from,
    to: to,
  };
  if (to - from < minZoomRange) {
    const timeRangeOverflow = minZoomRange - (to - from);
    const fromCompensation = Math.round(timeRangeOverflow / 2);
    boundedTimeRange.from = from - fromCompensation;
    boundedTimeRange.to = to + (timeRangeOverflow - fromCompensation);
  }
  return boundedTimeRange;
};

export const minZoomRangeReached = props => props.to - props.from === props.minZoomRange;

export const zoomBoundReached = props => !(props.from > props.lowerBound && props.to < props.upperBound);
