import React from 'react';
import { TextField, SingleSelect, MultiSelect, Checkbox } from 'pyrene';
import Table from './Table';
import PropTypes from 'prop-types';
import IconSelect from '../IconSelect/IconSelect';

import './dynamicPropTable.css';
import Counter from '../Counter/Counter';


export default class DynamicPropTable extends React.Component {

  /*handleArrays(propName, propProps) {
    if (propProps.type.value.name === 'string') {
      const options = this.props.propValues[propName].map(propChoice => ({ value: propChoice, label: propChoice }));
      return (
        <MultiSelect
          key={propName}
          placeholder={'Select or create multiple options'}
          options={options}

          defaultValues={options.map(option => option.value)}
          value={this.props.propValues[propName] && options}

          onChange={(changedOption) => {
            if (changedOption !== null) {
              this.props.onEditorChange(propName, event);
            } else {
              this.props.onEditorChange(propName, event);
            }
          }}
          clearable
          creatable
        />
      );
    }
    return (<React.Fragment key={propName}>-</React.Fragment>);
  } */

  renderModifierFor(propName, propProps) {
    switch (propProps.type.name) {
      case 'string':
        return (
          <React.Fragment key={propName}>
            {propName === 'icon' ?
              <IconSelect {...this.props.initField(propName)} />
              :
              <TextField
                placeholder={'Change me'}
                {...this.props.initField(propName)}
              />
            }
          </React.Fragment>
        );

      case 'enum':
        const options = propProps.type.value.map(propChoice => ({ value: propChoice.value.replace(/'/g, ''), label: propChoice.value.replace(/'/g, '') }));
        return (
          <SingleSelect
            options={options}
            {...this.props.initField(propName)}
          />
        );

      case 'bool':
        return (
          <Checkbox
            label={propName}
            {...this.props.initField(propName)}
          />
        );

      case 'number':
        return (
          <Counter
            {...this.props.initField(propName)}
          />
        );

      /*case 'arrayOf':
        return this.handleArrays(propName, propProps);
        */

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
          rowArray={this.props.propDocumentation ? Object.entries(this.props.propDocumentation).map(([propName, propProps]) => {
            if (typeof propProps.defaultValue === 'undefined' || propProps.defaultValue.value === "''") {
              return [propName, propProps.type.name, propProps.required, '-', this.renderModifierFor(propName, propProps), propProps.description];
            }
            return [propName, propProps.type.name, propProps.required, propProps.defaultValue.value, this.renderModifierFor(propName, propProps), propProps.description];
          }) : []}
        />
      </div>
    );
  }

}

DynamicPropTable.displayName = 'DynamicPropTable';

DynamicPropTable.defaultProps = {
};

DynamicPropTable.propTypes = {
  propDocumentation: PropTypes.objectOf(PropTypes.shape({
    propName: PropTypes.objectOf(PropTypes.shape({
      defaultValue: PropTypes.string,
      description: PropTypes.string,
      required: PropTypes.bool,
      type: PropTypes.shape({
        name: PropTypes.string,
      }),
    })),
  })).isRequired,
  propValues: PropTypes.object,
  initField: PropTypes.func.isRequired,
};
