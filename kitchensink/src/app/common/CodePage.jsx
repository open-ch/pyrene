import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../pyrene/dist/pyrene';
import '../../css/componentPage.css';
import Table from '../common/Table';
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
    this.setState({
      displayedComponent: <this.state.component {...this.state.displayedComponent.props} {...this.displayedComponentRef.current.state} {...changedProp} ref={this.displayedComponentRef} />
    });
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


CodePage.displayName = 'CodePage';

CodePage.propTypes = {
  component: PropTypes.func.isRequired,
  startProps: PropTypes.objectOf(PropTypes.any).isRequired
};

CodePage.defaultProps = {};

