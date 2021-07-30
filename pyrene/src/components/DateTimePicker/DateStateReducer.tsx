interface Action {
  type:
  'startDate/changed' |
  'startDate/invalid' |
  'startTime/changed' |
  'startTime/invalid' |
  'endDate/changed' |
  'endDate/invalid' |
  'endTime/changed' |
  'endTime/invalid' |
  'range/changed'
}

export interface State {
  startDate?: string,
  startDateInvalid?: boolean,
  startTime?: string,
  startTimeInvalid?: boolean,
  endDate?: string,
  endDateInvalid?: boolean,
  endTime?: string,
  endTimeInvalid?: boolean,
  range?: [number, number] | null
}

export interface StartDateChangedAction extends Action {
  type: 'startDate/changed',
  payload: {
    value: string
  }
}

export interface StartTimeChangedAction extends Action {
  type: 'startTime/changed',
  payload: {
    value: string
  }
}

export interface EndDateChangedAction extends Action {
  type: 'endDate/changed',
  payload: {
    value: string
  }
}

export interface EndTimeChangedAction extends Action {
  type: 'endTime/changed',
  payload: {
    value: string
  }
}

export interface InvalidStartTimeAction extends Action {
  type: 'startTime/invalid',
  payload: {
    value: boolean
  }
}

export interface InvalidStartDateAction extends Action {
  type: 'startDate/invalid',
  payload: {
    value: boolean
  }
}

export interface InvalidEndTimeAction extends Action {
  type: 'endTime/invalid',
  payload: {
    value: boolean
  }
}

export interface InvalidEndDateAction extends Action {
  type: 'endDate/invalid',
  payload: {
    value: boolean
  }
}

export interface RangeDateChangeAction extends Action {
  type: 'range/changed',
  payload: {
    value: [number, number] | null
  }
}


export type DateActions = StartDateChangedAction |
StartTimeChangedAction |
EndDateChangedAction |
EndTimeChangedAction |
InvalidStartTimeAction |
InvalidStartDateAction |
InvalidEndTimeAction |
InvalidEndDateAction |
RangeDateChangeAction |
null;

export default function dateRangeInputsReducer(state: State, action: DateActions): State {
  if (action) {
    switch (action.type) {
      case 'startDate/changed': {
        return {
          ...state,
          startDate: action.payload.value,
        };
      }
      case 'startDate/invalid': {
        return {
          ...state,
          startDateInvalid: action.payload.value,
        };
      }
      case 'startTime/changed': {
        return {
          ...state,
          startTime: action.payload.value,
        };
      }
      case 'startTime/invalid': {
        return {
          ...state,
          startTimeInvalid: action.payload.value,
        };
      }
      case 'endDate/changed': {
        return {
          ...state,
          endDate: action.payload.value,
        };
      }
      case 'endDate/invalid': {
        return {
          ...state,
          endDateInvalid: action.payload.value,
        };
      }
      case 'endTime/changed': {
        return {
          ...state,
          endTime: action.payload.value,
        };
      }
      case 'endTime/invalid': {
        return {
          ...state,
          endTimeInvalid: action.payload.value,
        };
      }
      default:
        return state;
    }
  }
  return state;
}


export function dateRangeReducer(state: State, action: DateActions): State {
  if (action) {
    switch (action.type) {
      case 'range/changed': {
        return {
          ...state,
          range: action.payload.value,
        };
      }
      default:
        return state;
    }
  }
  return state;
}
