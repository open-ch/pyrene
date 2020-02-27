import React from 'react';
import PropTypes from 'prop-types';

import './FilterTag.css';

const FilterTag = (props) => {
  const displayText = props.negated ? `!${props.filterText}` : props.filterText;
  return (
    <div styleName="wrapper" title={displayText}>
      <div styleName="label">
        {props.filterLabel}
      </div>
      <div styleName="text">
        {displayText}
      </div>
      <div onClick={() => props.onClose()}>
        <div styleName="clearIcon" className="pyreneIcon-delete" />
      </div>
    </div>
  );
};


FilterTag.displayName = 'FilterTag';

FilterTag.propTypes = {
  filterLabel: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  negated: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterTag;
