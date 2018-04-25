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
        {this.props.componentProps.map((prop) => {

          switch (prop.type.split(' ')[0]) {
            case 'String':
              return ([`${prop.propName}: `,
                <React.Fragment key={prop}>
                  <input type="text" name={prop.propName} placeholder={'change me'} onChange={event => this.modifiedProp(event)} /><br />
                </React.Fragment>
              ]);

            case 'oneOf:':
              return ([`${prop.propName}: `,
                <React.Fragment key={prop}>
                  <select name={prop.propName} onChange={event => this.modifiedProp(event)}>
                    {prop.type.split(' ').slice(1).map((propChoice, index) =>
                      <option value={propChoice} key={propChoice}>{index === 0 && 'default ('}{propChoice}{index === 0 && ')'}</option>
                    )}
                  </select><br />
                </React.Fragment>
              ]);

            case 'Bool':
              return ([`${prop.propName}: `,
                <React.Fragment key={prop}>
                  <Checkbox name={prop.propName} toggledCheckbox={this.modifiedProp} /><br />
                </React.Fragment>
              ]);

            default:
              return 'Error occurred in PropEditor: PropType unknown.';
          }
        })}
      </div>
    );
  }

}

PropEditor.displayName = 'PropEditor';

PropEditor.propTypes = {
  componentProps: PropTypes.arrayOf(PropTypes.shape({
    propName: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  onEditorChange: PropTypes.func.isRequired
};
