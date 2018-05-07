import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './modal.css';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button from '../Button/Button';

const Modal = (props) => {

  const ModalContent = (
    <Fragment>
      <div styleName={'titleBar'}>
        {props.titleLabel}
      </div>
      <div styleName={'contentContainer'}>
        <div styleName={'content'}>
          {props.content}
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div styleName="modalOverlay">
        <div styleName={classNames('modalContainer', props.size)}>
          {props.isLoading ? <Loader /> : ModalContent}
          <ButtonBar rightButtonSectionElements={[<Button label={'Cancel'} onClick={props.closeButtonClicked} />]} />
        </div>
      </div>
    </Fragment>
  );
};

/**
 *
 *  Object which contains all props for the Proptable in Kitchensink
 *  Each prop should be passed as key-value pair following this scheme:
 *
 *  propName:{isRequired(bool): true|false, type(string): 'String|Bool|OneOf|...', default(string): 'defaultValue', description(string): 'This prop changes...'}
 *
 *  Note: default is only required if isRequired is false.
 *
 */

Modal.docProps = [

];

Modal.displayName = 'Modal';

Modal.defaultProps = {
  isLoading: false,
  buttonBarElements: [],
  shareLink: '',
  previousButtonClicked: () => null,
  nextButtonClicked: () => null,
  closeButtonClicked: () => null
};

Modal.propTypes = {
  isLoading: PropTypes.bool,
  titleLabel: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  size: PropTypes.oneOf(['small', 'large', 'xlarge']).isRequired,
  buttonBarElements: PropTypes.arrayOf(PropTypes.element),
  shareLink: PropTypes.string,
  previousButtonClicked: PropTypes.func,
  nextButtonClicked: PropTypes.func,
  closeButtonClicked: PropTypes.func
};

export default Modal;
