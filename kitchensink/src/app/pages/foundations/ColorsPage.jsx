import React from 'react';
import '../../../css/componentPage.css';
import Paragraph from '../../common/PageElements/Paragraph';
import ColorBox from '../../common/PageElements/ColorBox';
import DescriptionBox from '../../common/PageElements/DescriptionBox';

const neutrals = [
  { name: 'neutral-500', hex: '#00152c', darkFont: false, bordered: false },
  { name: 'neutral-400', hex: '#334151', darkFont: false, bordered: false },
  { name: 'neutral-300', hex: '#54606d', darkFont: false, bordered: false },
  { name: 'neutral-200', hex: '#808892', darkFont: false, bordered: false },
  { name: 'neutral-100', hex: '#b3b8be', darkFont: true, bordered: false },
  { name: 'neutral-050', hex: '#e0e2e5', darkFont: true, bordered: false },
  { name: 'neutral-030', hex: '#f2f4f5', darkFont: true, bordered: false },
  { name: 'neutral-020', hex: '#f7f9fa', darkFont: true, bordered: true },
  { name: 'neutral-010', hex: '#fafafa', darkFont: true, bordered: true },
];

const interactionColors = [
  { title: 'neutral',
    colors: [
      { name: 'blue-500', hex: '#0069E0', darkFont: false, bordered: false, stack: 'top' },
      { name: 'blue-600', hex: '#005CC4', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'success',
    colors: [
      { name: 'green-500', hex: '#15d355', darkFont: false, bordered: false, stack: 'top' },
      { name: 'green-600', hex: '#12b94a', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'warning',
    colors: [
      { name: 'orange-500', hex: '#ffa217', darkFont: false, bordered: false, stack: 'top' },
      { name: 'orange-600', hex: '#e08e14', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'danger',
    colors: [
      { name: 'red-500', hex: '#ff504d', darkFont: false, bordered: false, stack: 'top' },
      { name: 'red-600', hex: '#e04643', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'outage',
    colors: [
      { name: 'neutral-500', hex: '#00152c', darkFont: false, bordered: false, stack: 'none' },
    ],
  },
  { title: 'inactive',
    colors: [
      { name: 'neutral-100', hex: '#b3b8be', darkFont: true, bordered: false, stack: 'none' },
    ],
  },
];

const extendedColors = [
  { title: 'blue',
    colors: [
      { name: 'blue-010', hex: '#F7FAFE', darkFont: true, bordered: false, stack: 'top' },
      { name: 'blue-050', hex: '#D4E5F9', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'blue-100', hex: '#B3D2F5', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'blue-200', hex: '#80B4EF', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'blue-300', hex: '#4D96E9', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'blue-400', hex: '#267FE4', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'blue-500', hex: '#0069E0', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'blue-600', hex: '#005CC4', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'blue-700', hex: '#0050AC', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'blue-800', hex: '#004593', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'blue-900', hex: '#00397A', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'blue-950', hex: '#002E62', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'green',
    colors: [
      { name: 'green-010', hex: '#f7fdf9', darkFont: true, bordered: false, stack: 'top' },
      { name: 'green-050', hex: '#e2f9ea', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'green-100', hex: '#b9f1cc', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'green-200', hex: '#8ae9aa', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'green-300', hex: '#5be088', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'green-400', hex: '#37d96e', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'green-500', hex: '#15d355', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'green-600', hex: '#12b94a', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'green-700', hex: '#0f993e', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'green-800', hex: '#0d8234', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'green-900', hex: '#0a692a', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'green-950', hex: '#07491d', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'orange',
    colors: [
      { name: 'orange-010', hex: '#fffcf7', darkFont: true, bordered: false, stack: 'top' },
      { name: 'orange-050', hex: '#ffefd7', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'orange-100', hex: '#ffe3b9', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'orange-200', hex: '#ffd08b', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'orange-300', hex: '#ffc063', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'orange-400', hex: '#ffb445', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'orange-500', hex: '#ffa217', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'orange-600', hex: '#e08e14', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'orange-700', hex: '#c47c11', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'orange-800', hex: '#a86a0f', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'orange-900', hex: '#8c580c', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'orange-950', hex: '#70470a', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'red',
    colors: [
      { name: 'red-010', hex: '#fff9f9', darkFont: true, bordered: false, stack: 'top' },
      { name: 'red-050', hex: '#ffe9e9', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'red-100', hex: '#ffcac9', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'red-200', hex: '#ffa7a6', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'red-300', hex: '#ff8482', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'red-400', hex: '#ff6a67', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'red-500', hex: '#ff504d', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'red-600', hex: '#e04643', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'red-700', hex: '#c43d3b', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'red-800', hex: '#a83432', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'red-900', hex: '#8c2b2a', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'red-950', hex: '#702321', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'teal',
    colors: [
      { name: 'teal-010', hex: '#f7fcfb', darkFont: true, bordered: false, stack: 'top' },
      { name: 'teal-050', hex: '#d7f2ed', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'teal-100', hex: '#b8e9e0', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'teal-200', hex: '#89dacc', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'teal-300', hex: '#61ceba', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'teal-400', hex: '#43c4ad', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'teal-500', hex: '#14b699', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'teal-600', hex: '#119f86', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'teal-700', hex: '#0f8b75', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'teal-800', hex: '#0d7764', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'teal-900', hex: '#0a6354', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'teal-950', hex: '#084f43', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
  { title: 'acqua',
    colors: [
      { name: 'acqua-010', hex: '#f7fcfd', darkFont: true, bordered: false, stack: 'top' },
      { name: 'acqua-050', hex: '#d8f3f8', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'acqua-100', hex: '#baebf3', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'acqua-200', hex: '#8bddec', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'acqua-300', hex: '#62d1e5', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'acqua-400', hex: '#46c9e1', darkFont: true, bordered: false, stack: 'middle' },
      { name: 'acqua-500', hex: '#18bcda', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'acqua-600', hex: '#16adc8', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'acqua-700', hex: '#1398b0', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'acqua-800', hex: '#11859a', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'acqua-900', hex: '#0e7082', darkFont: false, bordered: false, stack: 'middle' },
      { name: 'acqua-950', hex: '#0b5d6c', darkFont: false, bordered: false, stack: 'bottom' },
    ],
  },
];

const createStackedColors = (data, colorBoxSize) => data.map(element => (
  <div key={element.title}>
    {element.colors.map((color, index) => {
      const title = index === 0 ? element.title : '';
      return (
        <ColorBox
          title={title}
          variableName={color.name}
          hexValue={color.hex}
          size={colorBoxSize}
          key={color.hex}
          darkFont={color.darkFont}
          bordered={color.bordered}
          stackPosition={color.stack}
        />);
    })}
  </div>
));

const ColorsPage = () => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Colors</div>
      <div styleName="description">
        Our color palette contains primary, neutrals, interaction colors as well as qualitative and sequential color schemes used for data visualizations.
        They’ve been designed to work harmoniously with each other.
        The color palette starts with a base color (500) and fills in the spectrum to create a complete and usable palette.
      </div>
    </div>

    <div styleName="topicContent">
      <Paragraph title={'Primary Colors'}>
        <DescriptionBox>
          The primary colors give our applications the characteristic look and feel.
          These colors enjoy priority. White plays an important role in structuring content and the overall impression.
          Blue is used as accent color while Dark is the main color for type.
        </DescriptionBox>
        <div className={'colorGrid'}>
          <ColorBox colorName={'blue'} variableName={'blue-500'} hexValue={'#0069E0'} infoLabel={'For accent and highlight'} />
          <ColorBox colorName={'dark'} variableName={'neutral-500'} hexValue={'#00152C'} infoLabel={'Main color for type'} />
          <ColorBox colorName={'white'} variableName={'neutral-000'} hexValue={'#FFFFFF'} infoLabel={'For structure'} darkFont bordered />
        </div>
      </Paragraph>

      <Paragraph title={'Neutrals'}>
        <DescriptionBox>
          Neutral colors are used for text, backgrounds, shadows, lines, dividers and borders. Those colors give our elements structure.
        </DescriptionBox>
        <div className={'colorGrid'}>
          {neutrals.map(element => <ColorBox variableName={element.name} hexValue={element.hex} size={'medium'} key={element.hex} darkFont={element.darkFont} bordered={element.bordered} />)}
        </div>
      </Paragraph>

      <Paragraph title={'Interaction Colors'}>
        <DescriptionBox>
          The Interaction colors are used for buttons, alert messages, form elements and status of services/hosts.
          Input fields, for example, can get positive and negative feedback, whereas alert messages can have warning feedback.
          Each Interaction color has a darker and lighter shade.
          The darker shades of Green, Red and Orange are used for type to improve readability.
          The darker shade of Blue is used for hover states on buttons or links.
        </DescriptionBox>
        <div className={'colorGrid'}>
          {createStackedColors(interactionColors, 'medium')}
        </div>
      </Paragraph>

      <Paragraph title={'Interaction Colors'}>
        <DescriptionBox>
          The extended palette consists of all the useable tints and shades.
          These palette is also used in graphs and data visualizations.
          Each grade is derived from the base color (-500), by adjusting saturation and brightness.
        </DescriptionBox>
        <div className={'colorGrid'}>
          {createStackedColors(extendedColors, 'small')}
        </div>
      </Paragraph>
    </div>
  </div>
);

ColorsPage.displayName = 'ColorsPage';

export default ColorsPage;
