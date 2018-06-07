import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../css/componentPage.css';
import CodeBlock from '../common/CodeBlock';
import PropTableEditor from './PageElements/Tables/PropTableEditor';
import Paragraph from './PageElements/Paragraph/Paragraph';
import ExampleBox from './PageElements/ExampleBox/ExampleBox';


export default class CodePage extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleExampleClick = this.handleExampleClick.bind(this);

    this.state = {
      displayedComponent: <this.props.component {...this.props.startProps} />,
      component: this.props.component,
      pinned: false,
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
        <Paragraph title={'Examples'} large>
          <ExampleBox component={this.props.component} onExampleClick={this.handleExampleClick}/>
        </Paragraph>
        <Paragraph title={'Props'} large>
          <div styleName={classNames('componentDisplayContainer', { pinned: this.state.pinned })}>
            {this.state.displayedComponent}
            <div styleName={classNames('pin', { pinned: this.state.pinned })} onClick={() => this.handlePinClick()} />
            <div styleName={'ufo'} onClick={() => this.handlePinClick()} />
          </div>
          <CodeBlock component={this.state.displayedComponent} />
          <PropTableEditor componentProps={this.props.component.__docgenInfo.props} activePropValues={this.state.displayedComponent.props} onEditorChange={this.handleEditorChange} />
        </Paragraph>
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

