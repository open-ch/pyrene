import React from 'react';
import PropTypes from 'prop-types';
import SideBarMenuSection from './SideBarMenuSection';

import '../../../css/sideBarMenu.css';

const SideBarMenu = props => (
  <div id={'sideBar_menu_container'}>
    <div  styleName="main">
      <SideBarMenuSection title="Introduction" children={[]} />
      <SideBarMenuSection title="Foundations" children={['Colors', 'Typography', 'Grids', 'Shapes']} />
      <SideBarMenuSection title="Components" children={['Colors', 'Typography', 'Grids', 'Shapes']} />
    </div>
  </div>
);



SideBarMenu.displayName = 'SideBarMenu';

SideBarMenu.propTypes = {
  selected: PropTypes.string, // .isRequired, // Currently selected item
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }))
};

SideBarMenu.defaultProps = {
  // PLACEHOLDER
  items: [ // List of items for the main navigation
    {
      name: 'schedule',
      url: 'shiftPlan.html'
    },
    {
      name: 'trades',
      url: 'trades.html'
    },
    {
      name: 'reports',
      url: 'reports.html'
    },
    {
      name: 'admin',
      url: 'admin.html'
    }
  ]
};

export default SideBarMenu;
