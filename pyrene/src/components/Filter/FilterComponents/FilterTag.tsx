import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './FilterTag.css';

const FilterTag = (props) => {
  const displayText = props.negated ? `Not ${props.filterText}` : props.filterText;
  return (
    <div className={styles.wrapper} title={displayText}>
      <div className={styles.label}>
        {props.filterLabel}
      </div>
      <div className={styles.text}>
        {props.negated && <div className={styles.negated}>Not</div>}
        {props.filterText}
      </div>
      <div onClick={() => props.onClose()}>
        <div className={clsx(styles.clearIcon, 'pyreneIcon-delete')} />
      </div>
    </div>
  );
};


FilterTag.displayName = 'FilterTag';

FilterTag.defaultProps = {
  negated: false,
};

FilterTag.propTypes = {
  filterLabel: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  negated: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default FilterTag;
