import React from 'react';
import { TextField, SingleSelect, Checkbox } from 'pyrene';
import Table from './Table';
import PropTypes from 'prop-types';
import IconSelect from '../IconSelect/IconSelect';

import './propTableEditor.css';


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
                onChange={changedOption => {
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
            <br />
          </React.Fragment>
        );

      case 'enum':
        const options = propProps.type.value.map((propChoice, index) => ({value: index, label: propChoice.value.replace(/'/g, '')}));
        return (
          <React.Fragment key={propName}>
            <SingleSelect
              options={options}
              onChange={changedOption => {
                if (changedOption !== null) {
                  this.handlePropEditorChange(propName, changedOption.label);
                } else {
                  this.handlePropEditorChange(propName, changedOption);
                }
              }}
              defaultValue={0}
              value={this.props.activePropValues[propName] && {value: this.props.activePropValues[propName], label: this.props.activePropValues[propName]}}
            />
          </React.Fragment>
        );

      case 'bool':
        return (
          <React.Fragment key={propName}>
            <Checkbox
              label={propName}
              checked={this.props.activePropValues[propName]}
              onChange={value => this.handlePropEditorChange(propName, value)}
            />
            <br />
          </React.Fragment>
        );

      case 'number':
        return ([`${propName}: `,
          <React.Fragment key={propName}>
            <input
              type="number"
              name={propName}
              value={this.props.activePropValues[propName]}
              placeholder={'change me'}
              onChange={value => this.handlePropEditorChange(propName, value)}
            />
            <br />
          </React.Fragment>
        ]);

      case 'func':
        return (<React.Fragment key={propName}> - <br /></React.Fragment>);

      default:
        return (<React.Fragment key={propName}>PropType not handled yet.<br /></React.Fragment>);
    }
  }


  render() {
    return (
      <div styleName='propTableEditor'>
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