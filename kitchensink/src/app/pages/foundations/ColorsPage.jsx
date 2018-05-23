import React from 'react';
import '../../../css/componentPage.css';

const ColorsPage = ({ match }) => (
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
      Test
    </div>
  </div>
);

ColorsPage.displayName = 'ColorsPage';

export default ColorsPage;
