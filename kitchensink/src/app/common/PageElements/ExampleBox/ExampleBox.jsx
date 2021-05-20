import React from 'react';
import hash from 'object-hash';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './exampleBox.css';
import Example from './Example';

export default class ExampleBox extends React.Component {

  constructor(props) {
    super(props);

    this.handleExampleHover = this.handleExampleHover.bind(this);

    this.descriptionPlaceholder = 'Hover on example to learn more. Click on an example to copy all its props into the playground.';
    this.state = {
      displayedDescription: this.descriptionPlaceholder,
    };
  }

  handleExampleHover(description) {
    if (typeof description !== 'undefined') {
      this.setState(() => ({
        displayedDescription: description,
      }));
    } else {
      this.setState(() => ({
        displayedDescription: this.descriptionPlaceholder,
      }));
    }
  }

  getComponentName = (component) => component.displayName.toLowerCase().replace(/\s/g, '');

  render() {
    return (
      <div className={styles.exampleBox}>
        <div className={styles.exampleDisplay}>
          {this.props.examples.map((example) => (
            <React.Fragment key={hash(example.props)}>

              <Example
                component={this.props.component}
                exampleProps={example.props}
                description={example.description}
                onMouseOver={this.handleExampleHover}
                onMouseLeave={this.handleExampleHover}
                onExampleClick={this.props.onExampleClick}
              />
            </React.Fragment>
          ))}
        </div>
        <div className={clsx('unSelectable', styles.exampleDescriptionBox, { [styles.placeholder]: this.state.displayedDescription === this.descriptionPlaceholder })}>
          <div className={styles.exampleDescription}>
            <div>{this.state.displayedDescription}</div>
          </div>
        </div>
      </div>
    );
  }

}

ExampleBox.displayName = 'ExampleBox';

ExampleBox.defaultProps = {
  examples: [],
};

ExampleBox.propTypes = {
  component: PropTypes.func.isRequired,
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      props: PropTypes.shape().isRequired,
    }),
  ),
  onExampleClick: PropTypes.func.isRequired,
};
