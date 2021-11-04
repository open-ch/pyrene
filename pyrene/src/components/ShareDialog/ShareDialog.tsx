import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Position } from 'react-tiny-popover';
import Popover, { PopoverProps } from '../Popover/Popover';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button, { ButtonProps } from '../Button/Button';
import styles from './shareDialog.css';

export interface ShareDialogProps {
  /**
   * Sets the alignment of the popover.
   */
  align?: PopoverProps['align'],
  /**
   * Disables any interaction with the share popover.
   */
  disabled?: ButtonProps['disabled'],
  /**
   * Sets the link to be shared via the popover.
   */
  link: string,
  /**
   * Sets the position of the popover relative to the share button.
   */
  position?: Position,
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  align = 'start',
  disabled = false,
  link,
  position = 'bottom',
}: ShareDialogProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayShareDialog, setDisplayShareDialog] = useState(false);

  const focusAndSelectInput = (): void => {
    inputRef?.current?.focus?.();
    inputRef?.current?.select?.();
  };

  const copyLinkToClipboard = (): void => {
    focusAndSelectInput();
    document.execCommand('copy');
    focusAndSelectInput();
  };

  const toggleShareDialogDisplay = (): void => setDisplayShareDialog(!displayShareDialog);

  useEffect(() => {
    if (displayShareDialog) {
      focusAndSelectInput();
    }
  }, [displayShareDialog]);

  return (
    <div className={styles.shareDialogContainer}>
      <Popover
        displayPopover={displayShareDialog}
        preferredPosition={[position]}
        align={align}
        distanceToTarget={16}
        onClickOutside={() => setDisplayShareDialog(false)}
        renderPopoverContent={() => (
          <div className={clsx('unSelectable', styles.shareDialog)} role="dialog">
            <div className={styles.title}>
              Share this link
            </div>
            <div className={styles.content}>
              <input className={styles.urlField} type="text" value={link} ref={inputRef} readOnly />
            </div>
            <ButtonBar
              rightButtonSectionElements={[
                <Button type="secondary" label="Cancel" onClick={toggleShareDialogDisplay} />,
                <Button type="primary" label="Copy link" onClick={copyLinkToClipboard} />,
              ]}
            />
          </div>
        )}
      >
        <Button label="Share" type="action" icon="share" onClick={toggleShareDialogDisplay} disabled={disabled} />
      </Popover>
    </div>
  );
};

ShareDialog.displayName = 'Share Dialog';

export default ShareDialog;
