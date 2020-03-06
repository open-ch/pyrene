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

      expect(result).toEqual({ top: popoverRect.height - arrowWidth, left: popoverRect.width - 2 * arrowWidth, lengthSide });
    });

    it('position top and too far right (overflow)', () => {

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
        left: -10,
        height: 40,
        width: 40,
      };

      const result = arrowPosition('top', targetRect, popoverRect);

      expect(result).toEqual({ top: popoverRect.height - arrowWidth, left: arrowWidth, lengthSide });
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


    it('position left and too far down (overflow)', () => {

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
        top: -10,
        left: 200,
        height: 40,
        width: 40,
      };

      const result = arrowPosition('left', targetRect, popoverRect);

      expect(result).toEqual({ top: arrowWidth, left: popoverRect.width - arrowWidth, lengthSide });
    });

    it('position bottom', () => {
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

      const result = arrowPosition('bottom', targetRect, popoverRect);

      expect(result).toEqual({ top: -10, left: result.left, lengthSide });
      expect(result.left).not.toEqual(popoverRect.width - 2 * arrowWidth);
    });

    it('position bottom and too far left (overflow)', () => {

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

      const result = arrowPosition('bottom', targetRect, popoverRect);

      expect(result).toEqual({ top: -10, left: popoverRect.width - 2 * arrowWidth, lengthSide });
    });

    it('position bottom and too far right (overflow)', () => {

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
        left: -10,
        height: 40,
        width: 40,
      };

      const result = arrowPosition('bottom', targetRect, popoverRect);

      expect(result).toEqual({ top: -10, left: arrowWidth, lengthSide });
    });

    it('position right', () => {
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

      const result = arrowPosition('right', targetRect, popoverRect);

      expect(result).toEqual({ top: result.top, left: -10, lengthSide });
      expect(result.top).not.toEqual(popoverRect.height - 2 * arrowWidth);
    });

    it('position right and too far up (overflow)', () => {

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

      const result = arrowPosition('right', targetRect, popoverRect);

      expect(result).toEqual({ top: popoverRect.height - 2 * arrowWidth, left: -10, lengthSide });
    });


    it('position right and too far down (overflow)', () => {

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
        top: -10,
        left: 200,
        height: 40,
        width: 40,
      };

      const result = arrowPosition('right', targetRect, popoverRect);

      expect(result).toEqual({ top: arrowWidth, left: -10, lengthSide });
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
