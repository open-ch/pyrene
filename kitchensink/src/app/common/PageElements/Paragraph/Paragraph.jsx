import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './paragraph.css';

const Paragraph = props => (
  <div styleName={classNames('paragraph', { large: props.large })}>
    {props.title && <div styleName={'title'}>{props.title}</div>}
    <div>
      {props.children}
    </div>
  </div>
);


Paragraph.displayName = 'Paragraph';

Paragraph.propTypes = {
  large: PropTypes.bool,
  title: PropTypes.string,
};

Paragraph.defaultProps = {
  title: '',
  large: false,
};

export default Paragraph;
