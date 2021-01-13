import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useHistory, useLocation } from 'react-router-dom';

import '../sideBarMenu.css';

import SectionElement from './SectionElement';
import SectionElementWithSubElements from './SectionElementWithSubElements';

const getCurrentlyActiveSectionSubElement = (sectionSubElements, location) => sectionSubElements.find((subElement) => location.pathname.endsWith(subElement.linkToPath));

const getCurrentlyActiveSectionElement = (sectionElements, location) => sectionElements?.find((element) => {
  if (element?.elements?.length > 0) {
    return getCurrentlyActiveSectionSubElement(element.elements, location);
  }
  return element?.linkToPath === location.pathname;
});

const getCurrentlyActive = (title, sectionElements, pathname, location) => {
  if (sectionElements?.length > 0) {
    const currentlyActiveSectionElement = getCurrentlyActiveSectionElement(sectionElements, location);
    if (currentlyActiveSectionElement?.elements?.length > 0) {
      const currentlyActiveSectionSubElement = getCurrentlyActiveSectionSubElement(currentlyActiveSectionElement.elements, location);
      return currentlyActiveSectionSubElement
        ? { section: title, element: currentlyActiveSectionElement.name, subElement: currentlyActiveSectionSubElement.name }
        : null;
    }
    return currentlyActiveSectionElement
      ? { section: title, element: currentlyActiveSectionElement.name }
      : null;
  }
  return pathname === location.pathname
    ? { section: title }
    : null;
};

const SideBarMenuSection = ({ title, sectionElements, linkToPath }) => {

  const history = useHistory();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(null);
  const [currentlyActive, setCurrentlyActive] = useState(null);

  useEffect(() => {
    setCurrentlyActive(getCurrentlyActive(title, sectionElements, linkToPath, location));
  }, [title, sectionElements, linkToPath, location]);

  useEffect(() => {
    if (currentlyActive) {
      setIsOpen(isOpen ?? currentlyActive?.section === title);
    }
  }, [currentlyActive, isOpen, title]);

  const handleClick = () => {
    if (linkToPath) {
      history.push(linkToPath);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const hasSectionElements = sectionElements?.length > 0;

  return (
    <div styleName={classNames(
      'section',
      {
        open: isOpen && hasSectionElements,
        active: currentlyActive?.section === title,
      },
    )}
    >
      <div
        className="unSelectable"
        styleName="sectionHead"
        onClick={handleClick}
      >
        {title}
      </div>
      {hasSectionElements && <div styleName="indicator" />}

      {isOpen && (
        <div
          styleName="sectionContentWrapper"
        >
          {sectionElements.map((element) => (
            <div key={`${title}${element.name}`}>
              { (element.elements && element.elements.length > 0)
                ? (
                  <SectionElementWithSubElements
                    element={element}
                    isActive={currentlyActive?.element === element.name}
                    activeSubElement={currentlyActive?.subElement}
                  />
                )
                : (
                  <SectionElement
                    element={element}
                    isActive={currentlyActive?.element === element.name}
                  />
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SideBarMenuSection.displayName = 'SideBarMenuSection';

SideBarMenuSection.defaultProps = {
  linkToPath: null,
};

SideBarMenuSection.propTypes = {
  linkToPath: PropTypes.string,
  sectionElements: PropTypes.arrayOf(PropTypes.shape({
    elements: PropTypes.arrayOf(PropTypes.shape({
      linkToPath: PropTypes.string,
      name: PropTypes.string,
    })),
    isChart: PropTypes.bool,
    linkToPath: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default SideBarMenuSection;
