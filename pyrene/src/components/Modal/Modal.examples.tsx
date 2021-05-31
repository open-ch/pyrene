import React from 'react';
import Placeholder from '../../examples/Placeholder';

// eslint-disable-next-line no-alert
function alertClickedButton(buttonLabel:string):void { alert(`${buttonLabel} button clicked`); }

const Modal = {
  props: {
    renderCallback: function displayPlaceHolder(): React.ReactElement {
      return (<Placeholder label="Hit ESC to close the Modal" width={392} />);
    },
    canNext: true,
    canPrevious: true,
    displayNavigationArrows: true,
    size: 'small',
    title: 'Modal',
    leftButtonBarElements: [
      { type: 'danger', label: 'Delete', action: ():void => alertClickedButton('Delete') },
      { type: 'ghost', label: 'Disabled', action: ():void => alertClickedButton('Disabled') },
    ],
    rightButtonBarElements: [
      { type: 'secondary', label: 'Cancel', action: ():void => alertClickedButton('Cancel') },
      { type: 'primary', label: 'Apply', action: ():void => alertClickedButton('Apply') },
    ],
    defaultExpanded: true,
    renderFooter: true,
    renderHeader: true,
  },
  trigger: true,
  category: '',
};

Modal.category = 'Layout';
export default Modal;
