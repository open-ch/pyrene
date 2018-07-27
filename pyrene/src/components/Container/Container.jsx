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
      expanded: props.defaultExpanded,
    };
  }

  toggleCollapse = (event) => {
    event.persist();
    if (this.props.collapsible) {
      this.setState((prevState, props) => ({
          expanded: !prevState.expanded,
        }),
        () => this.props.onChange(event)
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
        <div styleName={classNames('header', {collapsible: this.props.collapsible})} onClick={this.toggleCollapse} role="button" aria-label="Show or hide container">
          <span styleName={'title'} className={'unSelectable'}> {this.props.title}</span>
          {this.props.adminAction && <Button type={'admin'} label={this.props.adminAction.label} icon={this.props.adminAction.icon} onClick={(event) => {this.props.adminAction.action(event); event.stopPropagation()}}/>}
          {this.props.collapsible && <span className={'icon-collapsDown'} styleName={'collapsArrow'} />}
        </div>
        <div styleName={'contentContainer'} style={{height: (this.state.expanded || !this.props.collapsible) && this.state.contentHeight ? this.state.contentHeight : null}}>
          <div style={{padding: 24}} ref={(contentRef) => {this.contentRef = contentRef;}}>
             {this.props.renderCallback()}
          </div>
        </div>
      </div>
    );
  }
}


Container.displayName = 'Container';

Container.defaultProps = {
  adminAction: null,
  defaultExpanded: false,
  onChange: () => null,
  collapsible: false,
};

Container.propTypes = {
  /**
   * Admin Button specification. When used an admin button is automatically rendered.
   */
  adminAction: PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }),
  /**
   * collapsible
   */
  collapsible: PropTypes.bool,
  /**
   * Whether or not to display the content when the component is mounted
   */
  defaultExpanded: PropTypes.bool,
  /**
   * Event handler.
   */
  onChange: PropTypes.func,
  /**
   * Render function for the content
   */
  renderCallback: PropTypes.func.isRequired,
  /**
   * Displayed label when collapsed
   */
  title: PropTypes.string.isRequired,
};
