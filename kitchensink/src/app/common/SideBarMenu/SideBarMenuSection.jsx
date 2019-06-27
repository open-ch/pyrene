import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './sideBarMenu.css';


export default class SideBarMenuSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      elementOpen: {},
      sectionContentWrapperHeight: 0,
      sectionElementContentWrapperHeight: 0,
    };
  }

  componentDidMount() {
    const refs = this.refs; // eslint-disable-line react/no-string-refs
    if (Object.keys(refs).find(k => refs[k].parentElement.className === 'activeSideBar')) {
      this.setState({
        open: true,
        sectionContentWrapperHeight: this.calculateSectionContentWrapperHeight(),
        sectionElementContentWrapperHeight: this.calculateSectionElementContentWrapperHeight(),
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
        this.setState({
          open: true,
          sectionContentWrapperHeight: this.calculateSectionContentWrapperHeight(),
          sectionElementContentWrapperHeight: this.calculateSectionElementContentWrapperHeight(),
        });
      }
    }
  }

  handleElementClick(key) {
    if (this.props.sectionElements.length > 0) {
      // Close section
      if (this.state.elementOpen[key]) {
        this.setState((prevState) => {
          const elementOpen = prevState.elementOpen;
          elementOpen[key] = false;
          const sectionElementContentWrapperHeight = this.calculateSectionElementContentWrapperHeight();
          return { elementOpen, sectionElementContentWrapperHeight };
        });
        // Open Section
      } else {
        this.setState((prevState) => {
          const elementOpen = prevState.elementOpen;
          elementOpen[key] = true;
          const sectionElementContentWrapperHeight = this.calculateSectionElementContentWrapperHeight();
          return { elementOpen, sectionElementContentWrapperHeight };
        });
      }
    }
  }

  calculateSectionContentWrapperHeight() {
    return this.props.sectionElements.length * 48 + 32 + this.state.sectionElementContentWrapperHeight;
  }

  calculateSectionElementContentWrapperHeight() {
    return this.props.sectionElements
      .reduce((a, b) => (this.state.elementOpen[b.category] && b.elements ? a + b.elements.length * 42 : a + 0), 0);
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
            [
              <NavLink to={element.linkToPath} activeClassName="activeSideBar" key={`${this.props.title}${element.category}`}>
                <div
                  className="unSelectable"
                  styleName={classNames('sectionElement', { disabled: element.linkToPath === '#' && !element.elements })}
                  key={element.category}
                  ref={`ref${index}`}
                  onClick={() => this.handleElementClick(element.category)}
                >
                  {element.category}
                  {element.linkToPath === '#' && !element.elements && <span>Coming Soon</span>}
                </div>
              </NavLink>,
              (element.elements && element.elements.length > 0 && this.state.elementOpen[element.category])
                && element.elements.map((subElement, subIndex) => (
                  (
                    <NavLink to={subElement.linkToPath} activeClassName="activeSideBar" key={`${this.props.title}${subElement.name}`}>
                      <div
                        className="unSelectable"
                        styleName={classNames('sectionSubElement', { disabled: subElement.linkToPath === '#' })}
                        key={subElement.name}
                        ref={`ref${subIndex}`}
                      >
                        {subElement.name}
                        {subElement.linkToPath === '#' && <span>Coming Soon</span>}
                      </div>
                    </NavLink>
                  ))),
            ]
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
    category: PropTypes.string,
    elements: PropTypes.arrayOf(PropTypes.shape({
      linkToPath: PropTypes.string,
      name: PropTypes.string,
    })),
    linkToPath: PropTypes.string,
  })).isRequired,
  title: PropTypes.string.isRequired,
};
