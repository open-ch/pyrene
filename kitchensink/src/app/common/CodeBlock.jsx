import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import osagCodeColorScheme from '../../css/osagCodeColorScheme';
import Utils from './Utils';
import styles from '../../css/codeBlock.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

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

  handleExpand() {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }),
    () => this.handleCodeBlockStyle());
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
    });
  };

  copyCodeToClipBoard(code) {
    this.displayCopyNotifier(500);
    Utils.copyStringToClipboard(code);
  }

  generateCodeForComponent(component, entireCodeWanted) {
    let propList = `import { ${component.type.name} } from '${this.props.componentOrigin}';\n`;
    // Stop right here if the box is collapsed
    if (!entireCodeWanted) {
      return propList;
    }

    let hasChildren = false;

    propList += `<${component.type.name}\n`;
    Object.entries(component.props).sort().forEach(([key, value]) => {
      if (value && component.type.__docgenInfo.props && Object.keys(component.type.__docgenInfo.props).indexOf(key) > -1) { // eslint-disable-line no-underscore-dangle
        // Add Code Line, for booleans only display key
        if (typeof value === 'boolean') {
          propList += `\t${key}\n`;
        } else if (typeof value === 'function') { // for functions write () => null
          propList += `\t${key}={() => null}\n`;
        } else if (key === 'children') {
          hasChildren = true;
        } else {
          const jsonReplacer = (_, val) => {
            if (typeof val === 'function') {
              return '() => null';
            }
            return val;
          };
          propList += `\t${key}={${JSON.stringify(value, jsonReplacer).replace(/"/g, "'")}}\n`;
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
      <div className={clsx(styles.codeContainer, { [styles.pinned]: this.state.pinned })}>
        <SyntaxHighlighter style={osagCodeColorScheme} language="jsx" customStyle={this.handleCodeBlockStyle()}>
          {displayedCode}
        </SyntaxHighlighter>

        <div className={clsx('unSelectable', styles.copyToCBButton)} onClick={() => this.copyCodeToClipBoard(entireCode)} />
        <div className={clsx(styles.copyNotification, { [styles.display]: this.state.displayCopyNotification })}>
          <div className={styles.label}>Copied to Clipboard</div>
        </div>
        <div className={clsx('unSelectable', styles.expandButton)} onClick={() => this.handleExpand()} />
      </div>
    );
  }

}

CodeBlock.displayName = 'CodeBlock';

CodeBlock.defaultProps = {
  componentOrigin: 'pyrene',
};

CodeBlock.propTypes = {
  component: PropTypes.element.isRequired,
  componentOrigin: PropTypes.string,
};
