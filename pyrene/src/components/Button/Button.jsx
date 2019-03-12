import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.css';
import Loader from '../Loader/Loader';


/**
 * Buttons are used primarily on action items and to communicate what action the user can take.
 * They are placed throughout the UI and can be found in places like forms, modals, dialogues etc.
 *
 * Do not use Buttons as navigational elements.
 * Instead, use Links because it takes the user to a new page and is not associated with an action.
 */
const Button = props => (
  <div styleName="buttonContainer">
    <button
      type="submit"
      className="unSelectable"
      styleName={
        classNames('button',
          { [`type-${props.type}`]: true },
          { disabled: props.disabled },
          { loading: props.loading })}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon && <span styleName="icon" className={`pyreneIcon-${props.icon}`} />}
      <span styleName="label">{props.label}</span>
    </button>
    {props.loading && ((props.type === 'primary' || props.type === 'danger')
      ? <span styleName="loader"><Loader size="small" type="light" /></span>
      : <span styleName="loader"><Loader size="small" type="dark" /></span>)
    }
  </div>
);

Button.displayName = 'Button';

Button.defaultProps = {
  icon: '',
  type: 'primary',
  loading: false,
  disabled: false,
  onClick: () => null,
};

Button.propTypes = {
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Adds an icon to the element.
   */
  icon: PropTypes.string,
  /**
   * Sets the label displayed to the user.
   */
  label: PropTypes.string.isRequired,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
  /**
   * Javascript event handler.
   */
  onClick: PropTypes.func,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'action', 'admin']),
};

/* kitchensink-examples:start */

Button.exampleProps = {
  label: 'Click Me',
  type: 'secondary',
  icon: 'filter',
};

Button.examples = [{
  props: { label: 'primary' },
  description: 'For all principle actions on a page. Used to highlight the most important actions. Avoid overwhelming usage of primary buttons.',
}, {
  props: { label: 'secondary', type: 'secondary' },
  description: 'For secondary actions such as ‘Discard’ in combination with a primary button.',
}, {
  props: { label: 'Ghost', type: 'ghost' },
  description: 'Ghost button description',
}, {
  props: { label: 'danger', type: 'danger', icon: 'errorOutline' },
  description: 'When an action has harmful intentions to the users data (delete, remove, etc). To draw more attention on what the button does add and icon. Icons are always paired with a label.',
}, {
  props: { label: 'Delete', type: 'action', icon: 'errorOutline' },
  description: 'Used for table actions. They are paired with icon and label.',
}, {
  props: { label: 'admin', type: 'admin' },
  description: 'Used when an action is accessible for MC Engineers only.',
}];

/* kitchensink-examples:end */

export default Button;
