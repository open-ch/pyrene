import React from 'react';
import Components from 'pyrene/dist/pyrene.dev';
import examples from 'pyrene/dist/pyrene.examples';
import SideBarMenuSection from './SideBarMenuSection';

import './sideBarMenu.css';

const SideBarMenu = () => (
  <div styleName="sideBar_menu_container">
    <div styleName="main">
      <SideBarMenuSection title="Introduction" sectionElements={[]} linkToPath="/" />
      <SideBarMenuSection
        title="Foundations"
        sectionElements={[
          { name: 'Colors', linkToPath: '/colors' },
          { name: 'Icons', linkToPath: '/icons' }]}
      />
      <SideBarMenuSection
        title="Components"
        sectionElements={
          Object.values(Components)
            .filter(component => examples[component.name])
            .map(component => ({ name: component.displayName, linkToPath: `/${component.name}` }))
            .sort((a, b) => a.name.localeCompare(b.name))}
      />
      <SideBarMenuSection
        title="Cookbooks"
        sectionElements={[
          { name: 'Form', linkToPath: '/form' },
          { name: 'Filter', linkToPath: '/filter' },
          { name: 'Pyrene', linkToPath: '/pyrene' },
        ]}
      />
    </div>
  </div>
);


SideBarMenu.displayName = 'SideBarMenu';

export default SideBarMenu;
