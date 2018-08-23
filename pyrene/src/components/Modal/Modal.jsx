import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './modal.css';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import ArrowButton from '../ArrowButton/ArrowButton';


/**
 * I modal for calvin klein.
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
        {this.props.title}
        {this.props.displayNavigationArrows && this.renderNavigationArrows()}
      </div>
      <div styleName={'contentContainer'}>
        <div styleName={'content'}>
          {this.props.renderCallback()}
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
   * Sets the buttons that are displayed on the bottom of the modal.
   */
  buttonBarElements: PropTypes.arrayOf(PropTypes.element),
  /**
   * Whether interaction with the next button is allowed.
   */
  canNext: PropTypes.bool,
  /**
   * Whether interaction with the previous button is allowed.
   */
  canPrevious: PropTypes.bool,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: PropTypes.func.isRequired,
  /**
   * Whether to display the navigationArrows in the upper right corner.
   */
  displayNavigationArrows: PropTypes.bool,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
  /**
   * Called when the user clicks on the close button.
   */
  onClose: PropTypes.func,
  /**
   * Called when the user clicks on the next button.
   */
  onNextArrowClick: PropTypes.func,
  /**
   * Called when the user clicks on the previous button.
   */
  onPreviousArrowClick: PropTypes.func,
  /**
   * Sets the size.
   */
  size: PropTypes.oneOf(['small', 'large', 'xlarge']).isRequired,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
};
