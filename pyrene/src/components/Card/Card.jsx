import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './card.css';

/**
 * Cards are containers for content.
 *
 * They take the full width of the enclosing box and the height they need to fit the content.
*/
const Card = ({ header, footer, children }) => (

  <div styleName="container">
    {header && <div styleName="header">{header}</div>}
    <div styleName={classNames('content', { 'content--noHeader': !header, 'content--noFooter': !footer })}>
      {children}
    </div>
    {footer && <div styleName="footer">{footer}</div>}
  </div>
);

Card.displayName = 'Card';

Card.defaultProps = {
  header: null,
  footer: null,
};

Card.propTypes = {
  /**
 The content enclosed in the card.
 */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  /**
  * An optional footer component.
  */
  footer: PropTypes.node,
  /**
  * An optional header component, e.g., a time range selector.
  */
  header: PropTypes.node,
};

export default Card;
