import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../sideBarMenu.css';

import SectionSubElement from './SectionSubElement';

const SectionElementWithSubElements = ({
  element, isActive, activeSubElement,
}) => {

  const [isOpen, setIsOpen] = useState(isActive);

  return (
    <div
      className="unSelectable"
      styleName="sectionElementWithSubElements"
    >
      <div
        styleName="sectionElementTitle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {element.name}
      </div>

      {isOpen && element.elements.map(
        (subElement) => (
          <SectionSubElement
            key={subElement.name}
            element={subElement}
            isActive={!!activeSubElement && (activeSubElement === subElement.name)}
          />
        ),
      )}
    </div>
  );
};

SectionElementWithSubElements.displayName = 'SectionElementWithSubElements';

SectionElementWithSubElements.defaultProps = {
  activeSubElement: null,
};

SectionElementWithSubElements.propTypes = {
  activeSubElement: PropTypes.string,
  element: PropTypes.shape({
    elements: PropTypes.arrayOf(PropTypes.shape({
      linkToPath: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
    isChart: PropTypes.bool,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SectionElementWithSubElements;
