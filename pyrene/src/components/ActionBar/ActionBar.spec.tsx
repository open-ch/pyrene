
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { shallow, mount } from 'enzyme';

import ActionBar, { ActionBarProps, handleOnClick } from './ActionBar';
import Icon from '../Icon/Icon';
import ArrowPopover from '../ArrowPopover/ArrowPopover';
import Tooltip from '../Tooltip/Tooltip';

describe('<ActionBar />', () => {

  const props: ActionBarProps = {
    styling: 'shadow',
    actions: [
      {
        iconName: 'chevronLeft',
        color: 'neutral300',
        active: true,
        onClick: () => {},
      },
      {
        iconName: 'chevronRight',
        color: 'neutral300',
        active: false,
        onClick: () => {},
      },
    ],
  };

  it('renders without crashing', () => {
    shallow(<ActionBar {...props} />);
  });

  it('renders nothing without actions', () => {
    const rendered = shallow(<ActionBar actions={[]} />);
    expect(rendered.type()).toEqual(null);
  });

  it('renders its content', () => {
    const rendered = mount(<ActionBar {...props} />);
    expect(rendered.find('.pyreneIcon-chevronLeft')).toHaveLength(1);
    expect(rendered.find('.pyreneIcon-chevronRight')).toHaveLength(1);
    expect(rendered.find('.box-shadow')).toHaveLength(1);
  });

  it('renders loader when loading', () => {
    const rendered = mount(<ActionBar {...props} loading />);
    expect(rendered.find('Loader')).toHaveLength(1);
  });

  describe('disabled container: ', () => {
    it('renders disabled container when disabled but not loading', () => {
      const rendered = shallow(<ActionBar {...props} loading={false} disabled />);

      // find the wrapper -> container; this container should be disabled
      expect(rendered.find('.container-horizontal').props().className).toContain('disabled');

    });

    it('doesn\'t render disabled container when disabled but it is loading', () => {
      const rendered = shallow(<ActionBar {...props} loading disabled />);

      // find the wrapper -> container; this container should be disabled
      expect(rendered.find('.container-horizontal').props().className).not.toContain('disabled');

    });
  });

  it('renders no box', () => {
    props.styling = 'none';
    const rendered = mount(<ActionBar {...props} />);
    expect(rendered.find('.box-shadow')).toHaveLength(0);
    expect(rendered.find('.box-box')).toHaveLength(0);
  });

  describe('<Icon />', () => {
    it('doesn\' render svg if there is none, but renders an iconName', () => {
      const actionWithEmptytSvg = [
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          onClick: () => {},
        },
      ];

      const rendered = shallow(<ActionBar actions={actionWithEmptytSvg} />);
      const icon = rendered.find(Icon).props();

      expect(icon.svg).toBeFalsy();
      expect(icon.name).toEqual(actionWithEmptytSvg[0].iconName);

    });

    it('doesn\' render svg if lenght is 0, but renders an iconName', () => {
      const actionWithoutSvg = [
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          svg: '',
          onClick: () => {},
        },
      ];

      const rendered = shallow(<ActionBar actions={actionWithoutSvg} />);
      const icon = rendered.find(Icon).props();

      expect(icon.svg).toBeFalsy();
      expect(icon.name).toEqual(actionWithoutSvg[0].iconName);

    });

    it('renders svg if defined instead of an iconName', () => {
      const actionWithSvg = [
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          svg: 'pathToSvg',
          onClick: () => {},
        },
      ];

      const rendered = shallow(<ActionBar actions={actionWithSvg} />);
      const icon = rendered.find(Icon).props();

      expect(icon.name).toBeFalsy();
      expect(icon.svg).toEqual(actionWithSvg[0].svg);

    });
  });

  describe('<ArrowPopover />', () => {

    const FakePopover = () => (
      <div />
    );

    it('renders no arrow popover if action doesn\'t contain one', () => {

      const actionWithoutPopover = [
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          svg: 'pathToSvg',
          onClick: () => {},
        },
      ];

      const rendered = shallow(<ActionBar actions={actionWithoutPopover} />);

      expect(rendered.find(ArrowPopover)).toHaveLength(0);

    });

    it('renders no arrow popover if action does contain one but its not active', () => {

      const inactiveAction = [
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: false,
          svg: 'pathToSvg',
          renderPopover: () => <FakePopover />, // eslint-disable-line react/display-name
        },
      ];

      const rendered = shallow(<ActionBar actions={inactiveAction} />);

      expect(rendered.find(ArrowPopover)).toHaveLength(0);

    });

    it('renders arrow popover if action contains one', () => {

      const actionWithPopover = [
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          svg: 'pathToSvg',
          renderPopover: () => <FakePopover />, // eslint-disable-line react/display-name
        },
      ];

      const rendered = shallow(<ActionBar actions={actionWithPopover} />);

      expect(rendered.find(ArrowPopover)).toHaveLength(1);
    });

  });

  describe('<Tooltip />', () => {

    it('doesn\'t render tooltip if there is none', () => {

      const actionsWithoutTooltips = [
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          onClick: () => {},
        },
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          onClick: () => {},
        },
      ];

      const rendered = shallow(<ActionBar actions={actionsWithoutTooltips} />);
      expect(rendered.find(Tooltip)).toHaveLength(0);

    });

    it('renders one tooltip if one action has one', () => {

      const actionsWithoutTooltips = [
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          onClick: () => {},
        },
        {
          iconName: 'chevronLeft',
          color: 'neutral300',
          active: true,
          onClick: () => {},
          tooltip: 'Im am tooltip!',
        },
      ];

      const rendered = shallow(<ActionBar actions={actionsWithoutTooltips} />);
      expect(rendered.find(Tooltip)).toHaveLength(1);

    });

  });

  it('can be interacted with correctly', () => {
    const mockCallBack = jest.fn();
    const props1 = {
      actions: [{
        iconName: 'chevronLeft',
        active: true,
        onClick: mockCallBack,
      }],
    };
    const rendered = shallow(<ActionBar {...props1} />);
    rendered.find('.iconBox').simulate('click', { preventDefault() {} });
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });


  describe('<handleOnClick />', () => {


    it('can not define popover and onClick', () => {
      const onClick = jest.fn();
      const renderPopover = jest.fn();
      const active = true;
      const index = 0;
      const openAction = null;
      const setOpenAction = jest.fn();
      expect(() => {
        handleOnClick(
          renderPopover,
          onClick,
          active,
          index,
          openAction,
          setOpenAction,
        );
      }).toThrow(new Error('You can not define both renderPopover and onClick'));
    });
    it('calls setOpenAction(null) and onClick() on onClick', () => {
      const onClick = jest.fn();
      const active = true;
      const index = 0;
      const openAction = null;
      const setOpenAction = jest.fn();

      handleOnClick(
        undefined,
        onClick,
        active,
        index,
        openAction,
        setOpenAction,
      );

      expect(setOpenAction).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalled();
    });

    it('do not call anything when not active', () => {
      const onClick = jest.fn();
      const index = 0;
      const openAction = null;
      const setOpenAction = jest.fn();
      handleOnClick(
        undefined,
        onClick,
        false,
        index,
        openAction,
        setOpenAction,

      );

      expect(setOpenAction).not.toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });

    it('call setOpenAction when renderPopover is defined', () => {
      const renderPopover = jest.fn();
      const active = true;
      const index = 0;
      const setOpenAction = jest.fn();

      handleOnClick(
        renderPopover,
        undefined,
        active,
        index,
        null,
        setOpenAction,

      );

      expect(setOpenAction).toHaveBeenCalledWith(index);

      handleOnClick(
        renderPopover,
        undefined,
        active,
        index,
        0,
        setOpenAction,
      );

      expect(setOpenAction).toHaveBeenCalledWith(null);
    });
  });
});
