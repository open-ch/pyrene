import React from 'react';

interface RenderPropsReturnValue<P> {
  component: React.ComponentType<P>,
  props: P,
}

interface Props<P, S> {
  initState: S;
  children: (state: S, setState: React.Component['setState']) => RenderPropsReturnValue<P>;
}

/**
 * StateProvider is a react component acting as a container passing its state as props to other components.
 *
 * StateProvider is needed to demo a component which needs state from parent. For example in Storybook.
 */
class StateProvider<P, S> extends React.Component<Props<P, S>, S> {

  constructor(props: Props<P, S>) {
    super(props);
    this.state = props.initState;
  }

  render() {
    const setState = this.setState.bind(this);
    const { component: Component, props } = this.props.children(this.state, setState);
    return <Component {...props} />;
  }
}

export default StateProvider;
