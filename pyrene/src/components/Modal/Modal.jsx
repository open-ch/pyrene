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
          {props.loading ? <Loader /> : ModalContent}
          <ButtonBar rightButtonSectionElements={[<Button label={'Cancel'} onClick={props.closeButtonClicked} />]} />
        </div>
      </div>
    </Fragment>
  );
};

Modal.displayName = 'Modal';

Modal.defaultProps = {
  loading: false,
  buttonBarElements: [],
  previousButtonClicked: () => null,
  nextButtonClicked: () => null,
  closeButtonClicked: () => null
};

Modal.propTypes = {
  loading: PropTypes.bool,
  titleLabel: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  size: PropTypes.oneOf(['small', 'large', 'xlarge']).isRequired,
  buttonBarElements: PropTypes.arrayOf(PropTypes.element),
  previousButtonClicked: PropTypes.func,
  nextButtonClicked: PropTypes.func,
  closeButtonClicked: PropTypes.func
};

export default Modal;
