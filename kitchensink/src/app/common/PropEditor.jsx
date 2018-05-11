import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import '../../css/propEditor.css';


export default class PropEditor extends React.Component {

  constructor(props) {
    super(props);
    this.modifiedProp = this.modifiedProp.bind(this);
  }

  modifiedProp(event) {
    this.props.onEditorChange(event.target);
  }

  render() {
    return (
      <div styleName={'propEditor'}>
        {Object.entries(this.props.componentProps).map(([propName, propProps]) => {
          switch (propProps.type.name) {
            case 'string':
              return ([`${propName}: `,
                <React.Fragment key={propName}>
                  <input type="text" name={propName} placeholder={'change me'} onChange={event => this.modifiedProp(event)} /><br />
                </React.Fragment>
              ]);

            case 'enum':
              return ([`${propName}: `,
                <React.Fragment key={propName}>
                  <select name={propName} onChange={event => this.modifiedProp(event)}>
                    {propProps.type.value.map((propChoice, index) =>
                      <option value={propChoice.value} key={propChoice.value}>{index === 0 && 'default ('}{propChoice.value.replace(/'/g, '')}{index === 0 && ')'}</option>
                    )}
                  </select><br />
                </React.Fragment>
              ]);

            case 'bool':
              return ([`${propName}: `,
                <React.Fragment key={propName}>
                  <Checkbox name={propName} toggledCheckbox={this.modifiedProp} /><br />
                </React.Fragment>
              ]);
            case 'number':
              return ([`${propName}: `,
                <React.Fragment key={propName}>
                  <input type="number" name={propName} value={this.props.activePropValues[propName]} placeholder={'change me'} onChange={event => this.modifiedProp(event)} /><br />
                </React.Fragment>
              ]);

            case 'func':
              return ([`Function: ${propName}`, <br />]);


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

