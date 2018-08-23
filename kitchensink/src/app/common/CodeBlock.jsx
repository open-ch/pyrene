import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
      displayCopyNotification: false,
    };
  }

  handleCodeBlockStyle() {
    const syntaxHighlighterStyle = {
      margin: 0,
      borderRadius: '0 0 4px 4px',
      overflow: 'hidden',
      boxSizing: 'border-box',
    };

    if (this.state.expanded) {
      syntaxHighlighterStyle.padding = '16px 0 16px 16px';
    } else {
      syntaxHighlighterStyle.paddingLeft = '16px';
      syntaxHighlighterStyle.height = '56px';
      syntaxHighlighterStyle.display = 'flex';
      syntaxHighlighterStyle.alignItems = 'center';
    }
    return syntaxHighlighterStyle;
  }

  displayCopyNotifier = (displayTimeMS) => {
    this.setState(() => ({
      displayCopyNotification: true,
    }),
    () => {
      setTimeout(() => (
        this.setState(() => ({
          displayCopyNotification: false,
        }))
      ), displayTimeMS);
    }
    );
  };

  copyCodeToClipBoard(code) {
    this.displayCopyNotifier(500);
    Utils.copyStringToClipboard(code);
  };


  handleExpand() {
    this.setState((prevState, props) => ({
      expanded: !prevState.expanded,
    }),
    () => this.handleCodeBlockStyle()
    );
  }

  generateCodeForComponent(component, entireCodeWanted) {
    let propList = `import { ${component.type.name} } from 'pyrene';\n`;
    // Stop right here if the box is collapsed
    if (!entireCodeWanted) {
      return propList;
    }

    let hasChildren = false;

    propList += `<${component.type.name}\n`;
    Object.entries(component.props).sort().forEach(([key, value]) => {
      if (value && Object.keys(component.type.__docgenInfo.props).indexOf(key) > -1) {
        // Add Code Line, for booleans only display key
        if (typeof value === 'boolean') {
          propList += `\t${key}\n`;
        } else if (typeof value === 'function') { // for functions write () => null
          propList += `\t${key}={() => null}\n`;
        } else if (key === 'children') {
          hasChildren = true;
        } else {
          propList += `\t${key}={${JSON.stringify(value).replace(/"/g, "'")}}\n`;
        }
      }
    });

    if (!hasChildren) {
      return `${propList}/>`;
    }

    return `${propList}>\n\t<Children />\n</${component.type.name}>`;
  }

  render() {
    const displayedCode = this.generateCodeForComponent(this.props.component, this.state.expanded);
    const entireCode = this.generateCodeForComponent(this.props.component, true);
    return (
      <div styleName={classNames('codeContainer', { pinned: this.state.pinned })}>
        <SyntaxHighlighter style={osagCodeColorScheme} language={'jsx'} customStyle={this.handleCodeBlockStyle()}>
          {displayedCode}
        </SyntaxHighlighter>

        <div className={'unSelectable'} styleName={'copyToCBButton'} onClick={() => this.copyCodeToClipBoard(entireCode)} />
        <div styleName={classNames('copyNotification', { display: this.state.displayCopyNotification })}>
          <div styleName={'label'}>Copied to Clipboard</div>
        </div>
        <div className={'unSelectable'} styleName={'expandButton'} onClick={() => this.handleExpand()} />
      </div>
    );
  }

}

CodeBlock.displayName = 'CodeBlock';

CodeBlock.defaultProps = {};

CodeBlock.propTypes = {
  component: PropTypes.element.isRequired,
};
