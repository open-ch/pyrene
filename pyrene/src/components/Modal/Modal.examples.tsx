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
      { type: 'danger', label: 'Delete', action: ():void => {} },
      { type: 'ghost', label: 'Disabled', action: (): void => {} },
    ],
    rightButtonBarElements: [
      { type: 'secondary', label: 'Cancel', action: (): void => {} },
      { type: 'primary', label: 'Apply', action: (): void => {} },
    ],
    defaultExpanded: true,
    renderFooter: false,
    renderHeader: false,
  },
  trigger: true,
  category: '',
};

Modal.category = 'Layout';
export default Modal;
