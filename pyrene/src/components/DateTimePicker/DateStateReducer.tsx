interface Action {
  type:
  'startDate/changed' |
  'startTime/changed' |
  'endDate/changed' |
  'endTime/changed' |
  'range/changed'
}

export interface State {
  startDate?: string,
  startTime?: string,
  endDate?: string,
  endTime?: string,
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
      case 'startTime/changed': {
        return {
          ...state,
          startTime: action.payload.value,
        };
      }
      case 'endDate/changed': {
        return {
          ...state,
          endDate: action.payload.value,
        };
      }
      case 'endTime/changed': {
        return {
          ...state,
          endTime: action.payload.value,
        };
      }
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
