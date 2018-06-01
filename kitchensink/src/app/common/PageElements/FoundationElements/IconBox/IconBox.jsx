import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './iconBox.css';

const copyStringToClipboard = (copyString) => {
  const textarea = document.createElement('textarea');
  textarea.textContent = copyString;
  textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy'); // Security exception may be thrown by some browsers.
  } catch (ex) {
    console.warn('Copy to clipboard failed.', ex);
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
};


export default class IconBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCopyNotification: false,
    };
  }

  handleIconClick = (name, downloadable) => {
    if (!downloadable) {
      this.displayCopyNotifier(1000);
      copyStringToClipboard(name);
    } else {
      return console.log('start download');
    }
  };

  displayCopyNotifier = (displayTime) => {
    this.setState(() => ({
        displayCopyNotification: true
      }),
      () => {
        setTimeout(() => (
          this.setState(() => ({
            displayCopyNotification: false
          }))
        ), displayTime)
      }
    );
  };

  render() {
    return (
      <div styleName={classNames('iconBox', { disabled: this.props.disabled })} onClick={() => this.handleIconClick(this.props.name, this.props.downloadable)}>

        {this.props.name && !this.props.downloadable ?
          <span styleName={'icon'} className={`pyreneIcon-${this.props.name}`} />
          :
          <span styleName={'svg'} style={{backgroundImage: `url("${this.props.path}")`}}/>
        }

        <span styleName={'iconBoxTooltip'}>{this.props.name}</span>
        <span styleName={classNames('copyNotification', {display: this.state.displayCopyNotification})}>Copied</span>
      </div>
    );
  }
}


IconBox.displayName = 'iconBox';

IconBox.propTypes = {
  disabled: PropTypes.bool,
  downloadable: PropTypes.bool,
  name: PropTypes.string,
  path: PropTypes.string,
};

IconBox.defaultProps = {
  name: '',
  path: '',
  disabled: false,
  downloadable: false,
};

