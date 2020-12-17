import React from 'react';
import Placeholder from '../../examples/Placeholder';

const Modal = {
  props: {
    renderCallback: function displayPlaceHolder(): React.ReactElement {
      return (<Placeholder label="Content" width={392} />);
    },
    canNext: true,
    canPrevious: true,
    displayNavigationArrows: true,
    size: 'small',
    title: 'Modal',
    leftButtonBarElements: [
      { type: 'danger', label: 'Delete', onClick: ():void => {} },
      { type: 'ghost', label: 'Disabled', onClick: (): void => {} },
    ],
    rightButtonBarElements: [
      { type: 'secondary', label: 'Cancel', onClick: (): void => {} },
      { type: 'primary', label: 'Apply', onClick: (): void => {} },
    ],
    defaultExpanded: true,
  },
  trigger: true,
  category: '',
};

Modal.category = 'Layout';
export default Modal;
