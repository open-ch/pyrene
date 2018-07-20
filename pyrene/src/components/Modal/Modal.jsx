import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './modal.css';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

/**
 * I'm pretty modal.
 *
 */
export default class Modal extends React.Component {

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  modalContent = (
    <Fragment>
      <div styleName={'titleBar'}>
        {this.props.titleLabel}
      </div>
      <div styleName={'contentContainer'}>
        <div styleName={'content'}>
          {this.props.content}
        </div>
      </div>
    </Fragment>
  );

  render() {
    return (
      <Fragment>
        <div styleName="modalOverlay">
          <div styleName={classNames('modalContainer', this.props.size)} role="dialog">
            {this.props.loading ? <Loader/> : this.modalContent}
            <ButtonBar rightButtonSectionElements={[<Button label={'Cancel'} onClick={this.props.closeButtonClicked}/>]}/>
          </div>
        </div>
      </Fragment>
    );
  }
};

Modal.displayName = 'Modal';

Modal.defaultProps = {
  loading: false,
  buttonBarElements: [],
  previousButtonClicked: () => null,
  nextButtonClicked: () => null,
  closeButtonClicked: () => null,
};

Modal.propTypes = {
  /**
   * Specifies the buttons that are displayed on the bottom of the modal
   */
  buttonBarElements: PropTypes.arrayOf(PropTypes.element),
  /**
   * Closebutton clickhandler
   */
  closeButtonClicked: PropTypes.func,
  /**
   * Content displayed by Modal
   */
  content: PropTypes.element.isRequired,
  /**
   * Displays a loader when true
   */
  loading: PropTypes.bool,
  /**
   * Top right next button click handler
   */
  nextButtonClicked: PropTypes.func,
  /**
   * Top right previous button click handler
   */
  previousButtonClicked: PropTypes.func,
  /**
   * Specifies the size
   */
  size: PropTypes.oneOf(['small', 'large', 'xlarge']).isRequired,
  /**
   * Sets the title
   */
  titleLabel: PropTypes.string.isRequired,
};

Modal.needsTrigger = true;
