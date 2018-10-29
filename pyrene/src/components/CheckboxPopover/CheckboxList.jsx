import React from 'react';
import PropTypes from 'prop-types';

import './checkboxList.css';
import Checkbox from '../FormElements/Checkbox/Checkbox';
import Button from '../Button/Button';

const CheckboxList = props => (
  <div styleName={'checkboxList'}>
    <div styleName={'listHeader'}>
      <Button label={'Restore default'} type={'action'} onClick={() => props.onRestoreDefault()} />
    </div>
    <div styleName={'list'}>
      {props.listItems
        .sort((a, b) => {
          const nameA = a.label.toUpperCase();
          const nameB = b.label.toUpperCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
        .map((item) => {
          return (
            <div styleName={'listItem'} key={item.id}>
              <Checkbox label={item.label} value={item.value} onChange={()=> props.onItemClick(item.id, item.value)} />
            </div>
          );
        })
      }
    </div>
  </div>
);


CheckboxList.displayName = 'CheckboxList';

CheckboxList.defaultProps = {};

CheckboxList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
  })).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onRestoreDefault: PropTypes.func.isRequired,
};

export default CheckboxList;
