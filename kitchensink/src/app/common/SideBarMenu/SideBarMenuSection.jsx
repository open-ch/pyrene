import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './sideBarMenu.css';

const matchLink = pathname => (isMatch, location) => isMatch || location.pathname.startsWith(pathname);

export default class SideBarMenuSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      elementOpen: this.props.sectionElements.map(element => (
        { [element.name]: false }
      )),
      sectionContentWrapperHeight: 0,
      sectionElementContentWrapperHeight: 0,
    };
  }

  componentDidMount() {
    const refs = this.refs; // eslint-disable-line react/no-string-refs
    const keys = Object.keys(refs).filter(k => refs[k].parentElement.className === 'activeSideBar');
    if (keys.length > 0) {
      const key = Object.values(refs[keys[0]])[0].key;
      this.setState((prevState) => {
        const elementOpen = {
          ...prevState.elementOpen,
          [key]: !prevState.elementOpen[key],
        };
        return {
          open: true,
          elementOpen: elementOpen,
          sectionContentWrapperHeight: this.calculateSectionContentWrapperHeight(),
          sectionElementContentWrapperHeight: this.calculateSectionElementContentWrapperHeight(elementOpen),
        };
      });
    }

  }

  handleClick() {
    if (this.props.sectionElements.length > 0) {
      // Close section
      if (this.state.open) {
        this.setState({
          open: false,
          sectionContentWrapperHeight: 0,
          sectionElementContentWrapperHeight: 0,
        });
        // Open Section
      } else {
        this.setState(prevState => (
          {
            open: true,
            sectionContentWrapperHeight: this.calculateSectionContentWrapperHeight(),
            sectionElementContentWrapperHeight: this.calculateSectionElementContentWrapperHeight(prevState.elementOpen),
          }
        ));
      }
    }
  }

  handleElementClick(key) {
    if (this.props.sectionElements.length > 0) {
      // Toggle section
      this.setState((prevState) => {
        const elementOpen = {
          ...prevState.elementOpen,
          [key]: !prevState.elementOpen[key],
        };
        return {
          elementOpen: elementOpen,
          sectionElementContentWrapperHeight: this.calculateSectionElementContentWrapperHeight(elementOpen),
        };
      });
    }
  }

  calculateSectionContentWrapperHeight() {
    return this.props.sectionElements.length * 48 + 32 + this.state.sectionElementContentWrapperHeight;
  }

  calculateSectionElementContentWrapperHeight(elementOpen) {
    return this.props.sectionElements
      .reduce((a, b) => (elementOpen[b.name] && b.elements ? a + b.elements.length * 42 : a + 0), 0);
  }

  createNavLink(element, index, isSubElement, hasSubElements) {
    const navLink = (
      <NavLink to={hasSubElements ? '#' : element.linkToPath} activeClassName="activeSideBar" key={`${this.props.title}${element.name}`} isActive={matchLink(element.linkToPath)}>
        <div
          className="unSelectable"
          styleName={classNames(
            { sectionElement: !isSubElement },
            { sectionSubElement: isSubElement },
            { disabled: element.linkToPath === '#' && !element.elements },
          )}
          key={element.name}
          ref={`ref${index}`}
          onClick={() => this.handleElementClick(element.name)}
        >
          {element.name}
          {element.linkToPath === '#' && !element.elements && <span>Coming Soon</span>}
        </div>
      </NavLink>
    );
    return (
      isSubElement ? (
        <div styleName="sectionSubElementContainer" key={`${this.props.title}${element.name}`}>
          <div styleName="verticalLine" />
          {navLink}
        </div>
      ) : navLink
    );
  }

  render() {
    return (
      <div styleName={classNames('section', { open: this.state.open })}>
        {this.props.sectionElements.length > 0 && <div styleName="indicator" />}
        <NavLink to={`${this.props.linkToPath}`} activeClassName="activeSideBar" exact>
          <div className="unSelectable" styleName="sectionHead" onClick={() => this.handleClick()}>{this.props.title}</div>
        </NavLink>

        <div styleName="sectionContentWrapper" style={{ height: this.state.sectionContentWrapperHeight + this.state.sectionElementContentWrapperHeight }}>
          {this.props.sectionElements.map((element, index) => (
            <div key={`${this.props.title}${element.name}`}>
              {this.createNavLink(element, index, false, element.elements && element.elements.length > 0)}
              {element.elements && element.elements.length > 0 && this.state.elementOpen[element.name]
                && element.elements.map((subElement, subIndex) => this.createNavLink(subElement, subIndex, true, false))}
            </div>
          ))}
        </div>
      </div>
    );
  }

}

SideBarMenuSection.displayName = 'SideBarMenuSection';

SideBarMenuSection.defaultProps = {
  linkToPath: '#',
};

SideBarMenuSection.propTypes = {
  linkToPath: PropTypes.string,
  sectionElements: PropTypes.arrayOf(PropTypes.shape({
    elements: PropTypes.arrayOf(PropTypes.shape({
      linkToPath: PropTypes.string,
      name: PropTypes.string,
    })),
    linkToPath: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  title: PropTypes.string.isRequired,
};
