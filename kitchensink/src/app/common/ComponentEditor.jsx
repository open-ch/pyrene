import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../css/componentPage.css';
import CodeBlock from '../common/CodeBlock';
import DynamicPropTable from './PageElements/Tables/DynamicPropTable';
import Paragraph from './PageElements/Paragraph/Paragraph';
import ExampleBox from './PageElements/ExampleBox/ExampleBox';
import examplesData from '../data/examplesData';
import specialComponentHandlingData from '../data/specialComponentHandlingData';

import ParentButton from './PageElements/ParentButton/ParentButton';

const isObjectPropertyFunction = (object, key) => {
  return object.hasOwnProperty(key) && typeof object[key] === "function";
};

/**
 * We need to remove the dynamic props from the initial state so that they can be correctly registered later
 * @param {*} startProps
 */
const removeFunctionsFromStartProps = (startProps) => {
  const cleanStartProps = {};
  for (const key in startProps) {
    if (!isObjectPropertyFunction(startProps, key)) {
      cleanStartProps[key] = startProps[key];
    }
  }
  return cleanStartProps;
};

export default class ComponentEditor extends React.Component {

  handleComponentInteraction = (event) => {
    const newValue = this.getValueFromInput(event.target);
    this.setState((prevState) => ({
      componentProps: { ...prevState.componentProps, value: newValue },
    }));
  };

  state = {
    componentProps: { ...this.props.component.defaultProps, ...removeFunctionsFromStartProps(this.props.startProps) },
    pinned: false, //console change this back to true
    darkMode: false,
  };


  handlePinClick = () => {
    this.setState((prevState) => ({
      pinned: !prevState.pinned,
    }));
  };

  handleSunClick = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  handleExampleClick = (exampleProps) => {
    this.setState(() => ({
      componentProps: { ...this.props.component.defaultProps, ...exampleProps, onChange: this.handleComponentInteraction },
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

    this.setState((prevState) => ({
      componentProps: { ...prevState.componentProps, ...changedProp },
    }));
  };

  initField = mergedState => (fieldName) => {
    return ({
      name: fieldName,
      value: mergedState[fieldName],
      onChange: this.handleEditorChange,
      disabled: isObjectPropertyFunction(this.props.startProps, fieldName),
    });
  };

  setComponentState = (newState) => {
    this.setState((prevState) => ({
      ...prevState,
      componentProps: {
        ...prevState.componentProps,
        ...newState,
      },
    }));
  };

  getComponentState = () => {
    const { startProps } = this.props;
    const { componentProps } = this.state;
    const componentState = { ...componentProps };
    for (const key in startProps) {
      if (startProps.hasOwnProperty(key)) {
        const startProp = startProps[key];
        if (typeof startProp === "function") {
          componentState[key] = startProp({ state: componentProps, setState: this.setComponentState });
        }
      }
    }
    return componentState;
  };

  getComponentName = (component) => {
    return component.displayName.toLowerCase().replace(/\s/g, '');
  };

  render() {
    const { component: Component } = this.props;
    const { pinned, darkMode } = this.state;
    const mergedComponentProps = this.getComponentState();
    const displayedComponent = <Component {...mergedComponentProps} />;
    const componentName = this.getComponentName(Component);

    return (
      <div className={'componentPlayground'}>
        {examplesData[componentName] &&
        <Paragraph title={'Examples'}>
          <ExampleBox component={Component} onExampleClick={this.handleExampleClick}/>
        </Paragraph>
        }
        <Paragraph title={'Props'}>
          <div styleName={classNames('displayContainer', { pinned }, { darkMode })}>
            <div styleName={classNames('pin', { pinned })} onClick={() => this.handlePinClick()} />
            <div styleName={classNames('sun', { darkMode })} onClick={() => this.handleSunClick()} />
            <div styleName={'componentDisplay'}>
              {specialComponentHandlingData[componentName] && specialComponentHandlingData[componentName].needsTrigger ? <ParentButton component={displayedComponent} /> : displayedComponent}
            </div>
            <CodeBlock component={displayedComponent} displayComponentPinned={this.state.pinned} />
          </div>
          <DynamicPropTable
            propDocumentation={Component.__docgenInfo.props}
            initField={this.initField(mergedComponentProps)}
          />
        </Paragraph>
      </div>
    );
  }

}


ComponentEditor.displayName = 'ComponentEditor';

ComponentEditor.propTypes = {
  component: PropTypes.func.isRequired,
  startProps: PropTypes.object,
};

ComponentEditor.defaultProps = {};

