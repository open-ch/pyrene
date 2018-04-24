import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';
import ButtonBar from '../ButtonBar/ButtonBar';

import './shareDialog.css';

export default class ShareDialog extends React.Component {

  constructor(props) {
    super(props);
    this._displayShareDialogClicked = this._displayShareDialogClicked.bind(this);
    this._copyLinkToClipboard = this._copyLinkToClipboard.bind(this);

    this.state = {
      displayShareDialog: false,
      dialogPosition: {
        top: 0,
        left: 0
      }
    };

  }

  componentDidMount() {
  }

  componentDidUpdate(){
    if (this.state.displayShareDialog){
      this._focusAndSelectInput();
    }
  }

  _copyLinkToClipboard() {
    document.execCommand("copy");
    this._displayShareDialogClicked();
  }

  _displayShareDialogClicked(event) {
    // If displayed remove from dom
    if (this.state.displayShareDialog){
      this.setState({
        displayShareDialog: false
      })

      // else display dialog
    } else {
      this.setState({
        displayShareDialog: true,
        dialogPosition: this._computeDialogPositionFromButton(event.target.getBoundingClientRect().width,
          event.target.getBoundingClientRect().height,
          event.target.getBoundingClientRect().right,
          event.target.getBoundingClientRect().left,
          event.target.getBoundingClientRect().top,
          event.target.getBoundingClientRect().bottom)
      });

    }
  }

  _computeDialogPositionFromButton (width, height, right, left, top, bottom) {
    const dialogPosition = {top: 0, right: 0};
    if (this.props.position === 'left') {
      dialogPosition.top = top + height + 5;
      dialogPosition.left = right - 400; // 400 px is the share Dialog width
    } else if (this.props.position === 'right') {
      dialogPosition.top = top + height + 5;
      dialogPosition.left = left;
    }

    return dialogPosition;
  }

  _focusAndSelectInput () {
    this.textInput.focus();
    this.textInput.select();
  }

  _renderDialog () {
    return (
      <div styleName={'shareDialog'} style={{top: this.state.dialogPosition.top, left: this.state.dialogPosition.left}}>
        <div styleName={'title'}>
          Share this link
        </div>
        <div styleName={'content'}>
          <input type={'text'} readOnly={true} value={this.props.link} ref={(input) => { this.textInput = input; }} />
        </div>
        <ButtonBar rightButtonSectionElements={[<Button type={'ghost'} label={'Copy link'} onClick={this._copyLinkToClipboard}/>, <Button label={'Close'} onClick={this._displayShareDialogClicked}/>]}/>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button label={'Share'} type={'action'} icon={'+'} onClick={this._displayShareDialogClicked} />
        {this.state.displayShareDialog && this._renderDialog()}
      </React.Fragment>
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
  {propName: 'position', isRequired: true, type: 'oneOf: left right', defaultValue: 'left', description: 'Choose where the dialog appears relative to the share button.'},
  {propName: 'link', isRequired: true, type: 'String', defaultValue: '', description: 'Link that is in the textbox.'},
  {propName: 'isDisabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the share dialog.'}
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