import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../css/componentPage.css';
import CodeBlock from './CodeBlock';
import Utils from './Utils';
import DynamicPropTable from './PageElements/Tables/DynamicPropTable';
import Paragraph from './PageElements/Paragraph/Paragraph';
import ExampleBox from './PageElements/ExampleBox/ExampleBox';
import ParentButton from './PageElements/ParentButton/ParentButton';

export default class ComponentEditor extends React.Component {

  state = {
    componentProps: { ...this.props.component.defaultProps, ...this.props.examples.props },
    componentState: {},
    pinned: false,
    darkMode: false,
  };

  handlePinClick = () => {
    this.setState(prevState => ({
      pinned: !prevState.pinned,
    }));
  };

  handleSunClick = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode,
    }));
  };

  handleExampleClick = (exampleProps) => {
    this.setState({
      componentProps: { ...this.props.component.defaultProps, ...exampleProps },
    });
  };

  handleEditorChange = (value, type, key) => {
    let newValue = value;
    if (type === 'singleSelect') {
      newValue = value ? value.label : null;
    }

    const changedProp = { [key]: newValue };

    this.setState(prevState => ({
      componentProps: { ...prevState.componentProps, ...changedProp },
    }));
  };

  initField = mergedState => fieldName => ({
    name: fieldName,
    value: mergedState[fieldName],
    onChange: (value, event) => this.handleEditorChange(value, event.target.type, fieldName),
    disabled: Utils.isWiredProp(this.state.componentProps, fieldName),
  });

  setComponentState = (setStateArg) => {
    this.setState((prevState) => {
      const newState = typeof setStateArg === 'function' ? setStateArg(prevState.componentState) : setStateArg;
      return {
        componentState: {
          ...prevState.componentState,
          ...newState,
        },
      };
    });
  };

  getComponentProps = () => {
    const { componentProps, componentState } = this.state;
    const mergedProps = {
      ...Utils.getNormalProps(componentProps),
      ...Utils.getWiredProps(componentProps, {
        state: componentState,
        setState: this.setComponentState,
      }),
    };
    return mergedProps;
  };

  getComponentName = component => component.displayName.toLowerCase().replace(/\s/g, '');

  render() {
    const { component: Component } = this.props;
    const { pinned, darkMode } = this.state;
    const mergedComponentProps = this.getComponentProps();
    const initField = this.initField(mergedComponentProps);
    const displayedComponent = <Component {...mergedComponentProps} />;

    return (
      <div className="componentPlayground">
        {this.props.examples.examples
        && (
          <Paragraph title="Examples">
            <ExampleBox component={Component} examples={this.props.examples.examples} onExampleClick={this.handleExampleClick} />
          </Paragraph>
        )
        }
        <Paragraph title="Props">
          <div styleName={classNames('displayContainer', { pinned }, { darkMode })}>
            <div styleName={classNames('pin', { pinned })} onClick={() => this.handlePinClick()} />
            <div styleName={classNames('sun', { darkMode })} onClick={() => this.handleSunClick()} />
            <div styleName="componentDisplay">
              {this.props.examples.trigger ? <ParentButton component={displayedComponent} /> : displayedComponent}
            </div>
            <CodeBlock component={displayedComponent} displayComponentPinned={this.state.pinned} />
          </div>
          <DynamicPropTable
            propDocumentation={Component.__docgenInfo.props} // eslint-disable-line no-underscore-dangle
            initField={initField}
          />
        </Paragraph>
      </div>
    );
  }

}


ComponentEditor.displayName = 'ComponentEditor';

ComponentEditor.propTypes = {
  component: PropTypes.func.isRequired,
  examples: PropTypes.shape({
    examples: PropTypes.arrayOf(
      PropTypes.shape()
    ),
    props: PropTypes.shape(),
    trigger: PropTypes.bool,
  }).isRequired,
};

ComponentEditor.defaultProps = {
};
