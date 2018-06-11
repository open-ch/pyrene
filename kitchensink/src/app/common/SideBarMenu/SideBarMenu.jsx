import React from 'react';
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
        sectionElements={[
          { name: 'Arrow-Button', linkToPath: '/arrowButton' },
          { name: 'Button', linkToPath: '/button' },
          { name: 'Link', linkToPath: '/link' },
          { name: 'Share', linkToPath: '/shareDialog' },
          { name: 'Checkbox', linkToPath: '/checkbox' },
          { name: 'Radio', linkToPath: '/radio' },
          { name: 'Textfield', linkToPath: '/textField' },
          { name: 'Textarea', linkToPath: '/textArea' },
          { name: 'Select', linkToPath: '/singleSelect' },
          { name: 'Select (Multi)', linkToPath: '/multiSelect' },
          { name: 'Modal', linkToPath: '#' }].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))}
      />
      <SideBarMenuSection title="Resources" sectionElements={[]} linkToPath={'/resources'} />
    </div>
  </div>
);


SideBarMenu.displayName = 'SideBarMenu';

export default SideBarMenu;
