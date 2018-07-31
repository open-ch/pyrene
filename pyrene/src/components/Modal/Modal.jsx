import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './modal.css';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import ArrowButton from '../ArrowButton/ArrowButton';


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

  renderNavigationArrows = () => (
    <div styleName={'arrowButtonContainer'}>
      <ArrowButton direction={'down'} onClick={this.props.onNextArrowClick} disabled={!this.props.canNext} />
      <div style={{width: 16}} />
      <ArrowButton direction={'up'} onClick={this.props.onPreviousArrowClick} disabled={!this.props.canPrevious} />
    </div>
  );

  renderContent = () => (
    <Fragment>
      <div styleName={'titleBar'}>
        {this.props.titleLabel}
        {this.props.displayNavigationArrows && this.renderNavigationArrows()}
      </div>
      <div styleName={'contentContainer'}>
        <div styleName={'content'}>
          {this.props.content}
        </div>
      </div>
    </Fragment>
  );

  renderLoader = () => (
    <div styleName={'loaderContainer'}>
      <Loader size={'large'} />
    </div>
  );

  render() {
    return (
      <Fragment>
        <div styleName="modalOverlay">
          <div styleName={classNames('modalContainer', this.props.size)} role="dialog">
            {this.props.loading ? this.renderLoader() : this.renderContent()}
            <ButtonBar rightButtonSectionElements={[<Button label={'Cancel'} onClick={this.props.onClose}/>]}/>
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
  onPreviousArrowClick: () => null,
  onNextArrowClick: () => null,
  displayNavigationArrows: false,
  onClose: () => null,
  canNext: false,
  canPrevious: false,
};

Modal.propTypes = {
  /**
   * Specifies the buttons that are displayed on the bottom of the modal
   */
  buttonBarElements: PropTypes.arrayOf(PropTypes.element),
  /**
   * Enables next arrow button
   */
  canNext: PropTypes.bool,
  /**
   * Enables previous arrow button
   */
  canPrevious: PropTypes.bool,
  /**
   * Content displayed by Modal
   */
  content: PropTypes.element.isRequired,
  /**
   * Hide or show the navigationArrows in the upper right corner.
   */
  displayNavigationArrows: PropTypes.bool,
  /**
   * Displays a loader when true
   */
  loading: PropTypes.bool,
  /**
   * Closebutton clickhandler
   */
  onClose: PropTypes.func,
  /**
   * Top right next button click handler
   */
  onNextArrowClick: PropTypes.func,
  /**
   * Top right previous button click handler
   */
  onPreviousArrowClick: PropTypes.func,
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
