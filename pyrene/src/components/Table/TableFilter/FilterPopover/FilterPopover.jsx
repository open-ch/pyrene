import React from 'react';
import PropTypes from 'prop-types';

import './filterPopover.css';
import ButtonBar from '../../../ButtonBar/ButtonBar';
import Button from '../../../Button/Button';

const FilterPopover = props => (
  <div styleName={'filterPopover'}>
    <div styleName={'title'}>Select Filter</div>
    <ButtonBar
      rightButtonSectionElements={[
        <Button label={'Clear'} type={'ghost'} />,
        <Button label={'Cancel'} type={'secondary'} />,
        <Button label={'Apply'} type={'primary'} />,
      ]}
    />
  </div>
);


FilterPopover.displayName = 'FilterPopover';

FilterPopover.defaultProps = {};

FilterPopover.propTypes = {};

export default FilterPopover;