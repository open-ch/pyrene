import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './container.css';

/**
 * What's in the Booooooox?
 */
export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: null,
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

  componentDidMount() {
    if (this.contentRef) {
      this.setState(() => ({
        contentHeight: this.contentRef.clientHeight
      }));
    }
  }

  render() {
    return (
      <div styleName={classNames('container', {expanded: this.state.expanded || !this.props.collapsible})}>
        <div styleName={classNames('header', {collapsible: this.props.collapsible})} onClick={this.toggleCollapse}>
          <span styleName={'title'} className={'unSelectable'}> {this.props.title}</span>
          {this.props.collapsible && <span className={'icon-collapsDown'} styleName={'collapsArrow'} />}
        </div>
        <div styleName={'contentContainer'} style={{height: (this.state.expanded || !this.props.collapsible) && this.state.contentHeight ? this.state.contentHeight : null}}>
          <div style={{padding: 24}} ref={(contentRef) => {this.contentRef = contentRef;}}>
             {this.props.children}
          </div>
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
