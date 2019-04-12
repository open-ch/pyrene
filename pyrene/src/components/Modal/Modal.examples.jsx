import React from 'react';
import Placeholder from '../../examples/Placeholder';

const examples = {
  props: {
    renderCallback: () => <Placeholder label="Content" width={392} />, // eslint-disable-line react/display-name
    canNext: true,
    canPrevious: true,
    displayNavigationArrows: true,
    size: 'small',
    title: 'Modal',
    rightButtonBarElements: [{ type: 'secondary', label: 'Cancel', action: () => null }, { type: 'primary', label: 'Apply', action: () => null }],
    defaultExpanded: true,
  },
  trigger: true,
};

export default examples;
