import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../Utils';
import styles from './example.css';

export default class Example extends React.Component {

  handleMouseOver(description) {
    this.props.onMouseOver(description);
  }

  getComponentProps = () => ({
    ...this.props.component.defaultProps,
    ...Utils.getNormalProps(this.props.exampleProps),
    ...Utils.getWiredProps(this.props.exampleProps, {
      state: {},
      setState: () => {},
    }),
  })

  render() {
    return (
      <div
        className={styles.example}
        onClick={() => this.props.onExampleClick(this.props.exampleProps)}
        onMouseOver={() => this.handleMouseOver(this.props.description)}
        onMouseLeave={() => this.handleMouseOver()}
      >
        <div className={styles.componentOverlay}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <this.props.component {...this.getComponentProps()} />
        </div>
      </div>
    );
  }

}

Example.displayName = 'Example';

Example.defaultProps = {
  description: '',
};

Example.propTypes = {
  component: PropTypes.func.isRequired,
  description: PropTypes.string,
  exampleProps: PropTypes.shape().isRequired,
  onExampleClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
