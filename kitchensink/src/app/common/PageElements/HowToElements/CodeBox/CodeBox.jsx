import React from 'react';
import PropTypes from 'prop-types';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import osagCodeColorScheme from '../../../../../css/osagCodeColorScheme';

SyntaxHighlighter.registerLanguage('jsx', jsx);

import './codeBox.css';

//useInlineStyles={false}

const CodeBox = props => (
  <div styleName={'codeBox'}>
    <SyntaxHighlighter style={osagCodeColorScheme} language={'jsx'} customStyle={{ borderRadius: 4 }}>
      {props.children}
    </SyntaxHighlighter>
  </div>
);


CodeBox.displayName = 'CodeBox';

CodeBox.defaultProps = {};

CodeBox.propTypes = {};

export default CodeBox;
