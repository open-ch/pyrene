import React, { FunctionComponent } from 'react';

import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import './checkboxList.css';

interface Item {
  id: string;
  label: string;
  value: boolean;
}
export interface CheckboxListProps {
  onRestoreDefault: () => void;
  listItems: Array<Item>;
  onItemClick: (id: Item["id"], value: Item["value"]) => void;
}

const CheckboxList: FunctionComponent<CheckboxListProps> = ({
  onRestoreDefault,
  listItems,
  onItemClick,
}) => (
  <div styleName="checkboxList">
    <div styleName="listHeader">
      <Button label="Restore default" type="action" onClick={() => onRestoreDefault()} />
    </div>
    <div styleName="list">
      {listItems
        .map((item) => (
          <div styleName="listItem" key={item.id}>
            <Checkbox label={item.label} value={item.value} onChange={() => onItemClick(item.id, item.value)} />
          </div>
        ))}
    </div>
  </div>
);

export default CheckboxList;
