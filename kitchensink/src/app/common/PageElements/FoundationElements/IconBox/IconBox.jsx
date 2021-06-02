import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Utils from '../../../Utils';
import styles from './iconBox.css';

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
      <div className={clsx(styles.iconBox, { [styles.disabled]: this.props.disabled })} onClick={() => this.handleIconClick(this.props.name, this.props.downloadable)}>

        {this.props.name && !this.props.downloadable
          ? <span className={clsx(styles.icon, `pyreneIcon-${this.props.name}`)} />
          : <span className={styles.svg} style={{ backgroundImage: `url("${this.props.path}")` }} />}

        <span className={styles.iconBoxTooltip}>{this.props.name}</span>
        <span className={clsx(styles.copyNotification, { [styles.display]: this.state.displayCopyNotification })}>Copied</span>
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
