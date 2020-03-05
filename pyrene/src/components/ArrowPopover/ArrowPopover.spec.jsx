import React from 'react';

import ArrowPopover, { arrowPosition } from './ArrowPopover';

const props = {
  displayPopover: false,
  popoverContent: <div />,
};

const children = <div />;

describe('<ArrowPopover />', () => {
  it('renders without crashing', () => {
    shallow(
      <ArrowPopover {...props}>
        {children}
      </ArrowPopover>,
    );
  });

  describe('arrowPosition ', () => {
    it('position top', () => {
      // Square
      const lengthSide = 20;
      const arrowWidth = (lengthSide * Math.sqrt(2)) / 2;

      const popoverRect = {
        top: 100,
        left: 100,
        height: 100,
        width: 400,
      };

      const targetRect = {
        top: 200,
        left: 200,
        height: 40,
        width: 40,
      };

      const result = arrowPosition('top', targetRect, popoverRect);

      expect(result).toEqual({ top: popoverRect.height - arrowWidth, left: result.left, lengthSide });
      expect(result.left).not.toEqual(popoverRect.width - 2 * arrowWidth);
    });

    it('position top and too far left (overflow)', () => {

      // Square
      const lengthSide = 20;
      const arrowWidth = (lengthSide * Math.sqrt(2)) / 2;

      const popoverRect = {
        top: 100,
        left: 100,
        height: 100,
        width: 100,
      };

      const targetRect = {
        top: 200,
        left: 200,
        height: 40,
        width: 40,
      };

      const result = arrowPosition('top', targetRect, popoverRect);

      const left = popoverRect.width - 2 * arrowWidth;

      expect(result).toEqual({ top: popoverRect.height - arrowWidth, left, lengthSide });
    });

    it('position left', () => {
      // Square
      const lengthSide = 20;
      const arrowWidth = (lengthSide * Math.sqrt(2)) / 2;

      const popoverRect = {
        top: 100,
        left: 100,
        height: 400,
        width: 100,
      };

      const targetRect = {
        top: 200,
        left: 200,
        height: 40,
        width: 40,
      };

      const result = arrowPosition('left', targetRect, popoverRect);

      expect(result).toEqual({ top: result.top, left: popoverRect.width - arrowWidth, lengthSide });
      expect(result.top).not.toEqual(popoverRect.height - 2 * arrowWidth);
    });

    it('position left and too far up (overflow)', () => {

      // Square
      const lengthSide = 20;
      const arrowWidth = (lengthSide * Math.sqrt(2)) / 2;

      const popoverRect = {
        top: 100,
        left: 100,
        height: 100,
        width: 100,
      };

      const targetRect = {
        top: 200,
        left: 200,
        height: 40,
        width: 40,
      };

      const result = arrowPosition('left', targetRect, popoverRect);

      expect(result).toEqual({ top: popoverRect.height - 2 * arrowWidth, left: popoverRect.width - arrowWidth, lengthSide });
    });

    it('unvalid position', () => {

      const popoverRect = {
        top: 100,
        left: 100,
        height: 100,
        width: 100,
      };

      const targetRect = {
        top: 200,
        left: 200,
        height: 40,
        width: 40,
      };

      expect(() => { arrowPosition('test', targetRect, popoverRect); }).toThrow(new Error('Not a valid position:', 'test'));
    });
  });

});
