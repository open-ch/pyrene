import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import styles from '../sideBarMenu.css';

const SectionSubElement = ({ element, isActive }) => {
  const history = useHistory();

  return (
    <div className={styles.sectionSubElementContainer}>
      <div className={styles.verticalLine} />
      <div
        className={clsx('unSelectable', styles.sectionSubElement, { [styles.active]: isActive })}
        onClick={() => history.push(element.linkToPath)}
      >
        {element.name}
      </div>
    </div>

  );
};

SectionSubElement.displayName = 'SectionSubElement';

SectionSubElement.defaultProps = {};

SectionSubElement.propTypes = {
  element: PropTypes.shape({
    linkToPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SectionSubElement;
