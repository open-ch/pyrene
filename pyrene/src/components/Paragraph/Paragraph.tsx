import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

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

// type of children for compatibilty with kitchensink for pyrene documentation
Paragraph.propTypes = {
  /**
   * The paragraph text. This can be HTML with <br/> or <b>.
    */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default Paragraph;
