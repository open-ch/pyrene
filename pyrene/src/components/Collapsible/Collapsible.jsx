import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './collapsible.css';

export default class Collapsible extends React.Component {

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
    this.setState((prevState, props) => ({
      expanded: !prevState.expanded,
    }),
    () => this.props.onChange(this.state.expanded)
    );
  };

  render() {
    return (
      <div styleName={classNames('collapsibleBox', {expanded: this.state.expanded})}>
        <div styleName="collapsibleHeader" onClick={this.toggleCollapse}>
          {this.state.expanded && this.props.titleExpanded ? this.props.titleExpanded : this.props.title}
          <span className={'icon-collapsDown'} styleName={'collapsArrow'}/>
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
  expanded: false,
  title: '',
  titleExpanded: '',
};

// properties validation
Collapsible.propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
  titleExpanded: PropTypes.string,
  onChange: PropTypes.func,
};