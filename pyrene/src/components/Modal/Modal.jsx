import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './modal.css';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import ActionBar from '../ActionBar/ActionBar';


/**
 * The modal view is used when full attention on an action or a process is required. The modal has an invasive experience and no other interactions on the main page can be accessed while active.
 *
 * Good examples are, for instance, wizards (step by step processes), creation of a new object or when a destructive action is performed, such as the editing or deletion of an object.
 * A modal is triggered by a action and may contain one ore more buttons or links. A modal is centered in the viewport and can be closed by a button or a close icon.
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
    if (event.key === 'Escape' && this.props.escape) {
      this.props.onClose();
    }
  };

  renderNavigationArrows = () => (
    <ActionBar
      styling="box"
      actions={[
        {
          iconName: 'chevronDown',
          color: 'neutral300',
          active: this.props.canNext,
          onClick: this.props.onNextArrowClick,
        },
        {
          iconName: 'chevronUp',
          color: 'neutral300',
          active: this.props.canPrevious,
          onClick: this.props.onPreviousArrowClick,
        },
      ]}
    />
  );

  renderContent = () => (
    <>
      <div styleName="titleBar">
        <span styleName="title">
          {this.props.title}
        </span>
        <div styleName="topRightSection">
          {this.props.displayNavigationArrows && this.renderNavigationArrows()}
          <div styleName="closeButtonContainer">
            <ActionBar
              styling="none"
              actions={[
                {
                  iconName: 'delete',
                  color: 'neutral300',
                  active: true,
                  onClick: this.props.onClose,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div styleName={classNames('contentContainer', { contentScrolling: this.props.contentScrolling })}>
        <div styleName={classNames('content', { contentPadding: this.props.contentPadding }, { contentScrolling: this.props.contentScrolling }, { overlay: this.props.processing })}>
          {this.props.renderCallback()}
        </div>
      </div>
    </>
  );

  renderLoader = () => (
    <div styleName="loaderContainer">
      <Loader size="large" />
    </div>
  );

  createButtonArray = (buttonInfo) => buttonInfo.map((buttonProps) => (
    <Button
      loading={buttonProps.loading}
      icon={buttonProps.icon}
      type={buttonProps.type}
      label={buttonProps.label}
      disabled={buttonProps.disabled}
      onClick={buttonProps.action}
    />
  ));

  render() {
    return (
      <>
        <div styleName="modalOverlay">
          <div styleName={classNames('modalContainer', this.props.size)} role="dialog">
            {this.props.loading ? this.renderLoader() : this.renderContent()}
            {this.props.Footer()
              ? this.props.Footer()
              : (
                <div styleName="buttonBarContainer">
                  <ButtonBar
                    rightButtonSectionElements={this.createButtonArray(this.props.rightButtonBarElements)}
                    leftButtonSectionElements={this.createButtonArray(this.props.leftButtonBarElements)}
                  />
                </div>
              )}
          </div>
        </div>
      </>
    );
  }

}

Modal.displayName = 'Modal';

Modal.defaultProps = {
  loading: false,
  processing: false,
  rightButtonBarElements: [],
  leftButtonBarElements: [],
  onPreviousArrowClick: () => null,
  onNextArrowClick: () => null,
  displayNavigationArrows: false,
  onClose: () => null,
  canNext: false,
  canPrevious: false,

  contentPadding: true,
  contentScrolling: true,

  escape: true,

  Footer: () => null,
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
   * Whether the content is padded with the standard padding.
   */
  contentPadding: PropTypes.bool,
  /**
   * Whether the content is scrollable.
   */
  contentScrolling: PropTypes.bool,
  /**
   * Whether to display the navigationArrows in the upper right corner.
   */
  displayNavigationArrows: PropTypes.bool,
  /**
   * Whether to close modal when escape key is hit.
   */
  escape: PropTypes.bool,
  /**
   * Custom Component renderer. Replaces the button bar at the bottom.
   */
  Footer: PropTypes.func,
  /**
   * Sets the buttons that are displayed on the bottom left of the modal.
   * Type: [{ icon: string, type: string (required), label: string (required), action: func (required)}]
   */
  leftButtonBarElements: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
  /**
   * Called when the user hits the close button or the escape key.
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
   * Sets the processing state.
   */
  processing: PropTypes.bool,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: PropTypes.func.isRequired,
  /**
   * Sets the buttons that are displayed on the bottom right of the modal.
   * Type: [{ icon: string, type: string (required), label: string (required), action: func (required)}]
   */
  rightButtonBarElements: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
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
