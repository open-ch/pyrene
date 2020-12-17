import React from 'react';
import { mount, shallow } from 'enzyme';

import Modal, { ModalProps } from './Modal';
import ButtonBar from '../ButtonBar/ButtonBar';

const props = {
  title: 'titleLabel',
  size: 'large',
  renderCallback: () => <div>Content</div>,
} as ModalProps;

const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });

describe('<Modal />', () => {
  it('renders without crashing', () => {
    shallow(<Modal {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<Modal {...props} />);

    expect(rendered.find('.titleBar')).toHaveLength(1);
    expect(rendered.contains(props.title)).toBe(true);

    expect(rendered.find('.contentContainer')).toHaveLength(1);
    expect(rendered.contains(props.renderCallback())).toBe(true);
    expect(rendered.find(ButtonBar)).toHaveLength(1);
  });

  it('closes modal when escape key is supported', () => {
    const mockOnClose = jest.fn();
    mount(<Modal {...props} onClose={mockOnClose} />);
    document.dispatchEvent(escapeEvent);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not close modal when escape key is not supported', () => {
    const mockOnClose = jest.fn();
    shallow(<Modal {...props} onClose={mockOnClose} closeOnEscape={false} />);
    document.dispatchEvent(escapeEvent);
    expect(mockOnClose).toHaveBeenCalledTimes(0);
  });
});
