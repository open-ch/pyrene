import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './container.css';

/**
 * Container contain content and actions about a single subject.
 */
export default class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contentHeight: null,
      expanded: props.defaultExpanded,
    };
  }

  componentDidMount() {
    if (this.contentRef) {
      this.setState(() => ({
        contentHeight: this.contentRef.clientHeight,
      }));
    }
  }

  toggleCollapse = (event) => {
    event.persist();
    if (this.props.collapsible) {
      this.setState((prevState) => ({
        expanded: !prevState.expanded,
      }),
      () => this.props.onChange(event));
    }
  };

  render() {
    return (
      <div styleName={clsx('container', { expanded: this.state.expanded || !this.props.collapsible })}>
        <div styleName={clsx('header', { collapsible: this.props.collapsible })} onClick={this.toggleCollapse} role="button" aria-label="Show or hide container">
          <span styleName="title" className="unSelectable">
            {' '}
            {this.props.title}
          </span>
          <div styleName="arrowContainer">
            {this.props.collapsible && <span className="pyreneIcon-chevronDown" styleName="collapsArrow" />}
          </div>
        </div>
        <div styleName="contentContainer" style={{ height: (this.state.expanded || !this.props.collapsible) && this.state.contentHeight ? this.state.contentHeight : null }}>
          <div styleName="innerContentContainer" ref={(contentRef) => { this.contentRef = contentRef; }}>
            {this.props.renderCallback()}
          </div>
        </div>
      </div>
    );
  }

}


Container.displayName = 'Container';

Container.defaultProps = {
  defaultExpanded: false,
  onChange: () => null,
  collapsible: false,
};

Container.propTypes = {
  /**
   * Whether the container is collapsible when the user clicks on the header.
   */
  collapsible: PropTypes.bool,
  /**
   * Whether to display the content when the component is first mounted.
   */
  defaultExpanded: PropTypes.bool,
  /**
   * Javascript event handler.
   */
  onChange: PropTypes.func,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: PropTypes.func.isRequired,
  /**
   * Sets the title displayed in the header of the component.
   */
  title: PropTypes.string.isRequired,
};
