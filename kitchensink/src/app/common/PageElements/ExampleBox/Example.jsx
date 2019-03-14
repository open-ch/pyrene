import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Utils from '../../Utils';

import './example.css';


export default class Example extends React.Component {

  getComponentProps = () => ({
    ...this.props.component.defaultProps,
    ...Utils.getNormalProps(this.props.exampleProps),
    ...Utils.getWiredProps(this.props.exampleProps, {
      state: {},
      setState: () => {},
    }),
  })

  handleMouseOver(description) {
    this.props.onMouseOver(description);
  }

  render() {
    return (
      <div
        styleName={classNames('example', { hoveredLast: this.props.hoveredLast })}
        onClick={() => this.props.onExampleClick(this.props.exampleProps)}
        onMouseOver={() => this.handleMouseOver(this.props.description)}
        onMouseLeave={() => this.handleMouseOver()}
      >
        <div styleName="componentOverlay">
          <this.props.component {...this.getComponentProps()} />
        </div>
      </div>
    );
  }

}

Example.displayName = 'Example';

Example.defaultProps = {};

Example.propTypes = {
  component: PropTypes.func.isRequired,
  description: PropTypes.string,
  exampleProps: PropTypes.shape().isRequired,
  onExampleClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
