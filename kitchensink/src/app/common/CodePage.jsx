import React from 'react';
import PropTypes from 'prop-types';
import '../../css/componentPage.css';
import Table from './PageElements/Table';
import PropEditor from '../common/PropEditor';
import CodeBlock from '../common/CodeBlock';


export default class CodePage extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);

    this.displayedComponentRef = React.createRef();
    this.state = {
      displayedComponent: <this.props.component {...this.props.startProps} ref={this.displayedComponentRef} />,
      component: this.props.component
    };
  }

  handleEditorChange(target) {
    const changedProp = (target.type === 'checkbox') ? { [target.name]: target.checked } : { [target.name]: target.value };
    if (target.type === 'select-one') {
      changedProp[target.name] = changedProp[target.name].replace(/'/g, '');
    }
    if (target.type === 'number') {
      changedProp[target.name] = parseInt(changedProp[target.name], 10);
    }
    if (this.displayedComponentRef.current) {
      this.setState({
        displayedComponent: <this.state.component {...this.state.displayedComponent.props} {...this.displayedComponentRef.current.state} {...changedProp} ref={this.displayedComponentRef} />
      });
    } else {
      this.setState({
        displayedComponent: <this.state.component {...this.state.displayedComponent.props} {...changedProp} ref={this.displayedComponentRef} />
      });
    }
  }

  render() {
    return (
      <div className={'buttonCode'}>
        <div styleName={'componentDisplayContainer'}>
          {this.state.displayedComponent}
        </div>
        <div styleName={'codeAndEditorShareContainer'}>
          <CodeBlock component={this.state.displayedComponent} />
          <PropEditor activePropValues={this.state.displayedComponent.props} componentProps={this.props.component.__docgenInfo.props} onEditorChange={this.handleEditorChange} />
        </div>

        <Table
          title={'PropTable'}
          cellWidthArray={['200px', '100px', '100px', '150px', '']}
          headerElementArray={['property', 'isRequired', 'type', 'default value', 'description']}
          rowArray={Object.entries(this.props.component.__docgenInfo.props).map(([propName, propProps]) => {
            if (typeof propProps.defaultValue === 'undefined') {
              return [propName, propProps.required, propProps.type.name, '', propProps.description];
            }
            return [propName, propProps.required, propProps.type.name, propProps.defaultValue.value, propProps.description];
          })}
        />
      </div>
    );
  }

}


CodePage.displayName = 'CodePage';

CodePage.propTypes = {
  component: PropTypes.func.isRequired,
  startProps: PropTypes.objectOf(PropTypes.any).isRequired
};

CodePage.defaultProps = {};

