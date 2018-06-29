import React from 'react';
import { TextField, SingleSelect, MultiSelect, Checkbox } from 'pyrene';
import Table from './Table';
import PropTypes from 'prop-types';
import IconSelect from '../IconSelect/IconSelect';

import './dynamicPropTable.css';
import Counter from '../Counter/Counter';


export default class DynamicPropTable extends React.Component {

  constructor(props) {
    super(props);
    this.handlePropEditorChange = this.handlePropEditorChange.bind(this);
  }

  handlePropEditorChange(prop, newValue) {
    this.props.onEditorChange(prop, newValue);
  }

  handleArrays(propName, propProps) {
    if (propProps.type.value.name === 'string') {
      const options = this.props.activeValues[propName].map(propChoice => ({ value: propChoice, label: propChoice }));
      return (
        <MultiSelect
          key={propName}
          placeholder={'Select or create multiple options'}
          options={options}

          defaultValues={options.map(option => option.value)}
          value={this.props.activeValues[propName] && options}

          onChange={(changedOption) => {
            if (changedOption !== null) {
              this.handlePropEditorChange(propName, changedOption.map(option => option.label));
            } else {
              this.handlePropEditorChange(propName, changedOption);
            }
          }}
          clearable
          creatable
        />
      );
    }
    return (<React.Fragment key={propName}>-</React.Fragment>);
  }

  renderModifierFor(propName, propProps) {
    switch (propProps.type.name) {
      case 'string':
        return (
          <React.Fragment key={propName}>
            {propName === 'icon' ?
              <IconSelect
                inputValue={this.props.activeValues[propName]}
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
                inputText={this.props.activeValues[propName]}
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
            value={this.props.activeValues[propName] && { value: this.props.activeValues[propName], label: this.props.activeValues[propName] }}
            key={propName}
          />
        );

      case 'bool':
        return (
          <Checkbox
            key={propName}
            label={propName}
            checked={this.props.activeValues[propName]}
            onChange={value => this.handlePropEditorChange(propName, value)}
          />
        );

      case 'number':
        return (
          <Counter
            key={propName}
            number={this.props.activeValues[propName]}
            onChange={value => this.handlePropEditorChange(propName, value)}
          />
        );

      case 'arrayOf':
        return this.handleArrays(propName, propProps);

      default:
        return (<React.Fragment key={propName}> - </React.Fragment>);
    }
  }

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

DynamicPropTable.displayName = 'DynamicPropTable';

DynamicPropTable.defaultProps = {

};

DynamicPropTable.propTypes = {
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
  activeValues: PropTypes.object,
};
