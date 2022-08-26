import React, { ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

import Loader from '../Loader/Loader';
import Banner from '../Banner/Banner';
import styles from './Card.module.css';
import Heading, { HeadingProps } from '../Heading/Heading';
import { IconNames } from '../types';
import ShareDialog from '../ShareDialog/ShareDialog';

export interface CardProps {
  /**
   The content enclosed in the card.
   */
  children: ReactNode;
  /**
   * An error to be shown rather than the content.
   */
  error?: string;
  /**
   * An optional footer component.
   */
  footer?: ReactNode;
  /**
   * An optional header component, e.g., a time range selector.
   */
  header?: ReactNode;
  /**
   * Indicates whether the card is loading. Displays an overlay loader.
   */
  loading?: boolean;
  /**
   * Sets spacing between card content and edge
   */
  paddingSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /**
   * Sets the title.
   */
  title?: string;
  /**
   * Sets the title level.
   */
  titleLevel?: HeadingProps['level'];
  /**
   * Sets min card height.
   */
  minHeight?: number;
  /**
   * Icon that goes before the text
   */
  titleIcon?: keyof IconNames;
  /**
   * Sets the URL of the svg file.
   */
  titleSvg?: string;
  /**
   * Sets the icon color. ( Hint: see colorConstants.js)
   */
  titleIconColor?: string;
  /**
   * Share link to add to the card
   */
  shareLink?: string;
}

/**
 * Cards are containers for content.
 *
 * They take the full width of the enclosing box and the height they need to fit the content.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      header,
      footer,
      children,
      loading = false,
      error,
      paddingSize = 'large',
      title,
      titleLevel = 2,
      minHeight,
      titleIcon,
      titleSvg,
      titleIconColor,
      shareLink,
    },
    ref
  ) => (
    <div ref={ref} className={clsx(styles.container, styles[paddingSize])}>
      {header && <div className={styles.header}>{header}</div>}
      <div
        className={clsx(styles.content, {
          [styles['content--noHeader']]: !header,
          [styles['content--noFooter']]: !footer,
        })}
        style={{ minHeight: minHeight }}
      >
        {(title || shareLink) && (
          <div className={styles.titleContainer}>
            {title && (
              <div>
                <Heading
                  svg={titleSvg}
                  icon={titleIcon}
                  iconColor={titleIconColor}
                  level={titleLevel}
                >
                  {title}
                </Heading>
              </div>
            )}
            {shareLink && (
              <div className={styles.shareLink}>
                <ShareDialog
                  position="bottom"
                  align="end"
                  disabled={!!(error || loading)}
                  link={shareLink}
                />
              </div>
            )}
          </div>
        )}
        {/* eslint-disable-next-line no-nested-ternary */}
        {error ? (
          <div className={styles.error}>
            <Banner type="error" styling="inline" label={error} />
          </div>
        ) : loading ? (
          <div className={styles.loader} style={!minHeight ? { minHeight: 160 } : undefined}>
            <div className={styles.loadingOverlay}>
              <Loader size="large" />
            </div>
          </div>
        ) : (
          children
        )}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
);

Card.displayName = 'Card';

export default Card;
