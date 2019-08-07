import React from 'react';
import ReactTable from 'react-table';
import {
  TextField, SingleSelect, Checkbox,
} from 'pyrene/dist/pyrene.dev';
import PropTypes from 'prop-types';
import Table from './Table';
import IconSelect from '../IconSelect/IconSelect';

import './dynamicPropTable.css';
import Counter from '../Counter/Counter';


export default class DynamicPropTable extends React.Component {

  constructor(props) {
    super();
    let data;
    let columns;
    Object.entries(props.propDocumentation).forEach(([propName, propProps]) => { // eslint-disable-line no-unused-vars
      if (propName === 'data') data = props.initField(propName).value;
      else if (propName === 'columns') {
        if (props.initField(propName).value.isArray) columns = props.initField(propName).value.map(d => ({ ...d, Cell: this.renderEditable }));
        else {
          columns = Object.values(props.initField(propName).value).map(d => ({
            accessor: d.accessor,
            Cell: this.renderEditable,
            Header: d.title,
            id: d.accessor,
          }));
        }
      }
    });
    this.state = {
      data: data,
      columns: columns,
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  handleInputChange = (cellInfo, event) => {
    let value = event.target.value;

    this.setState((prevState) => {
      const data = prevState.data;
      const type = typeof cellInfo.column.accessor(data[cellInfo.index]);
      if (type === 'number') {
        value = parseFloat(value);
      }

      const accessorString = cellInfo.column.accessor.toString();
      if (accessorString.includes('accessorString') && !accessorString.includes('.')) data[cellInfo.index][cellInfo.column.id] = value;
      else {
        const filtered = accessorString.match('(?<=return )(.*?)(?=\\;)')[0];
        const keyPath = accessorString.includes('accessorString') ? cellInfo.column.id : filtered.substring(filtered.indexOf('.') + 1);
        const obj = data[cellInfo.index];
        this.setNested(keyPath, value, obj);
        data[cellInfo.index] = obj;
      }
      this.props.initField('data').onChange(data, 'data');
      return { data };
    });
  };

  renderEditable = (cellInfo) => {
    const cellValue = cellInfo.column.accessor(this.state.data[cellInfo.index]);

    return (
      <input
        placeholder="type here"
        name="input"
        type="text"
        onChange={this.handleInputChange.bind(null, cellInfo)}
        value={cellValue}
      />
    );
  }

  setNested = (path, value, obj) => {
    let schema = obj;
    const pList = path.split('.');
    const len = pList.length;
    for (let i = 0; i < len - 1; i += 1) {
      const elem = pList[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }

    schema[pList[len - 1]] = value;
  }

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
        // Special handling for SingleSelect/enum props: single select doesn't just take the prop value, it needs value={value: label:}
        const fieldProps = this.props.initField(propName);
        const processedFieldProps = { ...fieldProps, value: { value: fieldProps.value, label: fieldProps.value }, onChange: (v) => { fieldProps.onChange(v.value); } };
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

      case 'arrayOf':
        if (propName === 'data') {
          return (
            <ReactTable
              data={this.state.data}
              columns={this.state.columns}
              defaultPageSize={this.state.data.length < 5 ? this.state.data.length : 5}
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
