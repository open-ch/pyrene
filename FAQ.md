# FAQ

----
## What is Pyrene ?

## Where is Pyrene hosted ?
npm.org.

## How are dependencies shared in Pyrene ?
The npm dependencies at the root of the project are for Storybook only.

## How is the Pyrene TS transpiled ?
The Pyrene TypScript source code is compiled down to JS with Babel and not tsc (typescript compiler).

The process of transpilation is hand over to webpack. In the webpack configuration, you can see that the lodader is called

## Why does Pyrene use Babel ?
Th.


----
## What is Kitchensink ?
Kitchensink is a React application hosted on [GitHub Pages](https://pages.github.com/). 

Kitchensink use pyrene as npm dependency. See on that regard the `package.json` of kitchensink.


## How does Kitchensink work ?
Kitchensink analyses the `PropTypes` object of each Pyrene component. Base on that object, Kitchensink generates the documentation for each component, means the `props`, the `type` of these props, etc.

The instance of component in the component's page is done through the example file of each component.

This `PropType` object is generates thanks to a Babel plugin. Indeed, component written in TyppeScript do not have any PropType object.

## Kitchensink CI / CD



## Issues of Kitchensink 
Kitchensink's goal is to document the UI component of Pyrene like Storybook does.

The issue of Kitchensink are multiple :
1) 