import React from 'react';
import {
  TextField, SingleSelect, Checkbox,
} from 'pyrene/dist/pyrene.dev';
import { exampleData } from 'pyrene-graphs/dist/pyrene-graphs.examples';
import PropTypes from 'prop-types';
import Table from './Table';
import IconSelect from '../IconSelect/IconSelect';

import './dynamicPropTable.css';
import Counter from '../Counter/Counter';

/* eslint-disable react/jsx-props-no-spreading */

export default class DynamicPropTable extends React.Component {

  renderModifierFor(propName, propProps) {

    switch (propProps.type.name) {
      case 'string':
        return (
          <React.Fragment key={propName}>
            {propName === 'icon'
              ? <IconSelect {...this.props.initField(propName)} />
              : (
                <TextField
                  placeholder="Change me"
                  {...this.props.initField(propName)}
                />
              )}
          </React.Fragment>
        );

      case 'enum': {
        // Special handling for SingleSelect/enum props: single select doesn't just take the prop value, it needs value={value: label:}
        const fieldProps = this.props.initField(propName);
        const processedFieldProps = { ...fieldProps, value: { value: fieldProps.value, label: fieldProps.value }, onChange: (v) => { fieldProps.onChange(v.value); } };
        return (
          <SingleSelect
            options={propProps.type.value.map((propChoice) => ({ value: propChoice.value.replace(/'/g, ''), label: propChoice.value.replace(/'/g, '') }))}
            {...processedFieldProps}
          />
        );
      }
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

      case 'arrayOf':
        if (this.props.componentCategory === 'Chart' && propName === 'data' && 'columns' in this.props.propDocumentation) {
          const fieldPropsData = this.props.initField(propName);
          const fieldPropsColumns = this.props.initField('columns');
          const processedFieldProps = { ...fieldPropsData, value: { value: Object.values(exampleData)[0], label: Object.keys(exampleData)[0] }, onChange: (v) => { fieldPropsData.onChange(v.value.data); fieldPropsColumns.onChange(v.value.columns); } };
          return (
            <SingleSelect
              options={Object.entries(exampleData).map(([key, value]) => ({ value: value, label: key }))}
              {...processedFieldProps}
            />
          );
        }
        return <React.Fragment key={propName}>-</React.Fragment>;

      default:
        return <React.Fragment key={propName}>-</React.Fragment>;
    }
  }

  render() {
    return (
      <div styleName="propTableEditor">
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
  componentCategory: '',
};

DynamicPropTable.propTypes = {
  componentCategory: PropTypes.string,
  initField: PropTypes.func.isRequired,
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
};
