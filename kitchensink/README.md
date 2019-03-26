# Kitchen Sink

Design principles and demo project for [pyrene](../pyrene).

## Development

In order to ease development of pyrene, we recommend to use the kitchen sink together with your local version of pyrene.

Make pyrene available (from `pyrene` folder):
```bash
yarn link
```

Link it in the kitchen sink:
```bash
yarn link pyrene
```

If you don't want to use your local copy of pyrene any longer, unlink it and do a fresh package install:
```bash
yarn unlink pyrene
yarn install
```

## Release
```bash
yarn release -n
```
