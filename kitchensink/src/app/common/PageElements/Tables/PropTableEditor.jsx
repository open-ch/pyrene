import React from 'react';
import { TextField, SingleSelect, Checkbox } from 'pyrene';
import Table from './Table';
import PropTypes from 'prop-types';
import IconSelect from '../IconSelect/IconSelect';

import './propTableEditor.css';
import Counter from '../Counter/Counter';


export default class PropTableEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handlePropEditorChange = this.handlePropEditorChange.bind(this);
  }

  handlePropEditorChange(prop, newValue) {
    this.props.onEditorChange(prop, newValue);
  }

  renderModifierFor(propName, propProps) {
    switch (propProps.type.name) {
      case 'string':
        return (
          <React.Fragment key={propName}>
            {propName === 'icon' ?
              <IconSelect
                inputValue={this.props.activePropValues[propName]}
                onChange={(changedOption) => {
                  if (changedOption !== null) {
                    this.handlePropEditorChange(propName, changedOption.label);
                  } else {
                    this.handlePropEditorChange(propName, changedOption);
                  }
                }}
              />
              :
              <TextField
                name={propName}
                placeholder={'Change me'}
                inputText={this.props.activePropValues[propName]}
                onChange={changedValue => this.handlePropEditorChange(propName, changedValue)}
              />
            }
          </React.Fragment>
        );

      case 'enum':
        const options = propProps.type.value.map((propChoice, index) => ({ value: index, label: propChoice.value.replace(/'/g, '') }));
        return (
          <SingleSelect
            options={options}
            onChange={(changedOption) => {
              if (changedOption !== null) {
                this.handlePropEditorChange(propName, changedOption.label);
              } else {
                this.handlePropEditorChange(propName, changedOption);
              }
            }}
            defaultValue={0}
            value={this.props.activePropValues[propName] && { value: this.props.activePropValues[propName], label: this.props.activePropValues[propName] }}
            key={propName}
          />
        );

      case 'bool':
        return (
          <Checkbox
            key={propName}
            label={propName}
            checked={this.props.activePropValues[propName]}
            onChange={value => this.handlePropEditorChange(propName, value)}
          />
        );

      case 'number':
        return (
          <Counter
            key={propName}
            number={this.props.activePropValues[propName]}
            onChange={value => this.handlePropEditorChange(propName, value)}
          />
        );

      case 'func':
        return (<React.Fragment key={propName}> - </React.Fragment>);

      default:
        return (<React.Fragment key={propName}>PropType not handled yet.</React.Fragment>);
    }
  }

  /* <input
              type="number"
              name={propName}
              value={this.props.activePropValues[propName]}
              placeholder={'change me'}
              onChange={value => this.handlePropEditorChange(propName, value)}
            /> */

  render() {
    return (
      <div styleName={'propTableEditor'}>
        <Table
          cellWidthArray={['212px', '106px', '106px', '212px', '']}
          headerElementArray={['property', 'type', 'required', 'default value', 'playground']}
          rowArray={Object.entries(this.props.componentProps).map(([propName, propProps]) => {
            if (typeof propProps.defaultValue === 'undefined' || propProps.defaultValue.value === "''") {
              return [propName, propProps.type.name, propProps.required, '-', this.renderModifierFor(propName, propProps), propProps.description];
            }
            return [propName, propProps.type.name, propProps.required, propProps.defaultValue.value, this.renderModifierFor(propName, propProps), propProps.description];
          })}
        />
      </div>
    );
  }

}

PropTableEditor.displayName = 'PropTableEditor';

PropTableEditor.defaultProps = {

};

PropTableEditor.propTypes = {
  componentProps: PropTypes.objectOf(PropTypes.shape({
    propName: PropTypes.objectOf(PropTypes.shape({
      defaultValue: PropTypes.string,
      description: PropTypes.string,
      required: PropTypes.bool,
      type: PropTypes.shape({
        name: PropTypes.string,
      }),
    })),
  })).isRequired,
  onEditorChange: PropTypes.func.isRequired,
  activePropValues: PropTypes.object,
};
