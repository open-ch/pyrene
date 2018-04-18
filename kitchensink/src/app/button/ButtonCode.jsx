import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'pyrene';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { prism } from 'react-syntax-highlighter/styles/prism';

import '../../css/componentPage.css';

registerLanguage('jsx', jsx);

var html1 = `import { Button } from 'pyrene';

<Button label={'Click Me'}
        type={'primary'}/>`;

const ButtonCode = props => (
  <div className={'buttonCode'}>
    <div styleName={'componentDisplayContainer'}>
      <Button label={'Click Me'} type={'primary'}/>
    </div>
    <SyntaxHighlighter style={prism} language={'jsx'} customStyle={{marginTop: 40}}>
      {html1}
    </SyntaxHighlighter>
  </div>
);


ButtonCode.displayName = 'ButtonCode';

ButtonCode.propTypes = {};

ButtonCode.defaultProps = {};

export default ButtonCode;