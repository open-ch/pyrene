import React from 'react';
import Components from 'pyrene/dist/pyrene.dev';
import examples from 'pyrene/dist/pyrene.examples';
import SideBarMenuSection from './SideBarMenuSection';

import './sideBarMenu.css';

function getExamples() {
  const otherSectionName = 'Other';
  const components = Object.values(Components)
    .filter(component => examples[component.name])
    .map(component => ({ category: examples[component.name].category === undefined ? otherSectionName : examples[component.name].category, name: component.displayName, linkToPath: `/${component.name}` }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const uniqueCategories = components
    .map(component => component.category)
    .filter((it, i, ar) => ar.indexOf(it) === i)
    .sort((a, b) => a.localeCompare(b));
  uniqueCategories.push(uniqueCategories.splice(uniqueCategories.indexOf(otherSectionName), 1)[0]);
  const categorySections = uniqueCategories
    .map(category => ({
      category: category,
      linkToPath: '#',
      elements: components
        .filter(component => component.category === category)
        .map(component => ({ name: component.name, linkToPath: component.linkToPath })),
    }));
  return categorySections;
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
          { category: 'Form', linkToPath: '/cookbook/form' },
          { category: 'Filter', linkToPath: '/cookbook/filter' },
          { category: 'Pyrene', linkToPath: '/cookbook/pyrene' },
        ]}
      />
    </div>
  </div>
);


SideBarMenu.displayName = 'SideBarMenu';

export default SideBarMenu;
