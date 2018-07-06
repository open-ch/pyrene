import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';

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
          {this.props.adminAction && <Button type={'admin'} label={this.props.adminAction.label} onClick={(event) => {this.props.adminAction.action(event); event.stopPropagation()}}/>}
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
  adminAction: null,
  expanded: false,
  onChange: () => null,
  collapsible: false,
};

Container.propTypes = {
  /**
   * Admin Button specification, need to stop event propagation in the action
   */
  adminAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }),
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
