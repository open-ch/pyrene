import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../../../css/sideBarMenu.css';


export default class SideBarMenuSection extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      open: false,
      sectionContentWrapperHeight: 0
    }
  }

  handleClick(){
    if (this.props.children.length > 0) {
      // Close section
      if (this.state.open) {
        this.setState({
          open: false,
          sectionContentWrapperHeight: 0
        });
        // Open Section
      } else {
        this.setState({
          open: true,
          sectionContentWrapperHeight: this.props.children.length * 48 + 32
        });
      }
    }
  }

  render() {
    return (
      <div styleName={
        classNames('section', {
          'open':this.state.open
        })}>
        {this.props.children.length > 0 && <div styleName='indicator' />}
        <div className='unSelectable' styleName='sectionHead' onClick={() => this.handleClick()}>{this.props.title}</div>
        <div styleName='sectionContentWrapper' style={{height: this.state.sectionContentWrapperHeight}}>
          {this.props.children.map(element => {
            return (
              <div className='unSelectable' styleName='sectionElement' key={element}>{element}</div>
            );
          })}
        </div>
      </div>
    );
  }

}

SideBarMenuSection.displayName = 'SideBarMenuSection';

SideBarMenuSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array
};