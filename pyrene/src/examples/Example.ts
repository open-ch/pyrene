export type StateProvider<S> = {
  state: S;
  // Shamelessly copied from React's typings of setState
  setState<K extends keyof S>(
    state: ((prevState: Readonly<S>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
  ): void;
};

type AugmentedProps<T, State> = {
  [K in keyof T]: ((stateProvider: StateProvider<State>) => T[K]) | T[K];
};

export interface Example<ExampleProps, State = void> {
  props?:AugmentedProps<ExampleProps, State>;
  examples?: { props: AugmentedProps<ExampleProps, State>, description?: string }[];
  category?: string;

}
