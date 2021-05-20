import React from 'react';
import PropTypes from 'prop-types';
import styles from './paragraph.css';

const Paragraph = (props) => (
  <div className={styles.paragraph}>
    {props.title && <div className={styles.title}>{props.title}</div>}
    <div>
      {props.children}
    </div>
  </div>
);

Paragraph.displayName = 'Paragraph';

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Paragraph.defaultProps = {
  title: '',
};

export default Paragraph;
