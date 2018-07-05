import React from 'react';
import PropTypes from 'prop-types';

import './container.css';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
      lastProps: {
        expanded: props.expanded,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.lastProps.expanded !== nextProps.expanded) {
      return {
        expanded: nextProps.expanded,
        lastProps: {
          expanded: nextProps.expanded,
        },
      };
    }
    // No State Change
    return null;
  }

  toggleCollapse = () => {
    if (this.props.collapsible) {
      this.setState((prevState, props) => ({
          expanded: !prevState.expanded,
        }),
        () => this.props.onChange(this.state.expanded)
      );
    }
  };


  render() {
    return (
      <div styleName={'container'}>
        <div styleName={'header'} onClick={this.toggleCollapse}>
          <span styleName={'title'}> {this.props.title}</span>
          <span className={'icon-collapsDown'} styleName={'collapsArrow'} />
        </div>
        <div styleName={'content'}>
        {this.props.children}
        </div>
      </div>
    );
  }
}


Container.displayName = 'Container';

Container.defaultProps = {
  expanded: false,
  onChange: () => null,
  collapsible: false,
};

Container.propTypes = {
  /**
   * React private content prop
   */
  children: PropTypes.node.isRequired,
  /**
   * collapsible
   */
  collapsible: PropTypes.bool,
  /**
   * Whether or not to display the specified children
   */
  expanded: PropTypes.bool,
  /**
   * Event handler.
   */
  onChange: PropTypes.func,
  /**
   * Displayed label when collapsed
   */
  title: PropTypes.string.isRequired,
};
