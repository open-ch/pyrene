import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import osagCodeColorScheme from '../../css/osagCodeColorScheme';
import Utils from './Utils';

import '../../css/codeBlock.css';

registerLanguage('jsx', jsx);


export default class CodeBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleCodeBlockStyle() {
    const syntaxHighlighterStyle = {
      margin: 0,
      borderRadius: 4,
      overflow: 'hidden',
      boxSizing: 'border-box',
      transition: 'height 2s ease-in-out',
    };

    if (this.state.expanded) {
      syntaxHighlighterStyle.padding = '16px 0 16px 16px';
      delete syntaxHighlighterStyle.height;
      delete syntaxHighlighterStyle.lineHeight;
    } else {
      delete syntaxHighlighterStyle.padding;
      syntaxHighlighterStyle.paddingLeft = '16px';
      syntaxHighlighterStyle.height = '64px';
      syntaxHighlighterStyle.lineHeight = '36px';

    }
    return syntaxHighlighterStyle;
  }

  handleExpand() {
    this.setState((prevState, props) => ({
      expanded: !prevState.expanded,
    }),
    () => this.handleCodeBlockStyle()
    );
  }

  generateCodeForComponent(component) {
    let propList = `import { ${component.type.displayName} } from 'pyrene';\n`;
    // Stop right here if the box is collapsed
    if (!this.state.expanded) {
      return propList;
    }

    propList += `<${component.type.displayName}\n`;
    Object.entries(component.props).forEach(([key, value]) => {
      if (value) {
        // Add Code Line, for booleans only display key
        if (typeof value === 'boolean') {
          propList += `\t${key}\n`;
        } else if (typeof value === 'function') {
          propList += `\t${key}={${key}()}\n`;
        } else {
          propList += `\t${key}={${JSON.stringify(value).replace(/"/g, "'")}}\n`;
        }
      }
    });

    return `${propList}/>`;
  }

  render() {
    const generatedCode = this.generateCodeForComponent(this.props.component);
    return (
      <div styleName={'codeContainer'}>
        <SyntaxHighlighter style={osagCodeColorScheme} language={'jsx'} customStyle={this.handleCodeBlockStyle()}>
          {generatedCode}
        </SyntaxHighlighter>

        <div className={'unSelectable'} styleName={'copyToCBButton'} onClick={() => Utils.copyStringToClipboard(generatedCode)}>Copy code</div>
        <div className={'unSelectable'} styleName={'expandButton'} onClick={() => this.handleExpand()}>{`</>`}</div>
      </div>
    );
  }

}

CodeBlock.displayName = 'CodeBlock';

CodeBlock.defaultProps = {};

CodeBlock.propTypes = {
  component: PropTypes.element.isRequired,
};
