import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import ButtonBar from '../ButtonBar/ButtonBar';

import './shareDialog.css';

/**
 * Share dialogs are used primarily on ....
 */
export default class ShareDialog extends React.Component {

  constructor(props) {
    super(props);
    this._displayShareDialogClicked = this._displayShareDialogClicked.bind(this);
    this._copyLinkToClipboard = this._copyLinkToClipboard.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);

    this.state = {
      displayShareDialog: false,
      dialogPosition: {},
    };

  }

  componentDidUpdate() {
    if (this.state.displayShareDialog) {
      this._focusAndSelectInput();
    }
  }

  _handleClickOutside() {
    if (this.dialogRef && !this.dialogRef.contains(event.target)) {
      this._hideDialogAndRemoveListener();
    }
  }

  _copyLinkToClipboard() {
    document.execCommand('copy');
    this._hideDialogAndRemoveListener();
  }

  _hideDialogAndRemoveListener() {
    document.removeEventListener('mousedown', this._handleClickOutside);
    this.setState((prevState, props) => ({
      displayShareDialog: false,
    }));
  }

  _displayShareDialogClicked(event) {
    // If displayed remove from dom
    if (this.state.displayShareDialog) {
      this._hideDialogAndRemoveListener();
      // else display dialog
    } else {
      document.addEventListener('mousedown', this._handleClickOutside);
      const target = event.target;
      this.setState((prevState, props) => ({
        displayShareDialog: true,
        dialogPosition: this._computeDialogPositionFromButton(target),
      }));
    }
  }

  _computeDialogPositionFromButton(target) {
    const targetRect = target.getBoundingClientRect();
    const dialogPosition = {};
    const dialogWidth = 400;

    switch (this.props.position) {
      case 'top-right':
        dialogPosition.bottom = targetRect.height + 5;
        dialogPosition.left = 0;
        break;
      case 'top-left':
        dialogPosition.bottom = targetRect.height + 5;
        dialogPosition.left = targetRect.width - dialogWidth;
        break;
      case 'bottom-right':
        dialogPosition.top = targetRect.height + 5;
        dialogPosition.left = 0;
        break;
      case 'bottom-left':
        dialogPosition.top = targetRect.height + 5;
        dialogPosition.left = targetRect.width - dialogWidth;
        break;
      default:
        dialogPosition.top = targetRect.height + 5;
        dialogPosition.left = 0;
    }
    return dialogPosition;
  }

  _focusAndSelectInput() {
    this.textInput.focus();
    this.textInput.select();
  }

  _renderDialog() {
    return (
      <div className={'unSelectable'} styleName={'shareDialog'} style={this.state.dialogPosition}>
        <div styleName={'title'}>
          Share this link
        </div>
        <div styleName={'content'}>
          <input type={'text'} value={this.props.link} ref={(input) => { this.textInput = input; }} readOnly />
        </div>
        <ButtonBar
          rightButtonSectionElements={[
            <Button type={'ghost'} label={'Copy link'} onClick={this._copyLinkToClipboard} />,
            <Button label={'Close'} onClick={this._displayShareDialogClicked} />]}
        />
      </div>
    );
  }

  render() {
    return (
      <div styleName="shareDialogContainer" ref={(dialog) => { this.dialogRef = dialog; }}>
        <Button label={'Share'} type={'action'} icon={'share'} onClick={this._displayShareDialogClicked} disabled={this.props.disabled} />
        {this.state.displayShareDialog && this._renderDialog()}
      </div>
    );
  }

}

ShareDialog.displayName = 'Share Dialog';

ShareDialog.defaultProps = {
  disabled: false,
  position: 'bottom-right',
};

ShareDialog.propTypes = {
  /**
   * Choose where the dialog appears relative to the share button.
   */
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  /**
   * Link that is in the share dialog.
   */
  link: PropTypes.string.isRequired,
  /**
   * Disables any interaction with the share dialog.
   */
  disabled: PropTypes.bool,
};
