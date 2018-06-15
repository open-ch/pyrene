import React from 'react';
import { Button } from 'pyrene';
import hash from 'object-hash';
import PropTypes from 'prop-types';

import './exampleBox.css';


export default class ExampleBox extends React.Component {

  constructor(props) {
    super(props);

    this.descriptionPlaceholder = 'Hover over an example to see its description.';
    this.state = {
      displayedDescription: this.descriptionPlaceholder,
    };
  }

  handleExampleHover(description) {
    if (typeof description !== 'undefined') {
      this.setState((prevState, props) => ({
        displayedDescription: description,
      }));
    } else {
      this.setState((prevState, props) => ({
        displayedDescription: this.descriptionPlaceholder,
      }));
    }
  }

  render() {
    return (
      <div styleName={'exampleBox'}>
        <div styleName={'exampleDisplay'}>
          {this.props.component.examples.map(exampleProps => (
            <div
              styleName={'example'}
              onMouseOver={() => this.handleExampleHover(exampleProps.description)}
              onMouseLeave={() => this.handleExampleHover()}
              onClick={() => this.props.onExampleClick(exampleProps)}
              key={hash(exampleProps)}
            >
              <div styleName={'componentOverlay'}>
                <this.props.component {...exampleProps} />
              </div>
            </div>
          ))}

        </div>
        <div className={'unSelectable'} styleName={'exampleDescriptionBox'}>
          <div styleName={'exampleDescription'}>
            <div>{this.state.displayedDescription}</div>
          </div>
        </div>
      </div>
    );
  }

}

ExampleBox.displayName = 'ExampleBox';

ExampleBox.defaultProps = {};

ExampleBox.propTypes = {
  component: PropTypes.func.isRequired,
  onExampleClick: PropTypes.func.isRequired,
};
