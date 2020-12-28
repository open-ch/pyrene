import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import './modal.css';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button, { Type as ButtonType } from '../Button/Button';
import Loader from '../Loader/Loader';
import ActionBar from '../ActionBar/ActionBar';

interface ButtonBarProps{
  action: () => void,
  disabled?: boolean,
  icon?: string,
  label: string,
  loading?: boolean,
  type: ButtonType,
}

export interface ModalProps {
  /**
   * Whether interaction with the next button is allowed.
   */
  canNext?: boolean,
  /**
   * Whether interaction with the previous button is allowed.
   */
  canPrevious?: boolean,
  /**
   * Whether to close modal when escape key is hit.
   */
  closeOnEscape?: boolean,
  /**
   * Whether the content is padded with the standard padding.
   */
  contentPadding?: boolean,
  /**
   * Whether the content is scrollable.
   */
  contentScrolling?: boolean,
  /**
   * Whether to display the navigationArrows in the upper right corner.
   */
  displayNavigationArrows?: boolean,
  /**
   * Custom Component renderer. Replaces the button bar at the bottom.
   */
  Footer?: () => React.ReactElement,
  /**
   * Sets the buttons that are displayed on the bottom left of the modal.
   * Type: [{ icon: string, type: string (required), label: string (required), onClick: func (required)}]
   */
  leftButtonBarElements?: ButtonBarProps[],
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean,
  /**
   * Called when the user hits the close button or the escape key.
   */
  onClose?: () => void,
  /**
   * Called when the user clicks on the next button.
   */
  onNextArrowClick?: () => void,
  /**
   * Called when the user clicks on the previous button.
   */
  onPreviousArrowClick?: () => void,
  /**
   * Sets the processing state.
   */
  processing?: boolean,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: () => React.ReactElement,
  /**
   * Displays the Footer section of the Modal.
   */
  renderFooter?: boolean,
  /**
   * Displays the header section of the Modal.
   */
  renderHeader?: boolean,
  /**
   * Sets the buttons that are displayed on the bottom right of the modal.
   * Type: [{ icon: string, type: string (required), label: string (required), onClick: func (required)}]
   */
  rightButtonBarElements?: ButtonBarProps[],
  /**
   * Sets the size.
   */
  size: 'small' | 'large' | 'xlarge',
  /**
   * Sets the title.
   */
  title?: string,
}


/**
 * The modal view is used when full attention on an action or a process is required. The modal has an invasive experience and no other interactions on the main page can be accessed while active.
 *
 * Good examples are, for instance, wizards (step by step processes), creation of a new object or when a destructive action is performed, such as the editing or deletion of an object.
 * A modal is triggered by a action and may contain one ore more buttons or links. A modal is centered in the viewport and can be closed by a button or a close icon.
 */

const Modal: React.FC<ModalProps> = ({
  canNext = false,
  canPrevious = false,
  closeOnEscape = true,
  contentPadding = true,
  contentScrolling = true,
  displayNavigationArrows = false,
  Footer,
  leftButtonBarElements = [],
  loading = false,
  onClose,
  onNextArrowClick,
  onPreviousArrowClick,
  processing = false,
  renderCallback,
  renderFooter = true,
  renderHeader = true,
  rightButtonBarElements = [],
  size,
  title = '',
}: ModalProps) => {

  const escFunction = useCallback((event:KeyboardEvent) => {
    if (onClose && event.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [onClose, closeOnEscape]);


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const createButtonArray = (buttonInfo: ButtonBarProps[]) => (
    buttonInfo.map((buttonProps) => (
      <Button
        loading={buttonProps.loading}
        icon={buttonProps.icon}
        type={buttonProps.type}
        label={buttonProps.label}
        disabled={buttonProps.disabled}
        onClick={buttonProps.action}
      />
    ))
  );

  const renderNavigationArrows = () => (
    <ActionBar
      styling="box"
      actions={[
        {
          iconName: 'chevronDown',
          color: 'neutral300',
          active: canNext,
          onClick: onNextArrowClick,
        },
        {
          iconName: 'chevronUp',
          color: 'neutral300',
          active: canPrevious,
          onClick: onPreviousArrowClick,
        },
      ]}
    />
  );

  const renderFooterSection = () => (
    <>
      {(Footer && Footer()) || (
        <div styleName="buttonBarContainer">
          <ButtonBar
            rightButtonSectionElements={createButtonArray(rightButtonBarElements)}
            leftButtonSectionElements={createButtonArray(leftButtonBarElements)}
          />
        </div>
      )}
    </>
  );

  const renderHeaderSection = () => (
    <>
      <div styleName="titleBar">
        <span styleName="title">
          {title}
        </span>
        <div styleName="topRightSection">
          {displayNavigationArrows && renderNavigationArrows()}
          <div styleName="closeButtonContainer">
            <ActionBar
              styling="none"
              actions={[
                {
                  iconName: 'delete',
                  color: 'neutral300',
                  active: true,
                  onClick: onClose,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderContent = () => (
    <>
      {renderHeader && renderHeaderSection()}
      <div styleName={classNames('contentContainer', { contentScrolling: contentScrolling })}>
        <div styleName={classNames('content', { contentPadding: contentPadding }, { contentScrolling: contentScrolling }, { overlay: processing })}>
          { renderCallback() }
        </div>
      </div>
    </>
  );

  const renderLoader = () => (
    <div styleName="loaderContainer">
      <Loader size="large" />
    </div>
  );

  return (
    <>
      <div styleName="modalOverlay">
        <div styleName={classNames('modalContainer', size)} role="dialog">
          {loading ? renderLoader() : renderContent()}
          {renderFooter && renderFooterSection()}
        </div>
      </div>
    </>
  );
};

Modal.displayName = 'Modal';

export default Modal;
