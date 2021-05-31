import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './FilterTag.css';

export interface FilterTagProps {
  filterLabel: string,
  filterText: string,
  negated?: boolean,
  onClose: () => void,
}

const FilterTag: FunctionComponent<FilterTagProps> = ({
  filterLabel, filterText, negated = false, onClose,
}) => (
  <div className={styles.wrapper} title={negated ? `Not ${filterText}` : filterText}>
    <div className={styles.label}>
      {filterLabel}
    </div>
    <div className={styles.text}>
      {negated && <div className={styles.negated}>Not</div>}
      {filterText}
    </div>
    <div onClick={() => onClose()}>
      <div className={clsx(styles.clearIcon, 'pyreneIcon-delete')} />
    </div>
  </div>
);


FilterTag.displayName = 'FilterTag';

export default FilterTag;
