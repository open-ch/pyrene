import React, { useEffect, useRef, useState } from 'react';
import Popover from '../Popover/Popover';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button from '../Button/Button';
import './shareDialog.css';

export interface ShareDialogProps {
  /**
   * Sets the alignment of the popover.
   */
  align?: 'start' | 'center' | 'end',
  /**
   * Disables any interaction with the share popover.
   */
  disabled?: boolean,
  /**
   * Sets the link to be shared via the popover.
   */
  link: string,
  /**
   * Sets the position of the popover relative to the share button.
   */
  position?: 'top' | 'right' | 'bottom' | 'left',
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  align = 'start',
  disabled = false,
  link,
  position = 'bottom',
}: ShareDialogProps) => {
  const textInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [displayShareDialog, setDisplayShareDialog] = useState(false);

  const focusAndSelectInput = (): void => {
    if (textInput.current) {
      textInput.current.focus();
      textInput.current.select();
    }
  };

  const copyLinkToClipboard = (): void => {
    focusAndSelectInput();
    document.execCommand('copy');
    focusAndSelectInput();
  };

  const toggleShareDialogDisplay = (): void => {
    setDisplayShareDialog(!displayShareDialog);
  };

  useEffect(() => {
    if (displayShareDialog) {
      focusAndSelectInput();
    }
  }, [displayShareDialog]);

  return (
    <div styleName="shareDialogContainer">
      <Popover
        displayPopover={displayShareDialog}
        preferredPosition={[position]}
        align={align}
        distanceToTarget={16}
        onClickOutside={() => setDisplayShareDialog(false)}
        renderPopoverContent={() => (
          <div className="unSelectable" styleName="shareDialog" role="dialog">
            <div styleName="title">
              Share this link
            </div>
            <div styleName="content">
              <input styleName="urlField" type="text" value={link} ref={textInput} readOnly />
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
