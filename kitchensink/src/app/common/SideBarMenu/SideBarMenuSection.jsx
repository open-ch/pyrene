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
      sectionContentWrapperHeight: 0,
    };
  }

  componentDidMount() {
    // Open menu on page reload to display active section
    for (const ref in this.refs) {
      if (this.refs[ref].parentElement.className === 'activeSideBar') {
        this.setState({
          open: true,
          sectionContentWrapperHeight: this.props.sectionElements.length * 48 + 32,
        });
      }
    }
  }

  handleClick() {
    if (this.props.sectionElements.length > 0) {
      // Close section
      if (this.state.open) {
        this.setState({
          open: false,
          sectionContentWrapperHeight: 0,
        });
        // Open Section
      } else {
        this.setState({
          open: true,
          sectionContentWrapperHeight: this.props.sectionElements.length * 48 + 32,
        });
      }
    }
  }

  render() {
    return (
      <div styleName={classNames('section', { open: this.state.open })}>
        {this.props.sectionElements.length > 0 && <div styleName="indicator" />}
        <NavLink exact to={`${this.props.linkToPath}`} activeClassName="activeSideBar">
          <div className="unSelectable" styleName="sectionHead" onClick={() => this.handleClick()}>{this.props.title}</div>
        </NavLink>

        <div styleName="sectionContentWrapper" style={{ height: this.state.sectionContentWrapperHeight }}>
          {this.props.sectionElements.map((element, index) => (
            <NavLink to={element.linkToPath} activeClassName="activeSideBar" key={`${this.props.title}${element.name}`}>
              <div
                className="unSelectable"
                styleName={classNames('sectionElement', { disabled: element.linkToPath === '#' })}
                key={element.name}
                ref={`ref${index}`}
              >
                {element.name}
                {element.linkToPath === '#' && <span>Coming Soon</span>}
              </div>
            </NavLink>
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
    linkToPath: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  title: PropTypes.string.isRequired,
};
