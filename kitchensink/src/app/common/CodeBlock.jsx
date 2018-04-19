import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { prism } from 'react-syntax-highlighter/styles/prism';
registerLanguage('jsx', jsx);


export default class CodeBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  _generateCodeForComponent(component) {
    let propList = `import { ${component.type.displayName} } from 'pyrene';\n`;
    propList = propList + `<${component.type.displayName}\n`;
    for (let val in component.props) {
      propList = propList + `\u0009${val}={'${component.props[val]}'}\n`;
    }
    return ` ${propList}/>`;
  }

  render() {
    return (
      <SyntaxHighlighter style={prism} language={'jsx'} customStyle={{margin: 0, width: '50%'}}>
        {this._generateCodeForComponent(this.props.component)}
      </SyntaxHighlighter>
    );
  }

}

CodeBlock.displayName = 'CodeBlock';

CodeBlock.defaultProps = {};

CodeBlock.propTypes = {
  component: PropTypes.element.isRequired
};