import React from 'react';
import './filterButton.css';
import classNames from 'classnames';

const FilterButton = () => (
  <div styleName={classNames('filterButton', 'disabledFilter', 'noBorder')} >
    <div styleName="buttonLabel">
      {'Filter'}
    </div>
    <div styleName="arrowIcon" className="pyreneIcon-collapsDown" />
  </div>
);

export default FilterButton;
