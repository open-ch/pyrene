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
      dialogPosition: {
        top: 0,
        left: 0
      }
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
    const dialogPosition = { top: 0, right: 0 };

    if (this.props.position === 'left') {
      dialogPosition.top = targetRect.height + 5;
      dialogPosition.left = targetRect.width - 400; // 400 px is the share Dialog width
    } else if (this.props.position === 'right') {
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
      <div className={'unSelectable'} styleName={'shareDialog'} style={{ top: this.state.dialogPosition.top, left: this.state.dialogPosition.left }}>
        <div styleName={'title'}>
          Share this link
        </div>
        <div styleName={'content'}>
          <input type={'text'} value={this.props.link} ref={(input) => { this.textInput = input; }} readOnly />
        </div>
        <ButtonBar rightButtonSectionElements={[<Button type={'ghost'} label={'Copy link'} onClick={this._copyLinkToClipboard} />, <Button label={'Close'} onClick={this._displayShareDialogClicked} />]} />
      </div>
    );
  }

  render() {
    return (
      <div styleName="shareDialogContainer" ref={(dialog) => { this.dialogRef = dialog; }}>
        <Button label={'Share'} type={'action'} icon={'share2'} onClick={this._displayShareDialogClicked} isDisabled={this.props.isDisabled} />
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
  { propName: 'position', isRequired: true, type: 'oneOf: left right', defaultValue: 'left', description: 'Choose where the dialog appears relative to the share button.' },
  { propName: 'link', isRequired: true, type: 'String', defaultValue: '', description: 'Link that is in the textbox.' },
  { propName: 'isDisabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the share dialog.' }
];

ShareDialog.displayName = 'ShareDialog';

ShareDialog.defaultProps = {
  isDisabled: false
};

ShareDialog.propTypes = {
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  link: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool
};
