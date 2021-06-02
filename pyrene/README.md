# pyrene - Open Systems Component Library

[![pyrene](https://raw.githubusercontent.com/open-ch/pyrene/main/kitchensink/src/images/pyrene.svg)](https://open-ch.github.io/pyrene/)

## Usage

### Install Dependency
```sh
# npm
npm install --save @osag/pyrene

# yarn
yarn @osag/pyrene
```
### Import Styles

Pyrene comes with its own styles. If you're using something like [style-loader](https://webpack.js.org/loaders/style-loader/) or [css-loader](https://webpack.js.org/loaders/css-loader/), make sure to import them:

```js
import '@osag/pyrene/dist/pyrene.css';
```

### Components

A [Button](https://open-ch.github.io/pyrene/Interaction/Button), for example, is used as this:

```js
import { Button } from '@osag/pyrene';
```

## Contributing

See, [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines, and [DEVELOPMENT.md](DEVELOPMENT.md) for technical details.
