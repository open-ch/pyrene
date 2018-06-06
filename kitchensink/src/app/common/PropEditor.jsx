import React from 'react';
import PropTypes from 'prop-types';
import { TextField, SingleSelect, Checkbox } from 'pyrene';
import '../../css/propEditor.css';
import IconSelect from './PageElements/IconSelect/IconSelect';


export default class PropEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handlePropEditorChange = this.handlePropEditorChange.bind(this);
  }

  handlePropEditorChange(prop, newValue) {
    this.props.onEditorChange(prop, newValue);
  }

  render() {
    return (
      <div styleName={'propEditor'}>
        {Object.entries(this.props.componentProps).map(([propName, propProps]) => {
          switch (propProps.type.name) {
            case 'string':
              return (
                <React.Fragment key={propName}>
                  {propName === 'icon' ?
                    <IconSelect
                      title={propName}
                      onChange={changedOption => this.handlePropEditorChange(propName, changedOption.label)}
                    />
                    :
                    <TextField
                      title={propName}
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
                    title={propName}
                    options={options}
                    onChange={changedOption => this.handlePropEditorChange(propName, changedOption.label)}
                    defaultValue={0}
                  />
                </React.Fragment>
              );

            case 'bool':
              return (
                <React.Fragment key={propName}>
                  <Checkbox label={propName} checked={this.props.activePropValues[propName]} onChange={value => this.handlePropEditorChange(propName, value)} /><br />
                </React.Fragment>
              );

            case 'number':
              return ([`${propName}: `,
                <React.Fragment key={propName}>
                  <input type="number" name={propName} value={this.props.activePropValues[propName]} placeholder={'change me'} onChange={event => this.modifiedProp(event)} /><br />
                </React.Fragment>
              ]);

            case 'func':
              return (<React.Fragment key={propName}>Function: {propName}<br /></React.Fragment>);

            case 'arrayOf':
              return (<React.Fragment key={propName}>Array functionality not included yet. <br /></React.Fragment>);

            default:
              return (<React.Fragment key={propName}>Error occurred in PropEditor: PropType unknown. <br /></React.Fragment>);
          }
        })}
      </div>
    );
  }

}

PropEditor.displayName = 'PropEditor';

PropEditor.propTypes = {
  componentProps: PropTypes.objectOf(PropTypes.shape({
    propName: PropTypes.objectOf(PropTypes.shape({
      defaultValue: PropTypes.string,
      description: PropTypes.string,
      required: PropTypes.bool,
      type: PropTypes.shape({
        name: PropTypes.string
      })
    }))
  })).isRequired,
  onEditorChange: PropTypes.func.isRequired,
  activePropValues: PropTypes.object
};

