import React from 'react';
import '../../../css/componentPage.css';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import ColorBox from '../../common/PageElements/FoundationElements/ColorBox/ColorBox';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import {
  primaryColors,
  neutralColors,
  interactionColors,
  extendedColors,
} from '../../data/foundationsData';

const createStackedColors = (data, colorBoxSize) => data.map((element) => (
  <div key={`${element.colors[0].name}`}>
    {element.colors.map((color, index) => {
      const title = index === 0 ? element.title : '';
      return (
        <ColorBox
          title={title}
          colorName={color.colorName}
          variableName={color.name}
          hexValue={color.hex}
          size={colorBoxSize}
          darkFont={color.darkFont}
          bordered={color.bordered}
          stackPosition={color.stack}
          infoLabel={color.infoLabel}
          key={color.name}
        />
      );
    })}
  </div>
));

const ColorsPage = () => (
  <div styleName="page">
    <div styleName="header">
      <div styleName="title">Colors</div>
      <div styleName="description">
        <p>
          Maintaining consistent and engaging digital interfaces throughout OPen
          Systems demands extended guidance around color usage. The following
          concepts are the foundation as we strive to achieve balance and
          harmony through our User Interface design.
        </p>
        <p>
          Our color palette contains primary, neutrals, interaction and status
          colors as well as color schemes used for data visualizations. They’ve
          been designed to work harmoniously with each other.
        </p>
        <p>
          The Neutral family is dominant in the default themes, making use of
          subtle shifts in value to help organize content into distinct zones.
        </p>
      </div>
    </div>

    <div styleName="topicContent">
      <Paragraph title="Primary Colors">
        <DescriptionBox>
          The primary colors give our applications the characteristic look and
          feel. These colors enjoy priority. White plays an important role in
          structuring content and the overall impression. Blue is used as accent
          color while Dark is the main color for type.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(primaryColors, 'large')}
        </div>
      </Paragraph>

      <Paragraph title="Neutral Colors">
        <DescriptionBox>
          The neutral colours give a minimalist and clean impression. The
          neutral colours are mainly used for structuring and weighting the
          content. Typically they are used for text, icons and subtle
          backgrounds when we don&apos;t want to draw too much attention to a
          particular touchpoint or convey information such as inactive or
          disabled.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(neutralColors, 'medium')}
        </div>
      </Paragraph>

      <Paragraph title="Semantic Colors">
        <DescriptionBox>
          Semantic color helps users identify status, see actions, locate help,
          and understand next steps. The consistent use of color keeps cognitive
          load low and makes for a unified and engaging user experience.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(interactionColors, 'medium')}
        </div>
      </Paragraph>

      <Paragraph title="Extended Palette">
        <DescriptionBox>
          The extended palette consists of all the useable tints and shades.
          These palette is also used in graphs and data visualizations. Each
          grade is derived from the base color (-500), by adjusting saturation
          and brightness.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(extendedColors, 'small')}
        </div>
      </Paragraph>

      <Paragraph title="Data visualizations">
        <DescriptionBox>
          The color palette for data visualizations is a selected subset of the Pyrene Design Language color palette. It is designed to maximize accessibility and harmony within a page.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(interactionColors, 'medium')}
        </div>
      </Paragraph>
    </div>
  </div>
);

ColorsPage.displayName = 'ColorsPage';

export default ColorsPage;
