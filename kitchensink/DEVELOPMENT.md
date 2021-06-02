These are technical details how to start development on kitchensink. For more general guidelines, please have a look at [CONTRIBUTING.md](../CONTRIBUTING.md) first.
## Development

In order to ease development of pyrene, we recommend to use the kitchensink together with your local version of pyrene.

Make pyrene available and keep watching it (in your pyrene folder):
```bash
npm run expose
```

Link it in kitchensink and fire up the development server (in your kitchensink folder):
```bash
npm install
npm link @osag/pyrene
npm run watch
```

If you want to use pyrene-graphs instead you can also expose with tuktuktwo:
```bash
cd tuktutktwo && npm run expose
cd pyrene-graphs && npm run expose-tuktuktwo
```

If you don't want to use your local copy of pyrene any longer, just do a fresh package install:
```bash
npm install
```

## Update Pyrene

- `npm install -E @osag/pyrene@1.8.1`

## Release

All changes to kitchensink are automatically deployed to Github pages on <http://open-ch.github.io/pyrene/>.

- Push `main` branch
- Wait for [Github action](https://github.com/open-ch/pyrene/actions/workflows/kitchensink.yml) to build it
