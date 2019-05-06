import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './optionList.css';

const OptionList = props => (
  <div styleName="checkboxList">
    {props.renderHelpSection && (
      <div styleName="listHeader">
        {props.renderHelpSection()}
      </div>
    )}
    <div styleName="list">
      {props.options
        .map((item) => {
          const selected = item === props.selectedValue;
          return (
            <div
              styleName={classNames('listItem', { selected })}
              key={item.value}
              onClick={() => props.onChange(item)}
            >
              <span className={classNames({ 'pyreneIcon-check': selected })} styleName="listIcon" aria-label="Item checked" />
              <span styleName="listLabel">{item.label}</span>
            </div>
          );
        })
      }
    </div>
  </div>
);


OptionList.displayName = 'OptionList';

OptionList.defaultProps = {
  renderHelpSection: null,
  selectedValue: null,
};

OptionList.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })).isRequired,
  renderHelpSection: PropTypes.func,
  selectedValue: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
};

export default OptionList;
