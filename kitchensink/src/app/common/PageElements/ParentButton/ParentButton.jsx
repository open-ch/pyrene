import React from 'react';
import PropTypes from 'prop-types';

import './parentButton.css';


export default class ParentButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayComponent: false,
    };
  }

  toggleComponent = () => {
    this.setState(prevState => ({
      displayComponent: !prevState.displayComponent,
    }));
  };

  handleClick = () => {
    this.toggleComponent();
  };


  render() {
    return (
      <div styleName="parentButton" className="unSelectable" onClick={this.handleClick}>
        Trigger
        {' '}
        {this.props.component.type.displayName}
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
