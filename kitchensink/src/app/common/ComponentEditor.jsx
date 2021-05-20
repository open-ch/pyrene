import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../../css/componentPage.css';
import CodeBlock from './CodeBlock';
import Utils from './Utils';
import DynamicPropTable from './PageElements/Tables/DynamicPropTable';
import Paragraph from './PageElements/Paragraph/Paragraph';
import ExampleBox from './PageElements/ExampleBox/ExampleBox';
import ParentButton from './PageElements/ParentButton/ParentButton';

export default class ComponentEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      componentProps: { ...props.component.defaultProps, ...props.examples.props },
      componentState: {},
      pinned: false,
      darkMode: false,
    };
  }

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
    this.setState({
      componentProps: { ...this.props.component.defaultProps, ...exampleProps },
    });
  };

  handleEditorChange = (value, key) => {
    const changedProp = { [key]: value };

    this.setState((prevState) => ({
      componentProps: { ...prevState.componentProps, ...changedProp },
    }));
  };

  initField = (mergedState) => (fieldName) => ({
    name: fieldName,
    value: mergedState[fieldName],
    onChange: (value) => this.handleEditorChange(value, fieldName),
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

  getComponentName = (component) => component.displayName.toLowerCase().replace(/\s/g, '');

  render() {
    const { component: Component } = this.props;
    const { pinned, darkMode } = this.state;
    const mergedComponentProps = this.getComponentProps();
    const initField = this.initField(mergedComponentProps);

    /* eslint-disable-next-line react/jsx-props-no-spreading */
    const displayedComponent = <Component {...mergedComponentProps} />;
    return (
      <div className={styles.componentPlayground}>
        {this.props.examples.examples
        && (
          <Paragraph title="Examples">
            <ExampleBox component={Component} examples={this.props.examples.examples} onExampleClick={this.handleExampleClick} />
          </Paragraph>
        )}
        <Paragraph title="Props">
          <div className={clsx(styles.displayContainer, { [styles.pinned]: pinned }, { [styles.darkMode]: darkMode })}>
            <div className={clsx(styles.pin, { [styles.pinned]: pinned })} onClick={() => this.handlePinClick()} />
            <div className={clsx(styles.sun, { [styles.darkMode]: darkMode })} onClick={() => this.handleSunClick()} />
            <div className={styles.componentDisplay}>
              {this.props.examples.trigger ? <ParentButton component={displayedComponent} /> : displayedComponent}
            </div>
            <CodeBlock
              component={displayedComponent}
              componentOrigin={this.props.componentOrigin}
              displayComponentPinned={this.state.pinned}

            />
          </div>
          <DynamicPropTable
            propDocumentation={Component.__docgenInfo.props} // eslint-disable-line no-underscore-dangle
            initField={initField}
            componentCategory={this.props.examples.category}
          />
        </Paragraph>
      </div>
    );
  }

}

ComponentEditor.displayName = 'ComponentEditor';

ComponentEditor.defaultProps = {
  componentOrigin: 'pyrene',
};

ComponentEditor.propTypes = {
  component: PropTypes.func.isRequired,
  componentOrigin: PropTypes.string,
  examples: PropTypes.shape({
    category: PropTypes.string,
    examples: PropTypes.arrayOf(
      PropTypes.shape(),
    ),
    props: PropTypes.shape(),
    trigger: PropTypes.bool,
  }).isRequired,
};

ComponentEditor.defaultProps = {
};
