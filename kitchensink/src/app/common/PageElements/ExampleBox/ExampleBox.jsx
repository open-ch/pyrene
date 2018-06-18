import React from 'react';
import { Button } from 'pyrene';
import hash from 'object-hash';
import PropTypes from 'prop-types';

import './exampleBox.css';
import Example from './Example';


export default class ExampleBox extends React.Component {

  constructor(props) {
    super(props);

    this.handleExampleHover = this.handleExampleHover.bind(this);

    this.descriptionPlaceholder = 'Hover over an example to see its description.';
    this.state = {
      displayedDescription: this.descriptionPlaceholder,
      selectBoxIndex: null,
    };
  }

  handleExampleHover(description, index) {
    if (typeof description !== 'undefined') {
      this.setState((prevState, props) => ({
        displayedDescription: description,
        selectBoxIndex: index,
      }));
    }
  }


  render() {
    return (
      <div styleName={'exampleBox'}>
        <div styleName={'exampleDisplay'}>
          {this.props.component.examples.map((exampleProps, index) => (
            <Example
              index={index}
              component={this.props.component}
              hoveredLast={this.state.selectBoxIndex === index}
              exampleProps={exampleProps}
              onMouseOver={this.handleExampleHover}
              onExampleClick={this.props.onExampleClick}
              key={hash(exampleProps)}
            />
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
