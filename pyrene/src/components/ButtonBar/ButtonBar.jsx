import React from 'react';
import PropTypes from 'prop-types';
import './buttonBar.css';


const ButtonBar = (props) => (
  <div styleName={'buttonBar'}>
    <div styleName={'leftButtonSection'}>
      {props.leftButtonSectionElements}
    </div>
    <div styleName={'rightButtonSection'}>
      {props.rightButtonSectionElements}
    </div>
  </div>
);


ButtonBar.displayName = 'ButtonBar';

ButtonBar.defaultProps = {
  leftButtonSectionElements: [],
  rightButtonSectionElements: []
};

ButtonBar.propTypes = {
  leftButtonSectionElements: PropTypes.arrayOf(PropTypes.element),
  rightButtonSectionElements: PropTypes.arrayOf(PropTypes.element)
};

ButtonBar.docProps = [
  {propName: 'icon', isRequired: false, type: 'String', defaultValue: '', description: 'Adds an icon in front of the label. Uses the icon-font.'},
  {propName: 'label', isRequired: true, type: 'String', defaultValue: '', description: 'Changes what the button says.'},
  {propName: 'type', isRequired: false, type: 'oneOf: primary secondary ghost danger action admin', defaultValue: 'primary', description: 'Changes the overall button style.'},
  {propName: 'isDisabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the button.'}
];

export default ButtonBar;