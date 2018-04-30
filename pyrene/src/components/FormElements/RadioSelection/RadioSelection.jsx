import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './radioSelection.css';


export default class RadioSelection extends React.Component {

  constructor(props) {
    super(props);

    this._handleRadioSelection = this._handleRadioSelection.bind(this);
    this.state = {
      selectedOption: this.props.preCheckedLabel
    };
  }


  _handleRadioSelection(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  render() {
    return (
      <div styleName={classNames('radioSelectionContainer', { [`direction-${this.props.direction}`]: true })}>
        {this.props.radioLabelArray.map(radioLabel => (
          <React.Fragment key={`radio_${radioLabel}`}>
            <div styleName={'radioContainer'} >
              <input
                id={`radio_${radioLabel}`}
                styleName={'radioInput'}
                type="radio"
                value={radioLabel}
                checked={this.state.selectedOption === radioLabel}
                onChange={this._handleRadioSelection}
              />

              <label
                styleName={
                  classNames('radioLabel',
                    { isChecked: (this.state.selectedOption === radioLabel) },
                    { isDisabled: this.props.isDisabled })}
                htmlFor={`radio_${radioLabel}`}
              >
                <span styleName={'radioIcon'} />
                {radioLabel}
              </label>
            </div>
            <div styleName={classNames({ [`spacer-${this.props.direction}`]: true })} />
          </React.Fragment>
        ))}
      </div>
    );
  }

}

/**
 *
 *
 *  Object which contains all props for the Proptable in Kitchensink
 *  Each prop should be passed as key-value pair following this scheme:
 *
 *  propName:{isRequired(bool): true|false, type(string): 'String|Bool|OneOf|...', default(string): 'defaultValue', description(string): 'This prop changes...'}
 *
 *  Note: default is only required if isRequired is false.
 *
 */

RadioSelection.docProps = [
  { propName: 'radioLabelArray', isRequired: true, type: 'arrayOf: String', defaultValue: '', description: 'Specifies the different choices and values.' },
  { propName: 'isDisabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the radio selection group.' },
  { propName: 'direction', isRequired: false, type: 'oneOf: vertical horizontal', defaultValue: 'vertical', description: 'Specifies the orientation of the radio group.' },
  { propName: 'preCheckedLabel', isRequired: false, type: 'String', defaultValue: '', description: 'Specifies a radio that is checked on page load.' }
];

RadioSelection.displayName = 'RadioSelection';

RadioSelection.defaultProps = {
  isDisabled: false,
  radioLabelArray: ['option 1', 'option 2', 'option 3'],
  direction: 'vertical',
  preCheckedLabel: ''
};

RadioSelection.propTypes = {
  radioLabelArray: PropTypes.arrayOf(PropTypes.string),
  preCheckedLabel: PropTypes.string,
  isDisabled: PropTypes.bool,
  direction: PropTypes.oneOf(['vertical', 'horizontal'])
};
