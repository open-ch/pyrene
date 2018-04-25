import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { prism } from 'react-syntax-highlighter/styles/prism';

registerLanguage('jsx', jsx);


export default class CodeBlock extends React.Component {

  _generateCodeForComponent(component) {
    let propList = `import { ${component.type.displayName} } from 'pyrene';\n`;
    propList += `<${component.type.displayName}\n`;

    Object.entries(component.props).forEach(([key, value]) => {
      if (value) {

        let quote = "'";
        if (typeof value !== 'string') {
          quote = '';
        }

        // Add Code Line
        propList += `\t${key}={${quote}${value}${quote}}\n`;
      }
    });

    return ` ${propList}/>`;
  }

  render() {
    return (
      <SyntaxHighlighter style={prism} language={'jsx'} customStyle={{ margin: 0, width: '50%' }}>
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
