import React from 'react';
import {
  TextField, SingleSelect, Checkbox,
} from 'pyrene/dist/pyrene.dev';
import PropTypes from 'prop-types';
import Table from './Table';
import IconSelect from '../IconSelect/IconSelect';

import './dynamicPropTable.css';
import Counter from '../Counter/Counter';


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
              )
            }
          </React.Fragment>
        );

      case 'enum': {
        const fieldProps = this.props.initField(propName);
        // This is necessary because we wrote our orwn initField function in ComponentEditor which does not handle
        // value: {value: label:} properly.
        const processedFieldProps = { ...fieldProps, value: { value: fieldProps.value, label: fieldProps.value }, onChange: (v, e) => { fieldProps.onChange(v.value, e); } };
        return (
          <SingleSelect
            options={propProps.type.value.map(propChoice => ({ value: propChoice.value.replace(/'/g, ''), label: propChoice.value.replace(/'/g, '') }))}
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
};

DynamicPropTable.propTypes = {
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
