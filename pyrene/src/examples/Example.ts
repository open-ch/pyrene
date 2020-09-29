export type StateProvider = {
  state: {
    value: any;
  }
  setState: ({ value }: {value: any}) => void;
};

type AugmentedProps<T> = {
  [K in keyof T]: T[K] | ((stateProvider: StateProvider) => T[K])
};

export interface Example<ExampleProps> {
  props?:AugmentedProps<ExampleProps>;
  examples?: { props: AugmentedProps<ExampleProps>, description: string }[];
  category?: string;
}
