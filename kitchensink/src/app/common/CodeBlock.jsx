import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import osagCodeColorScheme from '../../css/osagCodeColorScheme';
import Utils from './Utils';

import '../../css/propEditor.css';

registerLanguage('jsx', jsx);


export default class CodeBlock extends React.Component {

  _generateCodeForComponent(component) {
    let propList = `import { ${component.type.displayName} } from 'pyrene';\n`;
    propList += `<${component.type.displayName}\n`;

    Object.entries(component.props).forEach(([key, value]) => {
      if (value) {
        // Add Code Line, for booleans only display key
        if (typeof value === 'boolean') {
          propList += `\t${key}\n`;
        } else if (typeof value === 'function') {
          propList += `\t${key}={\n\t${value}}\n`;
        } else {
          propList += `\t${key}={${JSON.stringify(value).replace(/"/g, "'")}}\n`;
        }
      }
    });

    return `${propList}/>`;
  }

  render() {
    const generatedCode = this._generateCodeForComponent(this.props.component);
    return (
      <div styleName={'codeContainer'}>
        <SyntaxHighlighter style={osagCodeColorScheme} language={'jsx'} customStyle={{ margin: 0, borderRadius: 4}}>
          {generatedCode}
        </SyntaxHighlighter>
        <div className={'unSelectable'} styleName={'copyToCBIcon'} onClick={() => Utils.copyStringToClipboard(generatedCode)}>Copy code</div>
      </div>
    );
  }

}

CodeBlock.displayName = 'CodeBlock';

CodeBlock.defaultProps = {};

CodeBlock.propTypes = {
  component: PropTypes.element.isRequired
};
