import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './collapsible.css';

export default class Collapsible extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
      lastProps: {
        collapsed: props.collapsed,
      },
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.lastProps.collapsed !== nextProps.collapsed) {
      return {
        collapsed: nextProps.collapsed,
        lastProps: {
          collapsed: nextProps.collapsed,
        },
      };
    }
    // No State Change
    return null;
  }

  toggleCollapse = () => {
    this.setState((prevState, props) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    return (
      <div styleName={classNames('collapsibleBox', {collapsed: this.state.collapsed})}>
        <div styleName="collapsibleHeader" onClick={this.toggleCollapse}>
          {this.state.collapsed && this.props.titleCollapsed ? this.props.titleCollapsed : this.props.title}
        </div>
        <div styleName="collapsibleBody">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Collapsible.displayName = 'Collapsible';

Collapsible.defaultProps = {
  collapsed: false,
  title: '',
  titleCollapsed: '',
};

// properties validation
Collapsible.propTypes = {
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  title: PropTypes.string.isRequired,
  titleCollapsed: PropTypes.string,
};