# Kitchensink

Design principles and demo project for [pyrene](../pyrene).

## Development

In order to ease development of pyrene, we recommend to use the kitchensink together with your local version of pyrene.

Make pyrene available and keep watching it (in your pyrene folder):
```bash
npm install
npm link
npm run watch
```

Link it in kitchensink and fire up the development server (in your kitchensink folder):
```bash
npm install
npm link pyrene
npm run watch
```

If you don't want to use your local copy of pyrene any longer, unlink it and do a fresh package install:
```bash
npm unlink pyrene
npm install
```

## Update Pyrene

- `npm update pyrene@1.8.1`

## Release

- Push `master` branch
- Wait for bamboo to build it
