import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './collapsible.css';

/**
 * Click on me to reveal my secrets...
 */
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

  componentDidMount() {
    if (this.contentRef) {
      this.setState(() => ({
        contentHeight: this.contentRef.clientHeight
      }));
    }
  }

  render() {
    return (
      <div styleName={classNames('collapsibleBox', {expanded: this.state.expanded})}>
        <div styleName={'collapsibleButton'} onClick={this.toggleCollapse}>
          <div styleName={"centeringBox"}>
            {this.state.expanded && this.props.titleExpanded ? this.props.titleExpanded : this.props.title}
            <span className={'icon-collapsDown'} styleName={'collapsArrow'}/>
          </div>
        </div>
        <div styleName={"collapsibleBody"} style={{height: (this.state.expanded && this.state.contentHeight) ? this.state.contentHeight : null}}>
          <div ref={(contentRef) => {this.contentRef = contentRef;}} style={{paddingTop: 16}}>
            {this.props.children}
          </div>
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
  onChange: () => null,
};

Collapsible.propTypes = {
  /**
   * React private content prop
   */
  children: PropTypes.node.isRequired,
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
  /**
   * Displayed label when expanded
   */
  titleExpanded: PropTypes.string,
};