import React from 'react';
import Components from 'pyrene/dist/pyrene.dev';
import SideBarMenuSection from './SideBarMenuSection';
import specialComponentHandlingData from '../../data/specialComponentHandlingData';

import './sideBarMenu.css';

const SideBarMenu = props => (
  <div styleName={'sideBar_menu_container'}>
    <div styleName="main">
      <SideBarMenuSection title="Introduction" sectionElements={[]} linkToPath={'/'} />
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
            .filter(component => specialComponentHandlingData[component.displayName.toLowerCase().replace(/\s/g, '')] ? !specialComponentHandlingData[component.displayName.toLowerCase().replace(/\s/g, '')].noComponentPage : true)
            .map((component) => {
              const lowercaseComponentName = component.displayName.replace(/\s/g, '').toLowerCase();
              return ({ name: component.displayName, linkToPath: `/${lowercaseComponentName}` });
            }).sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))}
      />
      <SideBarMenuSection
        title="Cookbooks"
        sectionElements={[
          { name: 'Form', linkToPath: '/form' },
          { name: 'Pyrene', linkToPath: '/pyrene' },
        ]}
      />
      {/* Site not ready yet as it has no relevant content
         <SideBarMenuSection title="Resources" sectionElements={[]} linkToPath={'/resources'} />
      */}

    </div>
  </div>
);


SideBarMenu.displayName = 'SideBarMenu';

export default SideBarMenu;
