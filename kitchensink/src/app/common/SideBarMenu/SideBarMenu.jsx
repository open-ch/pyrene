import React from 'react';
import PropTypes from 'prop-types';
import SideBarMenuSection from './SideBarMenuSection';

import '../../../css/sideBarMenu.css';

const SideBarMenu = props => (
  <div id={'sideBar_menu_container'}>
    <div  styleName="main">
      <SideBarMenuSection title="Introduction" sectionElements={[]} linkToPath={'/'}/>
      <SideBarMenuSection title="Foundations" sectionElements={[{name:'Colors', linkToPath:'#'}, {name:'Typography', linkToPath:'#'}]} />
      <SideBarMenuSection title="Components" sectionElements={[{name:'Button', linkToPath:'/button'}, {name:'DropDown', linkToPath:'/dropdown'}]} />
    </div>
  </div>
);



SideBarMenu.displayName = 'SideBarMenu';

//SideBarMenu.propTypes = {
//};

//SideBarMenu.defaultProps = {
//};

export default SideBarMenu;
