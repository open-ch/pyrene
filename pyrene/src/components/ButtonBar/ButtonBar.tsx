import React, { ReactElement } from 'react';
import classNames from 'classnames';
import './buttonBar.css';
import Button, { ButtonProps } from '../Button/Button';

export interface ButtonBarProps {
  noPadding?: boolean,
  leftButtonSectionElements?: ButtonProps[],
  rightButtonSectionElements?: ButtonProps[],
}

const ButtonBar: React.FC<ButtonBarProps> = ({
  noPadding = false,
  leftButtonSectionElements = [],
  rightButtonSectionElements = [],
}: ButtonBarProps) => (
  <div styleName={classNames('buttonBar', { noPadding: noPadding })}>
    <div styleName="leftButtonSection">
      {leftButtonSectionElements.map((element) => (
        <React.Fragment key={`${element.type}${element.label}`}>
          <Button {...element} />
          <div styleName="spacer" />
        </React.Fragment>
      ))}
    </div>
    <div styleName="rightButtonSection">
      {rightButtonSectionElements.map((element, index) => (
        <React.Fragment key={`${element.label}${element.type}`}>
          {index !== 0 && <div styleName="spacer" />}
          <Button {...element} />
        </React.Fragment>
      ))}
    </div>
  </div>
);


ButtonBar.displayName = 'Button Bar';

export default ButtonBar;
