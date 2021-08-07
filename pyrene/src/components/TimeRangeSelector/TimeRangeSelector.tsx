import React, { FunctionComponent, useReducer } from 'react';
import {
  addMilliseconds, subMilliseconds, getTime, differenceInMilliseconds,
} from 'date-fns';
import clsx from 'clsx';
import PresetTimeRanges from './PresetTimeRanges/PresetTimeRanges';
import TimeRangeNavigationBar from './TimeRangeNavigationBar/TimeRangeNavigationBar';
import PRESET_TIME_RANGES from './TimeRangeSelectorDefaultProps';
import styles from './timeRangeSelector.css';

/**
 * TimeRangeSelectors are used to provide a certain timerange within a lower and upper limit and change it via timesteps.
 *
 * Default time ranges are defined as follows:
 * 24 hours
 * 7 days
 * 30 days
 * 1 year
 */

export interface TimeRangeSelectorPros {
  /**
   * Whether or not the component is disabled
   * Type: boolean
   */
  disabled?: boolean,
  /**
   * The start value of the range in epoch milliseconds
   * Type: number (required)
   */
  from: number,
  /**
   * The oldest queryable starting time point, in epoch milliseconds
   * Type: number (required)
   */
  lowerBound: number,
  /**
   * Callback function passed by parent page (usually a GET request to fetch new data)
   * Type: function(from: number, to: number) (required)
   */
  onChange: (newFrom: number, newTo: number) => void,
  /**
   * The preset time ranges to display as preset buttons
   * Type: [{ id: string (required) the id of the preset, label: string (required) label of the preset button displayed to the user, durationInMs: number (required) the duration of the timerange in epoch ms }]
   */
  presetTimeRanges?: Array<{
    durationInMs: number,
    id: string,
    label: string,
  }>,
  /**
   * Function called if there is some element to be rendered on the rightmost side
   * Type: function
   */
  renderRightSection?: Function,
  /**
   * The timezone that the range selector should use to display the time
   * Type: string (required)
   */
  timezone: string,
  /**
   * The end value of the range to in epoch milliseconds
   * Type: number (required)
   */
  to: number,
  /**
   * The latest queryable ending time point, in epoch milliseconds
   * Type: number
   */
  upperBound: number,
}

interface State {
  durationInMs: number,
  preserveDuration: boolean
}

interface Action {
  type: 'interacting' | 'changing'
}

interface InteractingAction extends Action {
  type: 'interacting',
  payload: {
    durationInMs: number,
  }
}

interface ChangingAction extends Action {
  type: 'changing',
  payload: {
    newFrom: number,
    newTo: number,
    onChange: TimeRangeSelectorPros['onChange']
  }
}

const reducer = (state: State, action: InteractingAction | ChangingAction): State => {
  switch (action.type) {
    case 'interacting':
      return {
        ...state,
        durationInMs: action.payload.durationInMs,
      };
    case 'changing':
      const {newFrom, newTo, onChange} = action.payload;
      onChange(newFrom, newTo);
      return { ...state };
    default: {
      return { ...state };
    }
  }
};

