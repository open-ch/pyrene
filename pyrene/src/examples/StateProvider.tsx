import React from 'react';

interface Props<P, S> {
  initState: S;
  children: (state: S, setState: React.Component['setState']) => React.ReactElement<P>;
}

export type GenerateProps<P, S> = (stateProvider : {
  state: S,
  setState: React.Component['setState'],
}) => P

/**
 * StateProvider is a react component acting as a container passing its state as props to sub components.
 *
 * StateProvider is needed to demo a component which expects state from parent. For example in Storybook.
 */
class StateProvider<P, S> extends React.Component<Props<P, S>, S> {

  constructor(props: Props<P, S>) {
    super(props);
    this.state = props.initState;
  }

  render(){
    const setState = this.setState.bind(this);
    return this.props.children(this.state, setState);
  }

}

export default StateProvider;
