import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './buttonBar.css';


const ButtonBar = props => (
  <div styleName={classNames('buttonBar', { noPadding: props.noPadding })}>
    <div styleName="leftButtonSection">
      {props.leftButtonSectionElements.map(element => (
        <React.Fragment key={`${element.type}${element.props.label}${element.props.type}`}>
          <element.type {...element.props} />
          <div styleName="spacer" />
        </React.Fragment>
      ))}
    </div>
    <div styleName="rightButtonSection">
      {props.rightButtonSectionElements.map((element, index) => (
        <React.Fragment key={`${element.props.label}${element.props.type}${element.type}`}>
          {index !== 0 && <div styleName="spacer" />}
          <element.type {...element.props} />
        </React.Fragment>
      ))}
    </div>
  </div>
);


ButtonBar.displayName = 'Button Bar';

ButtonBar.defaultProps = {
  leftButtonSectionElements: [],
  rightButtonSectionElements: [],
  noPadding: false,
};

ButtonBar.propTypes = {
  leftButtonSectionElements: PropTypes.arrayOf(PropTypes.element),
  noPadding: PropTypes.bool,
  rightButtonSectionElements: PropTypes.arrayOf(PropTypes.element),
};

export default ButtonBar;
