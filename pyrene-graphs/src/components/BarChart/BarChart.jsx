import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './barChart.css';

/**
 * Bar Chart contain content and actions about a single subject.
 */
export default class BarChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contentWidth: null,
    };
  }

  componentDidMount() {
    if (this.contentRef) {
      this.setState(() => ({
        contentWidth: this.contentRef.clientWidth,
      }));
    }
  }

  render() {
    return (
      <div styleName={classNames('barChart')}>
        <div style={{ width: this.state.contentWidth ? this.state.contentWidth : null }}>
          <div style={{ padding: 24 }} ref={(contentRef) => { this.contentRef = contentRef; }}>
            {this.props.renderCallback()}
          </div>
        </div>
      </div>
    );
  }

}


BarChart.displayName = 'Bar Chart';

BarChart.category = 'Chart';

BarChart.propTypes = {
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: PropTypes.func.isRequired,
};
