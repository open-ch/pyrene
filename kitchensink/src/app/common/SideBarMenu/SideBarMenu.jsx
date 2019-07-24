import React from 'react';
import Components from 'pyrene/dist/pyrene.dev';
import examples from 'pyrene/dist/pyrene.examples';
import ChartComponents from 'pyrene-graphs/dist/pyrene-graphs.dev';
import chartExamples from 'pyrene-graphs/dist/pyrene-graphs.examples';
import SideBarMenuSection from './SideBarMenuSection';

import './sideBarMenu.css';

function getExamples() {
  const otherSectionName = 'Other';
  const exampleComponents = { ...examples, ...chartExamples };
  const components = [...Object.values(Components), ...Object.values(ChartComponents)]
    .filter(component => exampleComponents[component.name])
    .map(component => ({ category: component.category === undefined ? otherSectionName : component.category, name: component.displayName, linkToPath: `/${component.name}` }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const uniqueCategories = components
    .map(component => component.category)
    .filter((it, i, ar) => ar.indexOf(it) === i)
    .sort((a, b) => a.localeCompare(b));
  uniqueCategories.push(uniqueCategories.splice(uniqueCategories.indexOf(otherSectionName), 1)[0]);
  const categorySections = uniqueCategories
    .map(category => ({
      name: category,
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
          { name: 'Colors', linkToPath: '/colors' },
          { name: 'Icons', linkToPath: '/icons' }]}
      />
      <SideBarMenuSection
        title="Components"
        sectionElements={getExamples()}
      />
      <SideBarMenuSection
        title="Cookbooks"
        sectionElements={[
          { name: 'Form', linkToPath: '/cookbook/form' },
          { name: 'Filter', linkToPath: '/cookbook/filter' },
          { name: 'Pyrene', linkToPath: '/cookbook/pyrene' },
        ]}
      />
    </div>
  </div>
);


SideBarMenu.displayName = 'SideBarMenu';

export default SideBarMenu;
