# FAQ

----
----
## What is Pyrene ?
Pyrene is a monorepo made of different subprojects.

The subprojects are:
1. `Pyrene` React UI components.
2. `Pyrene-graphs` React UI components.
3. `Tuktuktwo` React UI components (svg) used by `Pyrene-graphs`.

The items `1.`, `2.`, `3`. are separated npm modules.

## Where is Pyrene hosted ?
`Pyrene` subproject on [npmjs](https://www.npmjs.com/package/@osag/pyrene).

`Pyrene-graphs` subproject on [npmjs](https://www.npmjs.com/package/@osag/pyrene-grpahs).

`Tuktuktwo` subproject on [npmjs](https://www.npmjs.com/package/@osag/tuktuktwo).

## Requirements for using Pyrene ?
1. The requirements for using the `Pyrene`, `Pyrene-graphs` and `Tuktuktwo` subprojects are set as a `peerDepenencies` in their own `package.json`, each.

2. nodejs 12 or higher with npm

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

Otherwise, each subproject handles its dependencies on its own. See this [here](#pyrene-further-improvements), why the current architecture might need some improvements.

## How is the Pyrene TypeScript transpiled ?
The Pyrene TypeScript source code is compiled down to JavaScript with Babel. We do not use `tsc` (TypeScript compiler).

The process of transpilation is hand over to webpack. In the webpack configuration, you can see that the webpack loader `babel-loader` is responsible for that process.

## <a name="why-does-pyrene-compile-ts-with-babel"></a>Why does Pyrene compile TypeScript with Babel ?
The reason why we compile the TypeScript code through Babel, is that we need to access the parser during the compilation process for converting the typing of props' component done in TypeScript into a `PropTypes` object in JavaScript. See [here](#proptypes-generation), why we do so.


## Why do we need TypeScript as dev dependency ?
This is a fair question given that Pyrene compiles TypeScript down to JavaScript with Babel and not with `tsc` (TypeScript compiler). Babel does only compile and does not do any any type-checking. You have thereby the answer to your question.

## <a name="hacks-in-pyrene"></a>Hacks in Pyrene

1. As mentioned [here](#why-does-pyrene-compile-ts-with-babel), TypeScript is compiled by Babel. The problem is that the [Babel plugin](#proptypes-generation) we are using, does not support TypeScript syntax properly, for example, we cannot do **type extension** like this:

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

2. The proper way of using TypeScript **generics** in React is the following:

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

## Storybook
The migration to Storybook is still ongoing. The reasons for migrating from `Kitchensink` to Storybook were the following:

1. In the `Pyrene`, `Pyrene-grpahs` and `Tuktuktwo` subprojects, the components cannot be properly written in TypeScript, see [Hacks](#hacks-in-pyrene).
2. Storybook does a better job.
3. `PropTypes` is originally intended for run time type-checking. See [here](#pyrene-further-improvements) why `PropTypes` is currently misused.

Make sure to run `npm install` in the subpackages (tuktuktwo and pyrene-graphs).
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

A new commit on master automatically triggers a Storybook deployment, see [here](#cd-for-storybook).

## <a name="cd-for-storybook"></a>CD for Storybook
CD for `Storybook` means build and deploy of `Storybook`.

This is managed by GitHub Actions, by the following file:
```
.github/workflows/storybooks.yml
```
That action is automatically triggered upon a Pyrene master commit. It is also possible to manually trigger it on the GitHub website, under Actions > Workflows > select `Storybooks`. Click on the `Run workflow` button.

----
----

## Pyrene development

If you create a new component in the `Pyrene`, `Pyrene-graphs` or `Tuktuktwo` subproject, you need to import it in the index file.

If you add a third party library, you need to load the CSS of that library, with the `css-loader` in the webpack configuration.

----
----

## <a name="pyrene-further-improvements"></a>Pyrene further improvements

1) Remove the [hacks](#hacks-in-pyrene) done for `Kitchensink` to work properly.
2) Design a better architecture, sharing common npm dependencies across all subprojects with [Lerna](https://github.com/lerna/lerna). Right now, same npm dependencies are all over the place.
3) Add [snapshot testing](https://jestjs.io/docs/snapshot-testing) for mitigating regression.
4) All components could have a `className` props for overriding style.
5) Pyrene bundle should be split up by component. Indeed, the users of Pyrene will have the entire Pyrene source in their app's bundle even if they are using just a few of the available Pyrene components.
6) Do not change a component's internal state from the parent by using React `ref`, example [here](https://github.com/open-ch/pyrene/blob/main/pyrene/src/components/DateTimePicker/ReactDatePickerWrapper/ReactDatePickerWrapper.tsx#L128).

----
----

Document created on the 22th December 2021 
