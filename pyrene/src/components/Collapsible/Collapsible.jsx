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
      expanded: props.defaultExpanded,
    };
  }


  toggleCollapse = (event) => {
    event.persist();
    this.setState((prevState, props) => ({
      expanded: !prevState.expanded,
    }),
    () => this.props.onChange(event)
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
        <div styleName={classNames('buttonAlignmentBox', {[`align-${this.props.align}`]: true})}>
          <div styleName={'collapsibleButton'} className={'unSelectable'} onClick={this.toggleCollapse} role="button" aria-label="Show or hide content">
            <div styleName={"centeringBox"}>
              {this.state.expanded && this.props.labelExpanded ? this.props.labelExpanded : this.props.labelCollapsed}
              <span className={'pyreneIcon-collapsDown'} styleName={'collapsArrow'}/>
            </div>
          </div>
        </div>
        <div styleName={"collapsibleBody"} style={{height: (this.state.expanded && this.state.contentHeight) ? this.state.contentHeight : null}}>
          <div ref={(contentRef) => {this.contentRef = contentRef;}} style={{paddingTop: 16}}>
            {this.props.renderCallback()}
          </div>
        </div>
      </div>
    );
  }
}

Collapsible.displayName = 'Collapsible';

Collapsible.defaultProps = {
  align: 'start',
  defaultExpanded: false,
  labelCollapsed: 'Show More',
  labelExpanded: 'Show Less',
  onChange: () => null,
};

Collapsible.propTypes = {
  /**
   * Sets the alignment of the popover.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
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
   * Sets the label displayed to the user when the component is collapsed.
   */
  labelCollapsed: PropTypes.string,
  /**
   * Sets the label displayed to the user when the component is expanded.
   */
  labelExpanded: PropTypes.string,
};