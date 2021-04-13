import React, { ReactElement, FunctionComponent } from 'react';
import classNames from 'classnames';
import './buttonBar.css';
import { ButtonProps } from '../Button/Button';

export interface ButtonBarProps {
  noPadding?: boolean,
  leftButtonSectionElements?: ReactElement<ButtonProps>[],
  rightButtonSectionElements?: ReactElement<ButtonProps>[],
}

const ButtonBar: FunctionComponent<ButtonBarProps> = ({
  noPadding = false,
  leftButtonSectionElements = [],
  rightButtonSectionElements = [],
}) => (
  <div styleName={classNames('buttonBar', { noPadding: noPadding })}>
    <div styleName="leftButtonSection">
      {leftButtonSectionElements.map((element) => (
        <React.Fragment key={`${element.props.type || 'undefined'}-${element.props.label as string}`}>
          {element}
          <div styleName="spacer" />
        </React.Fragment>
      ))}
    </div>
    <div styleName="rightButtonSection">
      {rightButtonSectionElements.map((element, index) => (
        <React.Fragment key={`${element.props.type || 'undefined'}-${element.props.label as string}`}>
          {index !== 0 && <div styleName="spacer" />}
          {element}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default ButtonBar;
