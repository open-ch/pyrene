import { Example, StateProvider } from '../../../examples/Example';
import { RangeSelectorProps } from './RangeSelector';

export interface State {
  value?: [number, number] | null
}

const RangeSelector: Example<RangeSelectorProps, State> = {
  props: {
    labels: ['Start', 'End'],
    onChange: (stateProvider: StateProvider<State>) => (value?: [number, number] | null) => {
      stateProvider.setState({ value });
      // console.log(value);
    },
    timeStamps: (stateProvider) => (stateProvider.state.value ? stateProvider.state.value : undefined),
  },

  examples: [
    {
      props: {
        dateOnly: true,
        minDateTime: 946684740000,
        maxDateTime: 1809631860000,
        onChange: (stateProvider: StateProvider<State>) => (value?: [number, number] | null) => { stateProvider.setState({ value }); },
        timeStamps: (stateProvider) => (stateProvider.state.value ? stateProvider.state.value : undefined),
      },
      description: `Maximum date: ${new Date(1809631860000).toString()},  Minimum date: ${new Date(946684740000).toString()}`,
    },
  ],
};
RangeSelector.category = 'Form';

export default RangeSelector;
