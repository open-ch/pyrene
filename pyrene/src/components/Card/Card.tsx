import React, { ReactElement } from 'react';
import classNames from 'classnames';

import Loader from '../Loader/Loader';
import Banner from '../Banner/Banner';
import './card.css';

export interface CardProps {
  /**
   The content enclosed in the card.
   */
  children: ReactElement[] | ReactElement,
  /**
       * An error to be shown rather than the content.
       */
  error?: string,
  /**
       * An optional footer component.
       */
  footer?: ReactElement,
  /**
       * An optional header component, e.g., a time range selector.
       */
  header?: ReactElement,
  /**
       * Indicates whether the card is loading. Displays an overlay loader.
       */
  loading?: boolean,
}

/**
 * Cards are containers for content.
 *
 * They take the full width of the enclosing box and the height they need to fit the content.
*/
const Card:React.FC<CardProps> = ({
  header,
  footer,
  children,
  loading = false,
  error,
}: CardProps) => (

  <div styleName="container">
    {header && <div styleName="header">{header}</div>}
    <div styleName={classNames('content', { 'content--noHeader': !header, 'content--noFooter': !footer })}>
      {/* eslint-disable-next-line no-nested-ternary */}
      { error ? <div styleName="error"><Banner type="error" styling="standard" label={error} /></div>
        : loading ? (
          <div styleName="loader">
            <div styleName="loadingOverlay">
              <Loader size="large" />
            </div>
          </div>
        ) : children}
    </div>
    {footer && <div styleName="footer">{footer}</div>}
  </div>
);

Card.displayName = 'Card';

export default Card;
