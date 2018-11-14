import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover/Popover';
import Button from '../Button/Button';
import ButtonBar from '../ButtonBar/ButtonBar';

import './shareDialog.css';

/**
 * Share dialogs are used primarily on ....
 */
export default class ShareDialog extends React.Component {

  state = {
    displayShareDialog: false,
    dialogPosition: {},
  };

  componentDidUpdate() {
    if (this.state.displayShareDialog) {
      this._focusAndSelectInput();
    }
  }

  _copyLinkToClipboard = () => {
    this._focusAndSelectInput();
    document.execCommand('copy');
    this._focusAndSelectInput();
  };

  _displayShareDialogClicked = (event) => {
    this.setState((prevState, props) => ({
      displayShareDialog: !prevState.displayShareDialog,
    }));
  };

  _focusAndSelectInput = () => {
    this.textInput.focus();
    this.textInput.select();
  };


  render() {
    return (
      <div styleName="shareDialogContainer">
        <Popover
          displayPopover={this.state.displayShareDialog}
          position={[this.props.position]}
          align={this.props.align}
          padding={16}
          onClickOutside={() => this.setState({ displayShareDialog: false })}
          renderPopoverContent={() => (
            <div className={'unSelectable'} styleName={'shareDialog'} role="dialog">
              <div styleName={'titleBar'}>
                <div styleName={'title'}>
                  Share this link
                </div>
                <div styleName={'closeButton'} className={'pyreneIcon-delete'} onClick={this._displayShareDialogClicked}/>
              </div>
              <div styleName={'content'}>
                <input styleName={'urlField'} type={'text'} value={this.props.link} ref={(input) => { this.textInput = input; }} readOnly />
              </div>
              <ButtonBar
                rightButtonSectionElements={[
                  <Button type={'ghost'} label={'Copy link'} onClick={this._copyLinkToClipboard} />,
                ]}
              />
            </div>
          )}
        >
          <Button label={'Share'} type={'action'} icon={'share'} onClick={this._displayShareDialogClicked} disabled={this.props.disabled} />
        </Popover>
      </div>
    );
  }

}

ShareDialog.displayName = 'Share Dialog';

ShareDialog.defaultProps = {
  disabled: false,
  position: 'bottom',
  align: 'start',
};

ShareDialog.propTypes = {
  /**
   * Sets the alignment of the popover.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Sets the position of the popover relative to the share button.
   */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * Sets the link to be shared via the popover.
   */
  link: PropTypes.string.isRequired,
  /**
   * Disables any interaction with the share popover.
   */
  disabled: PropTypes.bool,
};
