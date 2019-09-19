import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './presetTimeRanges.css';

const PresetTimeRanges = props => (
  <div>
    {PresetTimeRanges._createPresets(props)}
  </div>
);

PresetTimeRanges._createPresets = props => props.presetTimeRanges.map((preset, index) => (
  <button
    key={preset.id}
    id={preset.id}
    type="button"
    styleName={
      classNames('presetTimeRange',
        { disabled: props.disabled },
        { active: props.currentTimeRangeType === preset.id },
        { first: index === 0 },
        { successive: index !== 0 })
    }
    onClick={props.onClick}
    disabled={props.disabled}
  >
    <span>
      {preset.label}
    </span>
  </button>
));

PresetTimeRanges.displayName = 'PresetTimeRanges';

PresetTimeRanges.defaultProps = {
  disabled: false,
};

export default PresetTimeRanges;
