import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import ButtonBar from '../ButtonBar/ButtonBar';

import './shareDialog.css';

export default class ShareDialog extends React.Component {

  constructor(props) {
    super(props);
    this._displayShareDialogClicked = this._displayShareDialogClicked.bind(this);
    this._copyLinkToClipboard = this._copyLinkToClipboard.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);

    this.state = {
      displayShareDialog: false,
      dialogPosition: {}
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
    this.setState({
      displayShareDialog: false
    });
  }

  _displayShareDialogClicked(event) {
    // If displayed remove from dom
    if (this.state.displayShareDialog) {
      this._hideDialogAndRemoveListener();
      // else display dialog
    } else {
      document.addEventListener('mousedown', this._handleClickOutside);
      this.setState({
        displayShareDialog: true,
        dialogPosition: this._computeDialogPositionFromButton(event.target)
      });
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
        <Button label={'Share'} type={'action'} icon={'share2'} onClick={this._displayShareDialogClicked} disabled={this.props.disabled} />
        {this.state.displayShareDialog && this._renderDialog()}
      </div>
    );
  }

}

/**
 *
 *  Object which contains all props for the Proptable in Kitchensink
 *  Each prop should be passed as key-value pair following this scheme:
 *
 *  propName:{isRequired(bool): true|false, type(string): 'String|Bool|OneOf|...', default(string): 'defaultValue', description(string): 'This prop changes...'}
 *
 *  Note: default is only required if isRequired is false.
 *
 */

ShareDialog.docProps = [
  { propName: 'position', isRequired: true, type: 'oneOf: bottom-right bottom-left top-right top-left', defaultValue: 'right', description: 'Choose where the dialog appears relative to the share button.' },
  { propName: 'link', isRequired: true, type: 'String', defaultValue: '', description: 'Link that is in the textbox.' },
  { propName: 'disabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the share dialog.' }
];

ShareDialog.displayName = 'ShareDialog';

ShareDialog.defaultProps = {
  disabled: false
};

ShareDialog.propTypes = {
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']).isRequired,
  link: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};
