import React, { FunctionComponent } from 'react';

import './paragraph.css';

/**
* Paragraphs hold text that is not part of other components.
*/
const Paragraph: FunctionComponent<{}> = ({ children }) => (
  <div styleName="paragraph">
    {children}
  </div>
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
