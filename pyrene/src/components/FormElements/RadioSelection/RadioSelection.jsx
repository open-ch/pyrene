import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './radioSelection.css';

/**
 * Radio groups are used primarily on ....
 */
export default class RadioSelection extends React.Component {

  constructor(props) {
    super(props);

    this._handleRadioSelection = this._handleRadioSelection.bind(this);
    this.state = {
      selectedOption: this.props.selectedOption,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.selectedOption !== nextProps.selectedOption) {
      return {
        selectedOption: nextProps.selectedOption,
      };
    }
    return null;
  }

  _handleRadioSelection(event) {
    const newValue = event.target.value;
    this.setState((prevState, props) =>
      ({ selectedOption: newValue }),
    () => this.props.onChange(newValue));
  }

  render() {
    const rand = Math.floor(Math.random() * 1e10);
    const lastElementIndex = this.props.radioLabels.length - 1;
    return (
      <div styleName={classNames('radioSelectionContainer', { [`alignment-${this.props.alignment}`]: true }, { invalid: this.props.invalid && !this.state.selectedOption })}>
        {this.props.radioLabels.map((radioLabel, index) => (
          <React.Fragment key={`radio_${radioLabel}`}>
            <div className={'radioContainer'}>
              <input
                styleName={'radioInput'}
                checked={this.state.selectedOption === radioLabel}
                name={this.props.name}
                id={`radio_${radioLabel}_${rand}`}
                name={this.props.name}
                onChange={this._handleRadioSelection}
                type="radio"
                value={radioLabel}
              />

              <label
                htmlFor={`radio_${radioLabel}_${rand}`}
                styleName={
                  classNames('radioLabel',
                    { checked: (this.state.selectedOption === radioLabel) },
                    { disabled: this.props.disabled })}
              >
                <span styleName={'radioIcon'} />
                {radioLabel}
              </label>
            </div>
            {index !== lastElementIndex && <div styleName={classNames({ [`spacer-${this.props.alignment}`]: true })} />}
          </React.Fragment>
        ))}
      </div>
    );
  }

}

RadioSelection.displayName = 'Radio Selection';

RadioSelection.defaultProps = {
  disabled: false,
  radioLabels: [],
  alignment: 'vertical',
  selectedOption: '',
  invalid: false,
  name: '',
  onChange: () => null,
};

RadioSelection.propTypes = {
  /**
   * Specifies the orientation of the radio group.
   */
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Changes the visual appearance, to signal that the usage was invalid.
   */
  invalid: PropTypes.bool,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Event handler.
   */
  onChange: PropTypes.func,
  /**
   * Specifies the different choices and values.
   */
  radioLabels: PropTypes.arrayOf(PropTypes.string),
  /**
   * Specifies a radio that is checked on page load.
   */
  selectedOption: PropTypes.string,
};

RadioSelection.examples = [
  { alignment: 'vertical', radioLabels: ['option 1', 'option 2', 'option 3'] },
  { alignment: 'horizontal', radioLabels: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'] },
];
