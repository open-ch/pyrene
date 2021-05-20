import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import styles from '../sideBarMenu.css';

const SectionElement = ({ element, isActive }) => {
  const history = useHistory();

  return (
    <div
      className={clsx('unSelectable', styles.sectionElement, { [styles.active]: isActive })}
      onClick={() => history.push(element.linkToPath)}
    >
      {element.name}
    </div>
  );
};

SectionElement.displayName = 'SectionElement';

SectionElement.defaultProps = {};

SectionElement.propTypes = {
  element: PropTypes.shape({
    linkToPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SectionElement;
