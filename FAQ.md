# FAQ

----
## What is Pyrene ?
Pyrene is a monorepo made of different sub-projects.

These sub-projects are :
1. `Pyrene` React UI components.
2. `Pyrene-graphs` React UI components.
3. `Tuktuktwo` React UI components (svg) used by Pyrene-graphs.
4. `Kitchensink` web site which documents the components of `1.` and `2.` right above.
## Where is Pyrene hosted ?
[npmjs.com](https://www.npmjs.com/package/@osag/pyrene).

## Requirements for using Pyrene ?
The requirements are set as a `peerDepenencies` in the `package.json`. Users of Pyrene have to have `react` and `react-dom` imported as npm dependencies.

## How to use Pyrene ?
1. Install the library by using npm or yarn.
2. Import Pyrene's style at the entry point of your application :

```
import '@osag/pyrene/dist/pyrene.css';
import '@osag/pyrene-graphs/dist/pyrene-graphs.css';
```

## Shared npm dependencies in Pyrene
The npm dependencies at the root of the project are for Storybook only. Indeed, the npm dependencies for having Pyrene related dependencies shared among the various sub-projects.

In case a refactoring of the Pyrene architecture might happen, it would be better to have a dedicated tool such as Lerna. Lerna can handle better npm denpencies across sub-project better than the way it is currently done.


## How is the Pyrene TS transpiled ?
The Pyrene TypeScript source code is compiled down to JS with Babel and not tsc (typescript compiler).

The process of transpilation is hand over to webpack. In the webpack configuration, you can see that the webpack lodader `babel-loader` is responsible for that process.

## Why does Pyrene compile TS with Babel ?
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
`Kitchensink` is a React application hosted on [GitHub Pages](https://pages.github.com/), at the [url](https://open-ch.github.io/pyrene/).

`Kitchensink` uses Pyrene as npm dependency. See on that regard the `package.json` of `kitchensink`.


## How does Kitchensink work ?
`Kitchensink` analyses the `PropTypes` object of each Pyrene component. Base on that object, `Kitchensink` generates the documentation for each component, means the `props`, the `type` of these props, if those are `required` or not, etc.

The instance of the component in the component's page is done through the `example` file of each component.

This `PropTypes` object is generates by a Babel plugin, called `babel-plugin-typescript-to-proptypes`. Indeed, components written in TypeScript do not have any `PropTypes` object.

----

## CI / CD
Upon a commit or merge, CI is triggered by GitHub Actions, by the following files:

```
.github/workflows/lint.yml
.github/workflows/test.yml
```

CD for `Kitchensink` is managed by GitHub Actions, by the following file:
```
.github/workflows/kitchensink.yml
```
That action is triggered on a Kitchensink release.

## Pyrene possible improvements

1) Replace Kitchensink by Storybook
2) Remove hacks done for Kitchensink
2) Pyrene bundle should be split up by file per component
3) Generated propType make the code bigger
4) Use Lerna for managing dependencies across sub-projects

----

Document created on the 21th December 2021 
