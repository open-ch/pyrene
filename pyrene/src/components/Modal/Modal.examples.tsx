import React from 'react';
import Placeholder from '../../examples/Placeholder';


const findTriggerButton = () => {
  const buttons = document.getElementsByTagName('button');
  const searchText = 'Trigger Modal';
  const buttonArray = Array.from(buttons);

  return buttonArray.filter((button) => button.textContent === searchText)[0];
};

const closeModal = (): void => {
  findTriggerButton()?.click();
};

// eslint-disable-next-line no-alert
function alertClickedButton(buttonLabel:string):void { alert(`${buttonLabel} button clicked`); }

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
      { type: 'danger', label: 'Delete', action: ():void => alertClickedButton('Delete') },
      { type: 'ghost', label: 'Disabled', action: ():void => alertClickedButton('Disabled') },
    ],
    rightButtonBarElements: [
      { type: 'secondary', label: 'Cancel', action: closeModal },
      { type: 'primary', label: 'Apply', action: ():void => alertClickedButton('Apply') },
    ],
    defaultExpanded: false,
    onClose: closeModal,
    renderFooter: true,
    renderHeader: true,
  },
  trigger: true,
  category: '',
};

Modal.category = 'Layout';
export default Modal;
