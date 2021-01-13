import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import '../sideBarMenu.css';

const SectionElement = ({ element, isActive }) => {
  const history = useHistory();

  return (
    <div
      className="unSelectable"
      styleName={classNames('sectionElement', { active: isActive })}
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
