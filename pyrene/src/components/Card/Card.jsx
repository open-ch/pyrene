import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './card.css';

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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  footer: PropTypes.node,
  header: PropTypes.node,
};

export default Card;
