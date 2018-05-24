import React from 'react';
import PropTypes from 'prop-types';

import '../../../css/paragraph.css';

const Paragraph = props => (
  <div styleName={'paragraph'}>
    <div styleName={'title'}>{props.title}</div>
    <div styleName={'content'}>
      {props.children}
    </div>
  </div>
);


Paragraph.displayName = 'Paragraph';

Paragraph.propTypes = {
  title: PropTypes.string.isRequired,
};

Paragraph.defaultProps = {

};

export default Paragraph;
