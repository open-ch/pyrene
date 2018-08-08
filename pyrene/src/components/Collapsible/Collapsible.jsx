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
        <div styleName={'collapsibleButton'} onClick={this.toggleCollapse} role="button" aria-label="Show or hide content">
          <div styleName={"centeringBox"}>
            {this.state.expanded && this.props.titleExpanded ? this.props.titleExpanded : this.props.title}
            <span className={'icon-collapsDown'} styleName={'collapsArrow'}/>
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
  defaultExpanded: false,
  title: 'Show More',
  titleExpanded: 'Show Less',
  onChange: () => null,
};

Collapsible.propTypes = {
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
  title: PropTypes.string,
  /**
   * Displayed label when expanded
   */
  titleExpanded: PropTypes.string,
};