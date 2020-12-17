import React from 'react';
import Placeholder from '../../examples/Placeholder';

const Modal = {
  props: {
    renderCallback: () => <Placeholder label="Content" width={392} />,
    canNext: true,
    canPrevious: true,
    displayNavigationArrows: true,
    size: 'small',
    title: 'Modal',
    leftButtonBarElements: [{ type: 'danger', label: 'Delete', onClick: () => null }, { type: 'ghost', label: 'Disabled', onClick: () => null }],
    rightButtonBarElements: [{ type: 'secondary', label: 'Cancel', onClick: () => null }, { type: 'primary', label: 'Apply', onClick: () => null }],
    defaultExpanded: true,
  },
  trigger: true,
  category: '',
};

Modal.category = 'Layout';
export default Modal;
