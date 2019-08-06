# Kitchensink

Design principles and demo project for [pyrene](../pyrene).

## Development

In order to ease development of pyrene, we recommend to use the kitchensink together with your local version of pyrene.

Make pyrene available and keep watching it (in your pyrene folder):
```bash
yarn install
yarn link
yarn watch
```

Link it in kitchensink and fire up the development server (in your kitchensink folder):
```bash
yarn install
yarn link pyrene
yarn watch
```

If you don't want to use your local copy of pyrene any longer, unlink it and do a fresh package install:
```bash
yarn unlink pyrene
yarn install
```

## Release

- Push `master` branch
- Wait for bamboo to build it
- Deploy on bamboo
