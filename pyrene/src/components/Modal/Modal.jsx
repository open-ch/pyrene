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
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = (event) => {
    if (event.key === 'Escape') {
      this.props.onESC();
    }
  };

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

  createButtonArray = (buttonInfo) => {
    return buttonInfo.map(buttonProps => (
      <Button
        icon={buttonProps.icon}
        type={buttonProps.type}
        label={buttonProps.label}
        disabled={buttonProps.disabled}
        onClick={buttonProps.action}
      />));
  };

  render() {
    return (
      <Fragment>
        <div styleName="modalOverlay">
          <div styleName={classNames('modalContainer', this.props.size)} role="dialog">
            {this.props.loading ? this.renderLoader() : this.renderContent()}
            <div styleName="buttonBarContainer">
              <ButtonBar
                rightButtonSectionElements={this.createButtonArray(this.props.rightButtonBarElements)}
                leftButtonSectionElements={this.createButtonArray(this.props.leftButtonBarElements)}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

Modal.displayName = 'Modal';

Modal.defaultProps = {
  loading: false,
  rightButtonBarElements: [],
  leftButtonBarElements: [],
  onPreviousArrowClick: () => null,
  onNextArrowClick: () => null,
  displayNavigationArrows: false,
  onESC: () => null,
  canNext: false,
  canPrevious: false,
};

Modal.propTypes = {
  /**
   * Whether interaction with the next button is allowed.
   */
  canNext: PropTypes.bool,
  /**
   * Whether interaction with the previous button is allowed.
   */
  canPrevious: PropTypes.bool,
  /**
   * Whether to display the navigationArrows in the upper right corner.
   */
  displayNavigationArrows: PropTypes.bool,
  /**
   * Sets the buttons that are displayed on the bottom left of the modal.
   */
  leftButtonBarElements: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  })),
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
  /**
   * Called when the user hits the escape button.
   */
  onESC: PropTypes.func,
  /**
   * Called when the user clicks on the next button.
   */
  onNextArrowClick: PropTypes.func,
  /**
   * Called when the user clicks on the previous button.
   */
  onPreviousArrowClick: PropTypes.func,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: PropTypes.func.isRequired,
  /**
   * Sets the buttons that are displayed on the bottom right of the modal.
   * Type: [{ icon: string, type: string (required), label: string (required), action: func (required)}]
   */
  rightButtonBarElements: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  })),
  /**
   * Sets the size.
   */
  size: PropTypes.oneOf(['small', 'large', 'xlarge']).isRequired,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
};
