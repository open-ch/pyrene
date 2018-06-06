import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../css/componentPage.css';
import Table from './PageElements/Tables/Table';
import PropEditor from '../common/PropEditor';
import CodeBlock from '../common/CodeBlock';


export default class CodePage extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);

    this.state = {
      displayedComponent: <this.props.component {...this.props.startProps} />,
      component: this.props.component,
      pinned: true,
    };
  }

  handleEditorChange(prop, newValue) {
    const changedProp = { [prop]: newValue };
    this.setState(() => ({
      displayedComponent: <this.state.component {...this.state.displayedComponent.props} {...changedProp} />
    }));
  }

  handlePinClick() {
    this.setState((prevState, props) => ({
      pinned: !prevState.pinned,
    }));
  }

  render() {
    return (
      <div className={'buttonCode'}>
        <div styleName={classNames('componentDisplayContainer', { pinned: this.state.pinned })}>
          {this.state.displayedComponent}
          <div styleName={classNames('pin', { pinned: this.state.pinned })} onClick={() => this.handlePinClick()} />
        </div>
        <CodeBlock component={this.state.displayedComponent} />
        <PropEditor activePropValues={this.state.displayedComponent.props} componentProps={this.props.component.__docgenInfo.props} onEditorChange={this.handleEditorChange} />
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

