import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../css/componentPage.css';
import CodeBlock from '../common/CodeBlock';
import DynamicPropTable from './PageElements/Tables/DynamicPropTable';
import Paragraph from './PageElements/Paragraph/Paragraph';
import ExampleBox from './PageElements/ExampleBox/ExampleBox';


export default class ComponentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleExampleClick = this.handleExampleClick.bind(this);

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

  handleExampleClick(exampleProps){
    this.setState(() => ({
      displayedComponent: <this.state.component {...exampleProps} />,
    }));
  }

  render() {
    return (
      <div className={'componentPlayground'}>
        {this.props.component.examples &&
        <Paragraph title={'Examples'} large>
          <ExampleBox component={this.props.component} onExampleClick={this.handleExampleClick}/>
        </Paragraph>
        }
        <Paragraph title={'Props'} large>
          <div styleName={classNames('displayContainer', { pinned: this.state.pinned })}>
            <div styleName={classNames('pin', { pinned: this.state.pinned })} onClick={() => this.handlePinClick()} />
            <div styleName={'componentDisplay'}>
              {this.state.displayedComponent}
            </div>
            <CodeBlock component={this.state.displayedComponent} displayComponentPinned={this.state.pinned} />
          </div>
          <DynamicPropTable componentProps={this.props.component.__docgenInfo.props} activePropValues={this.state.displayedComponent.props} onEditorChange={this.handleEditorChange} />
        </Paragraph>
      </div>
    );
  }

}


ComponentEditor.displayName = 'ComponentEditor';

ComponentEditor.propTypes = {
  component: PropTypes.func.isRequired,
  startProps: PropTypes.objectOf(PropTypes.any).isRequired
};

ComponentEditor.defaultProps = {};

