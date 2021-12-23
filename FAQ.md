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
The requirements are set as a `peerDepenencies` in the `pyrene/package.json`.

Users of Pyrene have to have `react` and `react-dom` imported as npm dependencies.

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
The Pyrene TypeScript source code is compiled down to JS with Babel.

The process of transpilation is hand over to webpack. In the webpack configuration, you can see that the webpack loader `babel-loader` is responsible for that process.

## <a name="why-does-pyrene-compile-ts-with-bazel"></a> Why does Pyrene compile TS with Bazel ?
TypeScript code base is compiled to JS with Babel and not tsc (typescript compiler).

The reason for that is that we need to access the parser during the compilation process for converting type of component in TypeScript to PropType of component in JavaScript. See [here](#proptypes-generation).


## Hacks in Pyrene

1. As mentioned [here](#why-does-pyrene-compile-ts-with-bazel), TypeScript is handled by Babel. The problem is that the Babel plugin we are using, does not support TypeScript syntax properly, for example, we cannot do type extension like this.

```

type MyButtonBaseProps = MyButtonBase & {
  label: string,
}

type MyButtonProps = MyButtonBase & {
  onClick: () => void,
}

const MyButton: React.FC<MyButtonProps> = ...
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

However, in order to have the Babel plugin properly working, we have to use generics in the following way (type duplication) :

```
const Card: React.FC<CardProps> = ({
  title,
  content,
}: CardProps) => (
  <div>...</div>
);
```


----
## What is Kitchensink ?
`Kitchensink` is a React application hosted on [GitHub Pages](https://pages.github.com/), at the [url](https://open-ch.github.io/pyrene/).

`Kitchensink`'s goal is to demonstrate how do the components work and how to use them. On that purpose, `Kitchensink` uses Pyrene as npm dependency. See on that regard the `kitchensink/package.json`.


## How does Kitchensink work ?

Firstly, Kichensink extracts all Pyrene comoponents out of the Pyrene bundle.

Secondly, `Kitchensink` analyses the `PropTypes` object of each Pyrene component. Based on that object, `Kitchensink` generates the documentation for each component, means the `props`, the `type` of these props, if those are `required` or not, etc.

The instance of the component in the component's page is done through the `example` file of each component.

<a name="proptypes-generation"></a> This `PropTypes` object is generates by a Babel plugin, called `babel-plugin-typescript-to-proptypes`. Indeed, components written in TypeScript do not have any `PropTypes` object.

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

----

## Pyrene possible improvements

1) Replace Kitchensink by Storybook.
2) Remove hacks done for Kitchensink to work properly.
2) Pyrene bundle should be split up by file per component. Indeed, the users of Pyrene will have the entire Pyrene source in their app's bundle even if they use just some of the available Pyrene components.
3) PropType generation for each component is not pertinent. That makes the code bigger just for Kitchensink purpose.
4) Use Lerna for managing dependencies across sub-projects.
5) All components could have a `className` props for overriding style.

----

Document created on the 22th December 2021 
