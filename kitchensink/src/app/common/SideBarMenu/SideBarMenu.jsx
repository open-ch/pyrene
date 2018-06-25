import React from 'react';
import Components from 'pyrene';
import SideBarMenuSection from './SideBarMenuSection';

import './sideBarMenu.css';

const SideBarMenu = props => (
  <div id={'sideBar_menu_container'}>
    <div styleName="main">
      <SideBarMenuSection title="Introduction" sectionElements={[]} linkToPath={'/'} />
      <SideBarMenuSection
        title="Foundations"
        sectionElements={[
          { name: 'Colors', linkToPath: '/colors' },
          { name: 'Icons', linkToPath: '/icons' },
          { name: 'Typography', linkToPath: '#' }]}
      />
      <SideBarMenuSection
        title="Components"
        sectionElements={
          Object.values(Components).map((component) => {
            const lowercaseComponentName = component.displayName.replace(/\s/g, '').toLowerCase();
            return ({ name: component.displayName, linkToPath: `/${lowercaseComponentName}` });
          }).sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))}
      />
      <SideBarMenuSection title="Resources" sectionElements={[]} linkToPath={'/resources'} />
    </div>
  </div>
);


SideBarMenu.displayName = 'SideBarMenu';

export default SideBarMenu;
