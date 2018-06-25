import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.css';


/**
 * Buttons are used primarily on action items and to communicate what action the user can take.
 * They are placed throughout the UI and can be found in places like forms, modals, dialogues etc.
 *
 * Do not use Buttons as navigational elements.
 * Instead, use Links because it takes the user to a new page and is not associated with an action.
 */
const Button = props => (
  <button
    className={'unSelectable'}
    styleName={
      classNames('button',
        { [`type-${props.type}`]: true },
        { hasIcon: props.icon },
        { disabled: props.disabled })}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.icon && <span className={`icon-${props.icon}`} />}
    {props.label}
  </button>
);

Button.displayName = 'Button';

Button.defaultProps = {
  icon: '',
  label: '',
  type: 'primary',
  disabled: false,
  onClick: () => null,
};

Button.propTypes = {
  /**
   *  Disables any interaction with the button.
   */
  disabled: PropTypes.bool,
  /**
   *  Adds an icon in front of the label. Uses the icon-font.
   */
  icon: PropTypes.string,
  /**
   *  Changes what the button says.
   */
  label: PropTypes.string.isRequired,
  /**
   *  onClick function
   */
  onClick: PropTypes.func,
  /**
   * Changes the overall button style.
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'action', 'admin']),
};

Button.examples = [
  { label: 'primary', description: 'For all principle actions on a page. Used to highlight the most important actions. Avoid overwhelming usage of primary buttons.' },
  { label: 'secondary', type: 'secondary', description: 'For secondary actions such as ‘Discard’ in combination with a primary button.' },
  { label: 'danger', type: 'danger', icon: 'errorOutline', description: 'When an action has harmful intentions to the users data (delete, remove, etc). To draw more attention on what the button does add and icon. Icons are always paired with a label.' },
  { label: 'Delete', type: 'action', icon: 'errorOutline', description: 'Used for table actions. They are paired with icon and label.' },
  { label: 'admin', type: 'admin', description: 'Used when an action is accessible for MC Engineers only.' },
];

export default Button;
