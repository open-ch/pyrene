import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './example.css';


export default class Example extends React.Component {

  handleMouseOver(description, index) {
    this.props.onMouseOver(description, index);
  }

  render() {
    return (
      <div
        styleName={classNames('example', { hoveredLast: this.props.hoveredLast })}
        onClick={() => this.props.onExampleClick(this.props.exampleProps)}
        onMouseOver={() => this.handleMouseOver(this.props.exampleProps.description, this.props.index)}
      >
        <div styleName={'componentOverlay'}>
          <this.props.component {...this.props.exampleProps} />
        </div>
      </div>
    );
  }

}

Example.displayName = 'Example';

Example.defaultProps = {};

Example.propTypes = {
  component: PropTypes.func.isRequired,
  exampleProps: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  hoveredLast: PropTypes.bool.isRequired,
  onExampleClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
