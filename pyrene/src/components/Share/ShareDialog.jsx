import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';
import Button from '../Button/Button';
import ButtonBar from '../ButtonBar/ButtonBar';
import classNames from 'classnames';

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
          isOpen={this.state.displayShareDialog}
          position={[this.props.position ]}
          align={this.props.align}
          padding={16}
          onClickOutside={() => this.setState({ displayShareDialog: false })}
          containerStyle={{
            borderRadius: '4px',
            boxSizing: 'borderBox',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px -2px rgba(0, 21, 44, 0.2), 0 0 1px 0 rgba(0, 21, 44, 0.3)',
            zIndex: 9999
          }}
          disableReposition
          content={({ position, nudgedLeft, nudgedTop, targetRect, popoverRect }) => (
            <div className={'unSelectable'} styleName={'shareDialog'} role="dialog">
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
  position: 'bottom-right',
};

ShareDialog.propTypes = {
  /**
   * Alignment of the dialogue
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Choose where the dialog appears relative to the share button.
   */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * Link that is in the share dialog.
   */
  link: PropTypes.string.isRequired,
  /**
   * Disables any interaction with the share dialog.
   */
  disabled: PropTypes.bool,
};
