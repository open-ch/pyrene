import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './paragraph.css';

const Paragraph = props => (
  <div styleName={classNames('paragraph', { large: props.large })}>
    <div styleName={'title'}>{props.title}</div>
    <div>
      {props.children}
    </div>
  </div>
);


Paragraph.displayName = 'Paragraph';

Paragraph.propTypes = {
  title: PropTypes.string.isRequired,
  large: PropTypes.bool,
};

Paragraph.defaultProps = {
  large: false,
};

export default Paragraph;
