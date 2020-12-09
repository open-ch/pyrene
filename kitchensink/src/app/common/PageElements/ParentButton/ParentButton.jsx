import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@osag/pyrene';


export default class ParentButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayComponent: false,
    };
  }

  toggleComponent = () => {
    this.setState((prevState) => ({
      displayComponent: !prevState.displayComponent,
    }));
  };

  handleClick = () => {
    this.toggleComponent();
  };


  render() {
    return (
      <div onClick={this.handleClick}>
        <Button
          label={`Trigger ${this.props.component.type.displayName}`}
          type="primary"
        />
        {this.state.displayComponent && this.props.component}
      </div>
    );
  }

}

ParentButton.displayName = 'ParentButton';

ParentButton.defaultProps = {};

ParentButton.propTypes = {
  component: PropTypes.element.isRequired,
};
