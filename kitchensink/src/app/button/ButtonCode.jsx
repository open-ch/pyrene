import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'pyrene';
import '../../css/componentPage.css';
import Table from '../common/Table';
import PropEditor from '../common/PropEditor';
import CodeBlock from '../common/CodeBlock';


export default class ButtonCode extends React.Component {
  constructor(props){
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);

    this.state = {
      displayedComponent: <Button label={'Click Me'} type={'primary'} />
    }
  }

  handleEditorChange(target) {
    const changedProp = { [target.name]: target.value };
    this.setState({
      displayedComponent: <Button {...this.state.displayedComponent.props} {...changedProp} />
    })
  }

  render() {
    return (
      <div className={'buttonCode'}>
        <div styleName={'componentDisplayContainer'}>
          {this.state.displayedComponent}
        </div>
        <div styleName={'codeAndEditorShareContainer'}>
          <CodeBlock component={this.state.displayedComponent} />
          <PropEditor activePropValues={this.state.displayedComponent.props} componentProps={this.state.displayedComponent.type.docProps} onEditorChange={this.handleEditorChange} />
        </div>
        <Table
          title={'PropTable'}
          cellWidthArray={['200px', '100px', '100px', '150px', '']}
          headerElementArray={['property', 'isRequired', 'type', 'default value', 'description']}
          rowArray={this.state.displayedComponent.type.docProps.map(element => [element.propName, element.isRequired, element.type, element.defaultValue, element.description])}
        />
      </div>
    );
  }
}


ButtonCode.displayName = 'ButtonCode';

ButtonCode.propTypes = {};

ButtonCode.defaultProps = {};

