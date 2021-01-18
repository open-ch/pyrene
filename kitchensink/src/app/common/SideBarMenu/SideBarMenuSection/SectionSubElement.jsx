import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import '../sideBarMenu.css';

const SectionSubElement = ({ element, isActive }) => {
  const history = useHistory();

  return (
    <div styleName="sectionSubElementContainer">
      <div styleName="verticalLine" />
      <div
        className="unSelectable"
        styleName={classNames('sectionSubElement', { active: isActive })}
        onClick={() => history.push(element.linkToPath)}
      >
        {element.name}
      </div>
    </div>

  );
};

SectionSubElement.displayName = 'SectionSubElement';

SectionSubElement.defaultProps = {
  isActive: null,
};

SectionSubElement.propTypes = {
  element: PropTypes.shape({
    linkToPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool,
};

export default SectionSubElement;
