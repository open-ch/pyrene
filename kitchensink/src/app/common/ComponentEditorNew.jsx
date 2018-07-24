import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../css/componentPage.css';
import CodeBlock from '../common/CodeBlock';
import DynamicPropTable from './PageElements/Tables/DynamicPropTable';
import Paragraph from './PageElements/Paragraph/Paragraph';
import ExampleBox from './PageElements/ExampleBox/ExampleBox';
import Utils from './Utils';

import ParentButton from './PageElements/ParentButton/ParentButton';


export default class ComponentEditor extends React.Component {
  state = {
    component: this.props.component,
    componentProps: {...this.props.component.defaultProps, ...this.props.startProps},

    pinned: true,
    darkMode: false,
  };

  handlePinClick = () => {
    this.setState((prevState, props) => ({
      pinned: !prevState.pinned,
    }));
  };

  handleSunClick = () => {
    this.setState((prevState, props) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  handleExampleClick = (exampleProps) => {
    this.setState(() => ({
      componentProps: {...this.props.component.defaultProps, ...exampleProps},
    }));
  };

  getValueFromInput = (target) => {
    switch (target.type) {
      case 'checkbox':
        return target.checked;
      case 'singleSelect':
        if (target.value == null) {
          return null;
        }
        return target.value.label;
      default:
        return target.value;
    }
  };

  handleEditorChange = (event) => {
    const inputName = event.target.name;
    const newValue = this.getValueFromInput(event.target);
    const changedProp = { [inputName]: newValue };

    this.setState((prevState, props) => ({
      componentProps: { ...prevState.componentProps, ...changedProp },
    }));
  };

  /* handleComponentInteraction = () => {
    if (typeof this.displayedComponentRef !== 'undefined') {
      this.setState(() => ({
        displayedComponent: <this.state.component {...this.state.displayedComponent.props} {...this.displayedComponentRef.current.state} />,
      }));
    }
  }; */

  initField = (fieldName) => {
    return ({
      name: fieldName,
      value: this.state.componentProps[fieldName],
      onChange: this.handleEditorChange,
    });
  };

  render() {
    const displayedComponent = <this.props.component {...this.state.componentProps} />;
    return (
      <div className={'componentPlayground'}>
        {this.props.component.examples &&
        <Paragraph title={'Examples'} large>
          <ExampleBox component={this.props.component} onExampleClick={this.handleExampleClick}/>
        </Paragraph>
        }
        <Paragraph title={'Props'} large>
          <div styleName={classNames('displayContainer', { pinned: this.state.pinned }, { darkMode: this.state.darkMode })}>
            <div styleName={classNames('pin', { pinned: this.state.pinned })} onClick={() => this.handlePinClick()} />
            <div styleName={classNames('sun', { darkMode: this.state.darkMode })} onClick={() =>this.handleSunClick()} />
            <div styleName={'componentDisplay'}>
              {this.props.component.needsTrigger ? <ParentButton component={displayedComponent} /> : displayedComponent}
            </div>
            <CodeBlock component={displayedComponent} displayComponentPinned={this.state.pinned} />
          </div>
          <DynamicPropTable
            propDocumentation={this.props.component.__docgenInfo.props}
            initField={this.initField}
          />
        </Paragraph>
      </div>
    );
  }

}


ComponentEditor.displayName = 'ComponentEditor';

ComponentEditor.propTypes = {
  component: PropTypes.func.isRequired,
  startProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

ComponentEditor.defaultProps = {};

