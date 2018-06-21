import React from 'react';
import { Button } from 'pyrene';
import hash from 'object-hash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './exampleBox.css';
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
          {this.props.component.examples.map((exampleProps, index) => (
            <React.Fragment key={hash(exampleProps)}>
              <Example
                component={this.props.component}
                exampleProps={exampleProps}
                onMouseOver={this.handleExampleHover}
                onMouseLeave={this.handleExampleHover}
                onExampleClick={this.props.onExampleClick}
              />
            </React.Fragment>
          ))}
        </div>
        <div className={'unSelectable'} styleName={classNames('exampleDescriptionBox', {placeholder: this.state.displayedDescription === this.descriptionPlaceholder})}>
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
