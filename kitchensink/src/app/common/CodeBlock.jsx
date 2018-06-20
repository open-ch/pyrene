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
      pinned: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.displayComponentPinned !== prevState.pinned) {
      return {
        pinned: nextProps.displayComponentPinned,
      };
    }
    // No State Change
    return null;
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

  handleExpand() {
    this.setState((prevState, props) => ({
      expanded: !prevState.expanded,
    }),
    () => this.handleCodeBlockStyle()
    );
  }

  generateCodeForComponent(component, entireCodeWanted) {
    let propList = `import { ${component.type.displayName} } from 'pyrene';\n`;
    // Stop right here if the box is collapsed
    if (!entireCodeWanted) {
      return propList;
    }

    propList += `<${component.type.displayName}\n`;
    Object.entries(component.props).forEach(([key, value]) => {
      if (value) {
        // Add Code Line, for booleans only display key
        if (typeof value === 'boolean') {
          propList += `\t${key}\n`;
        } else if (typeof value === 'function') {
          propList += `\t${key}={() => null}\n`;
        } else {
          propList += `\t${key}={${JSON.stringify(value).replace(/"/g, "'")}}\n`;
        }
      }
    });

    return `${propList}/>`;
  }

  render() {
    const displayedCode = this.generateCodeForComponent(this.props.component, this.state.expanded);
    const entireCode = this.generateCodeForComponent(this.props.component, true);
    return (
      <div styleName={classNames('codeContainer', { pinned: this.state.pinned })}>
        <SyntaxHighlighter style={osagCodeColorScheme} language={'jsx'} customStyle={this.handleCodeBlockStyle()}>
          {displayedCode}
        </SyntaxHighlighter>

        <div className={'unSelectable'} styleName={'copyToCBButton'} onClick={() => Utils.copyStringToClipboard(entireCode)} />
        <div className={'unSelectable'} styleName={'expandButton'} onClick={() => this.handleExpand()} />
      </div>
    );
  }

}

CodeBlock.displayName = 'CodeBlock';

CodeBlock.defaultProps = {};

CodeBlock.propTypes = {
  component: PropTypes.element.isRequired,
  displayComponentPinned: PropTypes.bool.isRequired,
};
