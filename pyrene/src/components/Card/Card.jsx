import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loader from '../Loader/Loader';
import './card.css';

/**
 * Cards are containers for content.
 *
 * They take the full width of the enclosing box and the height they need to fit the content.
*/
const Card = ({
  header, footer, children, loading,
}) => (

  <div styleName="container">
    {header && <div styleName="header">{header}</div>}
    <div styleName={classNames('content', { 'content--noHeader': !header, 'content--noFooter': !footer, 'content--loading': loading })}>
      <Fragment>
        {children}
        {loading && (
          <div styleName="loadingOverlay">
            <Loader size="large" />
          </div>
        )}
      </Fragment>
    </div>
    {footer && <div styleName="footer">{footer}</div>}
  </div>
);

Card.displayName = 'Card';

Card.defaultProps = {
  header: null,
  footer: null,
  loading: false,
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
  /**
  * Indicates whether the card is loading. Displays an overlay loader.
  */
  loading: PropTypes.bool,
};

export default Card;
