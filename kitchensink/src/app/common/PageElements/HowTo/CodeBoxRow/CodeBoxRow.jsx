import React from 'react';
import PropTypes from 'prop-types';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import osagCodeColorScheme from '../../../../../css/osagCodeColorScheme';

import './codeBox.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

// useInlineStyles={false}

const CodeBoxRow = (props) => (
  <div styleName="codeBox">
    <SyntaxHighlighter style={osagCodeColorScheme} language="jsx" customStyle={{ borderRadius: 4 }}>
      {props.children}
    </SyntaxHighlighter>
  </div>
);

CodeBoxRow.displayName = 'CodeBoxRow';

CodeBoxRow.defaultProps = {};

CodeBoxRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CodeBoxRow;
