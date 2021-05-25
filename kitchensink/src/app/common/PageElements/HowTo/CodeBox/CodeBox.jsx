import React from 'react';
import PropTypes from 'prop-types';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import osagCodeColorScheme from '../../../../../css/osagCodeColorScheme';
import styles from './codeBox.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

// useInlineStyles={false}

const CodeBox = (props) => (
  <div className={styles.codeBox}>
    <SyntaxHighlighter style={osagCodeColorScheme} language="jsx" customStyle={{ borderRadius: 4 }}>
      {props.children}
    </SyntaxHighlighter>
  </div>
);

CodeBox.displayName = 'CodeBox';

CodeBox.defaultProps = {};

CodeBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CodeBox;
