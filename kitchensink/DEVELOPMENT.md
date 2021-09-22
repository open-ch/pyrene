These are technical details how to start development on kitchensink. For more general guidelines, please have a look at [CONTRIBUTING.md](../CONTRIBUTING.md) first.
## Development

In order to ease development of pyrene, we recommend to use the kitchensink together with your local version of pyrene.

Start kitchensink with pyrene in development mode (run in your `kitchensink` folder):
```bash
npm run develop:pyrene
```

If you are working on `pyrene-graphs`, `tuktuktwo` or `eslint-config`, best fire up everything (again, run in your `kitchensink` folder):
```bash
npm run develop:all
```

## Update Pyrene

- `npm install -E @osag/pyrene@1.8.1`

## Release

All changes to kitchensink are automatically deployed to Github pages on <http://open-ch.github.io/pyrene/>.

- Push `main` branch
- Wait for [Github action](https://github.com/open-ch/pyrene/actions/workflows/kitchensink.yml) to build it
