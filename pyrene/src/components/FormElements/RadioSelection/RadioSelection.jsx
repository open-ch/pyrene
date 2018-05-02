import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './radioSelection.css';


export default class RadioSelection extends React.Component {

  constructor(props) {
    super(props);

    this._handleRadioSelection = this._handleRadioSelection.bind(this);
    this.state = {
      selectedOption: this.props.checkedLabel
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.selectedOption !== nextProps.checkedLabel) {
      return {
        selectedOption: nextProps.checkedLabel
      };
    }
    return null;
  }


  _handleRadioSelection(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  render() {
    const rand = Math.floor(Math.random() * 1e10);
    return (
      <div styleName={classNames('radioSelectionContainer', { [`alignment-${this.props.alignment}`]: true })}>
        {this.props.radioLabels.map(radioLabel => (
          <React.Fragment key={`radio_${radioLabel}`}>
            <div styleName={'radioContainer'}>
              <input
                id={`radio_${radioLabel}_${rand}`}
                styleName={'radioInput'}
                type="radio"
                value={radioLabel}
                checked={this.state.selectedOption === radioLabel}
                onChange={this._handleRadioSelection}
              />

              <label
                styleName={
                  classNames('radioLabel',
                    { checked: (this.state.selectedOption === radioLabel) },
                    { disabled: this.props.disabled })}
                htmlFor={`radio_${radioLabel}_${rand}`}
              >
                <span styleName={'radioIcon'} />
                {radioLabel}
              </label>
            </div>
            <div styleName={classNames({ [`spacer-${this.props.alignment}`]: true })} />
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
  { propName: 'radioLabels', isRequired: true, type: 'arrayOf: String', defaultValue: '', description: 'Specifies the different choices and values.' },
  { propName: 'disabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the radio selection group.' },
  { propName: 'alignment', isRequired: false, type: 'oneOf: vertical horizontal', defaultValue: 'vertical', description: 'Specifies the orientation of the radio group.' },
  { propName: 'checkedLabel', isRequired: false, type: 'String', defaultValue: '', description: 'Specifies a radio that is checked on page load.' }
];

RadioSelection.displayName = 'RadioSelection';

RadioSelection.defaultProps = {
  disabled: false,
  radioLabels: [],
  alignment: 'vertical',
  checkedLabel: ''
};

RadioSelection.propTypes = {
  radioLabels: PropTypes.arrayOf(PropTypes.string),
  checkedLabel: PropTypes.string,
  disabled: PropTypes.bool,
  alignment: PropTypes.oneOf(['vertical', 'horizontal'])
};
