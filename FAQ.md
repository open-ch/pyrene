# FAQ

----
## What is Pyrene ?
Pyrene is a monorepo made of different subprojects.

These subprojects are :
1. `Pyrene` React UI components.
2. `Pyrene-graphs` React UI components.
3. `Tuktuktwo` React UI components (svg) used by `Pyrene-graphs`.
4. `Kitchensink` web application which demonstrates the components of the `Pyrene` subproject and `Pyrene-graphs` subproject.

The `Pyrene` subproject and the `Pyrene-graphs` subproject are separated npm module. The `Kitchensink` subproject is not meant to be reused.

## Where is Pyrene hosted ?
[Pyrene subproject](https://www.npmjs.com/package/@osag/pyrene).

[Pyrene-graphs subproject](https://www.npmjs.com/package/@osag/pyrene-graphs).

## Requirements for using Pyrene ?
The requirements for using the `Pyrene` subproject set as a `peerDepenencies` in the `Pyrene` subproject `package.json`.

The requirements for using the `Pyrene-graphs` subproject are set as a `peerDepenencies` in the `Pyrene-graphs` subproject `package.json`.


## How to use Pyrene ?

`Pyrene` and `Pyrene-graphs` are separated npm module.

1. `npm install @osag/pyrene`.
2. Import `Pyrene` subproject 's style at the entry point of your application :

```
import '@osag/pyrene/dist/pyrene.css';
```

1. `npm install -S @osag/pyrene-graphs`.
2. Import `Pyrene-graphs` subproject 's style at the entry point of your application :

```
import '@osag/pyrene-graphs/dist/pyrene-graphs.css';
```

## Shared npm dependencies in Pyrene
The npm dependencies at the root of the monorepo are for Storybook only. Indeed, the npm dependencies for having Storybook related dependencies are shared among the various subprojects.

In case a refactoring of the Pyrene architecture happens, it would be better to have a dedicated tool such as Lerna. Lerna can handle better npm denpencies across subprojects better than the way it is currently done.


## How is the Pyrene TypeScript transpiled ?
The `Pyrene` TypeScript source code is compiled down to JavaScript with Babel. We do not use `tsc` (TypeScript compiler).

The process of transpilation is hand over to webpack. In the webpack configuration, you can see that the webpack loader `babel-loader` is responsible for that process.

## <a name="why-does-pyrene-compile-ts-with-bazel"></a>Why does Pyrene compile TypeScript with Bazel ?
The reason why we compile the TypeScript code through Babel, is that we need to access the parser during the compilation process for converting the typing of props' component done in TypeScript into a PropTypes object in JavaScript. See [here](#proptypes-generation).


## Why do we need TypeScript as dev dependency ?
This is a fair question given that we compile TypeScript down to JavaScript with Babel and not with `tsc` (TypeScript compiler). Babel does only compile and does not do any type-checking. You have thereby the answer to your question.

## <a name="hacks-in-pyrene"></a>Hacks in Pyrene

1. As mentioned [here](#why-does-pyrene-compile-ts-with-bazel), TypeScript is handled by Babel. The problem is that the [Babel plugin](#proptypes-generation) we are using, does not support TypeScript syntax properly, for example, we cannot do type extension like this.

```

type MyButtonBase = {
  label: string,
  onClick: () => void,
}

type MyButtonProps = MyButtonBase & {
  lodading: boolean,
}

const MyButton: React.FC<MyButtonProps> = (props) => (
  <div>
    <button>...</button>
  </div>
);
```

2. The proper way of using React generics is the following:

```
const Card: React.FC<CardProps> = ({
  title,
  content,
}) => (
  <div>...</div>
);
```

However, in order to have the [Babel plugin](#proptypes-generation) properly working, we have to use generics in the following way (type duplication) :

```
const Card: React.FC<CardProps> = ({
  title,
  content,
}: CardProps) => (
  <div>...</div>
);
```

## Input components
Some components in the `Pyrene` subproject are not standalone compoents (`Textfield`, `Checkbox`, etc.).

These input components can by used only by a parent passing a `state` - a value - and a `state setter` - a `onChange` function - props to those one. In order to demonstrate those components either in the `Kitchensink` subproject (see any example file) or in Storybook, you have to provide a `StateProvider`.

## Storybook
The migration to Storybook is still ongoing. The reason for migrating from Kitchensink to Storybook was due to the lack of scale of Kitchensink.


For running Storybook. At the root of the monorepo:
```
npm run storybook
```
Browse http://localhost:6006

----
## What is the Kitchensink ?
`Kitchensink` is a React application hosted on [GitHub Pages](https://pages.github.com/), at the [url](https://open-ch.github.io/pyrene/).

`Kitchensink`'s goal is to demonstrate how do the components work and how to use them. On that purpose, `Kitchensink` uses Pyrene as npm dependency. See on that regard the `kitchensink/package.json`.


## How does Kitchensink work ?

Firstly, Kichensink extracts all Pyrene comoponents out of the `Pyrene` bundle.

Secondly, `Kitchensink` analyses the `PropTypes` object of each Pyrene component. Based on that object, `Kitchensink` generates the documentation for each component, means the `props`, the `type` of these props, if those are `required` or not, etc.

The instance of the component in the component's page is done through the `example` file of each component.

<a name="proptypes-generation"></a> This `PropTypes` object is generated by a Babel plugin, called `babel-plugin-typescript-to-proptypes`. Indeed, components written in TypeScript do not have any `PropTypes` object.

----

## CI / CD
CI is managed by GitHub Actions, by the following files:

```
.github/workflows/lint.yml
.github/workflows/test.yml
```
Those two actions are automatically triggered upon a commit or a PR merge.

CD for `Kitchensink` is managed by GitHub Actions, by the following file:
```
.github/workflows/kitchensink.yml
```
That action is automatically triggered upon a Pyrene release.

You can also manually trigger a `Kitchensink` deployment in GitHub website, under Actions, Workflows, select `Kitchensink`. Click on the `Run workflow` button. This manual trigger is possible thanks to the `workflow_dispatch` property in the GitHub Actions file.

____

## Pyrene development
Refer to the guideline for launching a development [environment](https://github.com/open-ch/pyrene/blob/main/kitchensink/DEVELOPMENT.md) with Pyrene. 

If you create a new component in the `Pyrene` subproject or in the `Pyrene-graphs` subproject, you need to import it in the index fie.

If you add a third party library, you need to load the CSS of that latter, with the `css-loader` in the webpack configuration.

----

## Pyrene possible improvements

1) Replace `Kitchensink` - which does not scale - by Storybook (ongoing).
2) Remove the [hacks](#hacks-in-pyrene) done for `Kitchensink` to work properly.
2) `Pyrene` bundle should be split up by file per component. Indeed, the users of `Pyrene` will have the entire `Pyrene` source in their app's bundle even if they are using just a few of the available `Pyrene` components.
3) [PropTypes generation](#proptypes-generation) for each component is not pertinent in a production environment. This `PropTypes` generation makes sense only for `Kitchensink`. `PropTypes` in each component, makes the code larger and **Static type checking** is enough for a library such `Pyrene`.
5) Do the compilation with `tsc` (TypeScript compiler) and not Babel.
6) Use Lerna for managing dependencies across subprojects.
7) Add [snapshot testing](https://jestjs.io/docs/snapshot-testing) for mitigating regression.
8) All components could have a `className` props for overriding style.
9) Do not change a component's internal state from parent by using React `ref`.

----

Document created on the 22th December 2021 
