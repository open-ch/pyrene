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
      <div>
        <Button
          label={`Trigger ${this.props.component.type.displayName}`}
          type="primary"
          onClick={this.handleClick}
        />
        { // check if children is render props or not
          typeof this.props.render === 'function'
            ? this.state.displayComponent && this.props.render(this.props.component, this.handleClick)
            : this.state.displayComponent && this.props.component
        }
      </div>
    );
  }

}

ParentButton.displayName = 'ParentButton';

ParentButton.defaultProps = {
  render: undefined,
};

ParentButton.propTypes = {
  component: PropTypes.element.isRequired,
  render: PropTypes.func,
};
