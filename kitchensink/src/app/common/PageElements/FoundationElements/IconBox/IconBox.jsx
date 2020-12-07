import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Utils from '../../../Utils';

import './iconBox.css';


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
      Utils.copyStringToClipboard(name);
    }
  };

  displayCopyNotifier = (displayTime) => {
    this.setState(() => ({
      displayCopyNotification: true,
    }),
    () => {
      setTimeout(() => (
        this.setState(() => ({
          displayCopyNotification: false,
        }))
      ), displayTime);
    });
  };

  render() {
    return (
      <div styleName={classNames('iconBox', { disabled: this.props.disabled })} onClick={() => this.handleIconClick(this.props.name, this.props.downloadable)}>

        {this.props.name && !this.props.downloadable
          ? <span styleName="icon" className={`pyreneIcon-${this.props.name}`} />
          : <span styleName="svg" style={{ backgroundImage: `url("${this.props.path}")` }} />}

        <span styleName="iconBoxTooltip">{this.props.name}</span>
        <span styleName={classNames('copyNotification', { display: this.state.displayCopyNotification })}>Copied</span>
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
