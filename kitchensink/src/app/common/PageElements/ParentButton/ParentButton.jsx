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
    console.log('this.props', this.props);
    return (
      <div>
        <Button
          label={`Trigger ${this.props.component?.type?.displayName || ''}`}
          type="primary"
          onClick={this.handleClick}
        />
        { // check if children is render props or not
          typeof this.props.component !== 'function' ?
            this.state.displayComponent && this.props.component :
            this.state.displayComponent && this.props.component(this.handleClick)
        }
      </div>
    );
  }

}

ParentButton.displayName = 'ParentButton';

ParentButton.defaultProps = {};

ParentButton.propTypes = {
  componentMeta:PropTypes.element,
  component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]).isRequired
};
