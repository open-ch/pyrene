# FAQ

----
----
## What is Pyrene ?
Pyrene is a monorepo made of different subprojects.

The subprojects are:
1. `Pyrene` React UI components.
2. `Pyrene-graphs` React UI components.
3. `Tuktuktwo` React UI components (svg) used by `Pyrene-graphs`.
4. `Kitchensink` web application which demonstrates the components of the `Pyrene` and `Pyrene-graphs` subprojects.

The items `1.`, `2.`, `3`. are separated npm modules.

The item `4.`, is not a library but an application. Thus, this subproject is not meant to be reused.

## Where is Pyrene hosted ?
Pyrene subproject on [npmjs](https://www.npmjs.com/package/@osag/pyrene).

Pyrene-graphs subproject on [npmjs](https://www.npmjs.com/package/@osag/pyrene-grpahs).

Tuktuktwo subproject on [npmjs](https://www.npmjs.com/package/@osag/tuktuktwo).

Kitchensink subproject on [GitHub Paages](https://open-ch.github.io/pyrene/).

## Requirements for using Pyrene ?
The requirements for using the `Pyrene`, `Pyrene-graphs` and `Tuktuktwo` subprojects are set as a `peerDepenencies` in their own `package.json`, each.

## How to use Pyrene ?

### Pyrene subproject
1. `npm install @osag/pyrene`.
2. Import `Pyrene` subproject's style at the entry point of your application:

```
import '@osag/pyrene/dist/pyrene.css';
```

### Pyrene-graphs subproject

1. `npm install @osag/pyrene-graphs`.
2. Import `Pyrene-graphs` subproject's style at the entry point of your application:

```
import '@osag/pyrene-graphs/dist/pyrene-graphs.css';
```

### Tuktuktwo subproject
1. `npm install @osag/tuktuktwo`.

## Architecture
The npm dependencies at the root of the monorepo are for Storybook only. Indeed, the npm dependencies related to Storybook are shared among the various subprojects.

Otherwise, each subproject handles its dependencies on its own. See this [remark](#better-achitecture) about the current architecture.

## How is the Pyrene TypeScript transpiled ?
The Pyrene TypeScript source code is compiled down to JavaScript with Babel. We do not use `tsc` (TypeScript compiler).

The process of transpilation is hand over to webpack. In the webpack configuration, you can see that the webpack loader `babel-loader` is responsible for that process.

## <a name="why-does-pyrene-compile-ts-with-babel"></a>Why does Pyrene compile TypeScript with Babel ?
The reason why we compile the TypeScript code through Babel, is that we need to access the parser during the compilation process for converting the typing of props' component done in TypeScript into a `PropTypes` object in JavaScript. See [here](#proptypes-generation), why we do so.


## Why do we need TypeScript as dev dependency ?
This is a fair question given that Pyrene compiles TypeScript down to JavaScript with Babel and not with `tsc` (TypeScript compiler). Babel does only compile and does not do any any type-checking. You have thereby the answer to your question.

## <a name="hacks-in-pyrene"></a>Hacks in Pyrene

1. As mentioned [here](#why-does-pyrene-compile-ts-with-babel), TypeScript is compiled by Babel. The problem is that the [Babel plugin](#proptypes-generation) we are using, does not support TypeScript syntax properly, for example, we cannot do type extension like this:

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

2. The proper way of using TypeScript generics in React is the following:

```
const Card: React.FC<CardProps> = ({
  title,
  content,
}) => (
  <div>...</div>
);
```

However, in order to have the [Babel plugin](#proptypes-generation) properly working, we cannot use TypeScript generics the proper way - see the type duplication -:

```
const Card: React.FC<CardProps> = ({
  title,
  content,
}: CardProps) => (
  <div>...</div>
);
```

## Input components
Some components in the `Pyrene` subproject are not standalone components (`Textfield`, `Checkbox`, etc.).

These input components can by used only when the parent is passing a `state` and a `state setter` as props to them.

For demonstrating those components, you have to provide a `StateProvider`. `Kitchensink` does support this `StateProvider` feature.

----
----

## What is the Kitchensink ?
`Kitchensink` is a React application.

`Kitchensink`'s goal is to demonstrate how do the components work and how to use them. On that purpose, `Kitchensink` uses `Pyrene` and `Pyrene-graphs` subprojects as npm dependencies. See on that regard the `kitchensink/package.json`.


## How does Kitchensink work ?

Firstly, Kichensink extracts all Pyrene comoponents out of the Pyrene bundle.

Secondly, `Kitchensink` analyses the `PropTypes` object of each Pyrene component. Based on that object, `Kitchensink` generates the documentation for each component, means the `props`, the `type` of these props, if those are `required` or not, etc. <a name="proptypes-generation"></a> This `PropTypes` object is generated by a Babel plugin, called `babel-plugin-typescript-to-proptypes`. Indeed, the bundle that Kichensink takes as an input does not contain any typing any more.

The instance of the component embeded in Kitchensink is controlled by `example` file of each component.

## Storybook
The migration to Storybook is still ongoing. The reasons for migrating from `Kitchensink` to Storybook were the following:

1. In the `Pyrene`, `Pyrene-grpahs` and `Tuktuktwo` subprojects, the components cannot be properly written in TypeScript, see [Hacks](#hacks-in-pyrene).
2. Storybook does a better job.
3. `PropTypes` is originally intended for run time type-checking. It is [misued](#proptypes-misused) in the current setup.


For running Storybook. At the root of the monorepo:
```
> npm install
> npm run storybook
```
Browse http://localhost:6006


----
----

## CI for all subprojects
CI is managed by GitHub Actions, by the following files:

```
.github/workflows/lint.yml
.github/workflows/test.yml
```

Those two actions are automatically triggered upon a commit or a PR merge on all subprojects.

## Release
Since `Pyrene`, `Pyrene-graphs` and `Tuktuktwo` subprojects are separated npm modules, releases are done separately per project.

Go into the subproject you'd like to release:

```
> npm run release
```

A new release automatically trigers a Kitchensink CD, see [here](#cd-for-kitchensink).

## <a name="cd-for-kitchensink"></a>CD for Kitchensink
CD for `Kitchensink` means build and deploy of `Kitchensink`.

This is managed by GitHub Actions, by the following file:
```
.github/workflows/kitchensink.yml
```
That action is automatically triggered upon a Pyrene release. It is also possible to manually trigger it in GitHub website, under Actions, Workflows, select `Kitchensink`. Click on the `Run workflow` button. You can as well do it by running the following commands:

```
> git push github main
> git push github --tags
```

----
----

## Pyrene development
Please, refer to the [guideline](https://github.com/open-ch/pyrene/blob/main/kitchensink/DEVELOPMENT.md) for setting up a development environment with Pyrene.

If you create a new component in the `Pyrene`, `Pyrene-graphs` or `Tuktuktwo` subproject, you need to import it in the index fie.

If you add a third party library, you need to load the CSS of that library, with the `css-loader` in the webpack configuration.

----
----

## Pyrene further improvements

1) Replace `Kitchensink` by Storybook (ongoing).
2) Remove the [hacks](#hacks-in-pyrene) done for `Kitchensink` to work properly.
3) <a name="proptypes-misused"></a>[PropTypes generation](#proptypes-generation) for each component is not pertinent in a production environment. This `PropTypes` are generated for documentation purpose only in `Kitchensink`. The original purpose of `PropTypes`, which is run time type-checking, is misused, since the type-checking is covered already by TypeScript.
4) Do the compilation with `tsc` (TypeScript compiler) and not Babel.
5) <a name="better-achitecture"></a>Design a better architecture, sharing common npm dependencies across all subprojects with [Lerna](https://github.com/lerna/lerna). Right now, same npm dependencies are all over the place.
6) Add [snapshot testing](https://jestjs.io/docs/snapshot-testing) for mitigating regression.
7) All components could have a `className` props for overriding style.
8) Pyrene bundle should be split up by component. Indeed, the users of Pyrene will have the entire Pyrene source in their app's bundle even if they are using just a few of the available Pyrene components.
9) Do not change a component's internal state from the parent by using React `ref`.

----
----

Document created on the 22th December 2021 
