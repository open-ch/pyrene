import React from 'react';
import Components from 'pyrene/dist/pyrene.dev';
import examples from 'pyrene/dist/pyrene.examples';
import SideBarMenuSection from './SideBarMenuSection';

import './sideBarMenu.css';

function getExamples() {
  const otherSectionName = 'Other';
  const components = Object.values(Components)
    .filter(component => examples[component.name])
    .map(component => ({ category: component.category === undefined ? otherSectionName : component.category, name: component.displayName, linkToPath: `/${component.name}` }))
    .sort((a, b) => a.name.localeCompare(b.name));
  let categories = components
    .map(component => component.category)
    .filter((it, i, ar) => ar.indexOf(it) === i)
    .sort((a, b) => a.localeCompare(b));
  categories.push(categories.splice(categories.indexOf(otherSectionName), 1)[0]);
  categories = categories
    .map(category => ({
      category: category,
      linkToPath: `/${components
        .filter(component => component.category === category)[0].name}`,
      elements: components
        .filter(component => component.category === category)
        .map(component => ({ name: component.name, linkToPath: component.linkToPath })),
    }));
  return categories;
}

const SideBarMenu = () => (
  <div styleName="sideBar_menu_container">
    <div styleName="main">
      <SideBarMenuSection title="Introduction" sectionElements={[]} linkToPath="/" />
      <SideBarMenuSection
        title="Foundations"
        sectionElements={[
          { category: 'Colors', linkToPath: '/colors' },
          { category: 'Icons', linkToPath: '/icons' }]}
      />
      <SideBarMenuSection
        title="Components"
        sectionElements={getExamples()}
      />
      <SideBarMenuSection
        title="Cookbooks"
        sectionElements={[
          { category: 'Form', linkToPath: '/form' },
          { category: 'Pyrene', linkToPath: '/pyrene' },
        ]}
      />
    </div>
  </div>
);


SideBarMenu.displayName = 'SideBarMenu';

export default SideBarMenu;
