# FAQ

----
## What is Pyrene ?
Pyrene is a monorepo made of different sub-projects.

## Where is Pyrene hosted ?
[npmjs.com](https://www.npmjs.com/package/@osag/pyrene).

## Requirement for using Pyrene ?
The requirement are set as a peerDepenency in the `package.json`. Among other, users of Pyrene have to have `react` and `react-dom` imported as npm dependencies.

## Npm dependencies in Pyrene ?
The npm dependencies at the root of the project are for Storybook only. Indeed, the npm dependencies for having Pyrene related dependencies shared among the various sub-projects.

In case a refactoring of the Pyrene architecture might happen, it would be better to have a dedicated tool such as Lerna. Lerna can handle better npm denpencies across sub-project better than the way it is currently done.


## How is the Pyrene TS transpiled ?
The Pyrene TypScript source code is compiled down to JS with Babel and not tsc (typescript compiler).

The process of transpilation is hand over to webpack. In the webpack configuration, you can see that the lodader is responsible for that process is

## Why does Pyrene use Babel ?
Th.


## Hacks in Pyrene
not supporting well TS

```
const Accordion: React.FC<AccordionProps> = ({
  sections,
}: AccordionProps)
```


----
## What is Kitchensink ?
Kitchensink is a React application hosted on [GitHub Pages](https://pages.github.com/). 

Kitchensink uses pyrene as npm dependency. See on that regard the `package.json` of kitchensink.


## How does Kitchensink work ?
Kitchensink analyses the `PropTypes` object of each Pyrene component. Base on that object, Kitchensink generates the documentation for each component, means the `props`, the `type` of these props, if those are required or not, etc.

The instance of the component in the component's page is done through the `example` file of each component.

This `PropType` object is generates thanks to a Babel plugin, called `babel-plugin-typescript-to-proptypes`. Indeed, components written in TyppeScript do not have any PropType object.

## Kitchensink CI / CD

## Issues of Kitchensink 
Kitchensink's goal is to document the UI component of Pyrene like Storybook does.

The issue of Kitchensink are multiple :
1) See hacks
2)
3) Generated propType make the code bigger



----

Document created on the 21th December 2021 