const TimeRangeSelector: FunctionComponent<TimeRangeSelectorPros> = ({
  disabled = false,
  from,
  lowerBound,
  onChange,
  presetTimeRanges = PRESET_TIME_RANGES,
  renderRightSection = () => {},
  timezone,
  to,
  upperBound,
}: TimeRangeSelectorPros) => {
  // calculate the duration of the timerange minus rounding errors
  const [state, dispatch] = useReducer(reducer, { durationInMs: (to - from) - ((to - from) % 10), preserveDuration: false });

  /*
  static getDerivedStateFromProps(props, state) {
    if (props.to - props.from !== state.durationInMs && !state.preserveDuration) {
      const newDuration = (props.to - props.from) - ((props.to - props.from) % 10);
      return { durationInMs: newDuration };
    }
    if (state.preserveDuration) {
      return { preserveDuration: false };
    }
    return null;
  }
  */


  
  /**
   * Updates the from/to limits, the upperbound and the current preset settings when a preset is selected
   * @param newFrom                 the new from value in epoch milliseconds
   * @param newTo                   the new to value in epoch milliseconds
   * @param newUpperBound           the new value of the upperbound synced accordingly
   * @param durationInMs            the duration of the timerange based on the selected preset
   * @private
   */
  const _onPresetTimeRangeSelected = (newFrom: number, newTo: number, newUpperBound: number, durationInMs: number) => {
    dispatch({
      type: 'interacting',
      payload: {
        durationInMs
      }
    });
    dispatch({
      type: 'changing',
      payload: {
        newFrom,
        newTo,
        onChange,
      }
    });
  };

  const _onNavigateBack = () => {
    const fromDiff = subMilliseconds(from, state.durationInMs);
    const toDiff = subMilliseconds(to, state.durationInMs);

    const newFrom = Math.max(getTime(fromDiff), lowerBound);

    // Keep the selected timespan duration if we reach a bound
    const newTo = differenceInMilliseconds(toDiff, newFrom) < state.durationInMs
      ? addMilliseconds(newFrom, state.durationInMs)
      : toDiff;
    return onChange(newFrom, Math.min(getTime(newTo), upperBound));
  };

  const _onNavigateForward = () => {
    const fromDiff = addMilliseconds(from, state.durationInMs);
    const toDiff = addMilliseconds(to, state.durationInMs);

    const newTo = Math.min(getTime(toDiff), upperBound);

    // Keep the selected timespan duration if we reach a bound
    const newFrom = differenceInMilliseconds(newTo, fromDiff) < state.durationInMs
      ? addMilliseconds(newTo, state.durationInMs)
      : fromDiff;
    return onChange(Math.max(getTime(newFrom), lowerBound), newTo);
  };

  /**
   * Checks whether the component has a preset timerange selected when navigating; if yes, we should preserve the current durationInMs.
   * @private
   */
  const _preserveDurationForNavigation = (navigateCallback: () => void) => {
    const foundTimeRangeType = presetTimeRanges.find((preset) => preset.durationInMs === state.durationInMs);
    if (foundTimeRangeType) {
      this.setState({ preserveDuration: true }, () => {
        navigateCallback();
      });
    } else {
      navigateCallback();
    }
  };

  let currentTimeRangeType = presetTimeRanges.find((preset) => preset.durationInMs === state.durationInMs); // Try to find if the timerange matches an initial preset
  currentTimeRangeType = currentTimeRangeType ? currentTimeRangeType.id : ''; // If we found a match, then let's use the id of the preset, otherwise no default preset has to be selected

  return (
    <div className={clsx(styles.timeRangeSelector, { [styles.disabled]: disabled })}>
      <div className={styles['timeRangeSelector--left']}>
        <PresetTimeRanges
          disabled={disabled}
          lowerBound={lowerBound}
          onInteract={_onPresetTimeRangeSelected}
          currentTimeRangeType={currentTimeRangeType}
          presetTimeRanges={presetTimeRanges}
          upperBound={upperBound}
          timezone={timezone}
        />
      </div>
      <div className={styles['timeRangeSelector--center']}>
        <TimeRangeNavigationBar
          disabled={disabled}
          to={to}
          from={from}
          lowerBound={lowerBound}
          onNavigateBack={() => _preserveDurationForNavigation(_onNavigateBack)}
          onNavigateForward={() => _preserveDurationForNavigation(_onNavigateForward)}
          upperBound={upperBound}
          timezone={timezone}
        />
      </div>
      <div className={clsx(styles['timeRangeSelector--right'], { [styles.disabled]: disabled })}>
        {renderRightSection()}
      </div>
    </div>
  );
};

TimeRangeSelector.displayName = 'Time Range Selector';

export default TimeRangeSelector;
