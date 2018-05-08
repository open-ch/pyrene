import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './radioSelection.css';


export default class RadioSelection extends React.Component {

  constructor(props) {
    super(props);

    this._handleRadioSelection = this._handleRadioSelection.bind(this);
    this.state = {
      selectedOption: this.props.selectedOption
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.selectedOption !== nextProps.selectedOption) {
      return {
        selectedOption: nextProps.selectedOption
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
      <div styleName={classNames('radioSelectionContainer', { [`alignment-${this.props.alignment}`]: true }, { invalid: this.props.invalid && !this.state.selectedOption})}>
        {this.props.radioLabels.map(radioLabel => (
          <React.Fragment key={`radio_${radioLabel}`}>
            <div className={'radioContainer'}>
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

RadioSelection.displayName = 'RadioSelection';

RadioSelection.defaultProps = {
  disabled: false,
  radioLabels: [],
  alignment: 'vertical',
  selectedOption: '',
  invalid: false
};

RadioSelection.propTypes = {
  /**
   * Specifies the different choices and values.
   */
  radioLabels: PropTypes.arrayOf(PropTypes.string),
  /**
   * Specifies a radio that is checked on page load.
   */
  selectedOption: PropTypes.string,
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Flag to set when checkbox should have been set.
   */
  invalid: PropTypes.bool,
  /**
   * Specifies the orientation of the radio group.
   */
  alignment: PropTypes.oneOf(['vertical', 'horizontal'])
};
