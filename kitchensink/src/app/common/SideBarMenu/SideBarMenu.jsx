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
          { name: 'Button', linkToPath: '/button' },
          { name: 'Link', linkToPath: '/link' },
          { name: 'Share', linkToPath: '/shareDialog' },
          { name: 'Checkbox', linkToPath: '/checkbox' },
          { name: 'Radio', linkToPath: '/radio' },
          { name: 'Textfield', linkToPath: '/textField' },
          { name: 'Textarea', linkToPath: '/textArea' },
          { name: 'Selection Elements', linkToPath: '/select' },
          { name: 'Modal', linkToPath: '/modal' }]}
      />
      <SideBarMenuSection title="Resources" sectionElements={[]} linkToPath={'/resources'} />
    </div>
  </div>
);


SideBarMenu.displayName = 'SideBarMenu';

export default SideBarMenu;
