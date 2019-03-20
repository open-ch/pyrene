import React from 'react';
import '../../../css/componentPage.css';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import ColorBox from '../../common/PageElements/FoundationElements/ColorBox/ColorBox';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import {
  primaryColors, neutralColors, interactionColors, extendedColors,
} from '../../data/foundationsData';

const createStackedColors = (data, colorBoxSize) => data.map(element => (
  <div key={`${element.colors[0].hex}`}>
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
          key={color.hex}
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
        Our color palette contains primary, neutrals, interaction colors as well as qualitative and sequential color schemes used for data visualizations.
        They’ve been designed to work harmoniously with each other.
        The color palette starts with a base color (500) and fills in the spectrum to create a complete and usable palette.
      </div>
    </div>

    <div styleName="topicContent">
      <Paragraph title="Primary Colors">
        <DescriptionBox>
          The primary colors give our applications the characteristic look and feel.
          These colors enjoy priority. White plays an important role in structuring content and the overall impression.
          Blue is used as accent color while Dark is the main color for type.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(primaryColors, 'large')}
        </div>
      </Paragraph>

      <Paragraph title="Neutrals">
        <DescriptionBox>
          Neutral colors are used for text, backgrounds, shadows, lines, dividers and borders. Those colors give our elements structure.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(neutralColors, 'medium')}
        </div>
      </Paragraph>

      <Paragraph title="Interaction Colors">
        <DescriptionBox>
          The Interaction colors are used for buttons, alert messages, form elements and status of services/hosts.
          Interaction colors can have a darker and lighter shade.
          The darker shades of Green, Red and Orange are used for type to improve readability.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(interactionColors, 'medium')}
        </div>
      </Paragraph>

      <Paragraph title="Extended Palette">
        <DescriptionBox>
          The extended palette consists of all the useable tints and shades.
          These palette is also used in graphs and data visualizations.
          Each grade is derived from the base color (-500), by adjusting saturation and brightness.
        </DescriptionBox>
        <div className="colorGrid">
          {createStackedColors(extendedColors, 'small')}
        </div>
      </Paragraph>
    </div>
  </div>
);

ColorsPage.displayName = 'ColorsPage';

export default ColorsPage;
