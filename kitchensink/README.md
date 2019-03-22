# Kitchen Sink
Mission Control Portal Kitchen Sink

## development
to work with your local copy of pyrene, make sure it is linked
if not done already, make pyrene available (from your pyrene folder)
```bash
yarn link
```
then link it in the kitchen sink
```bash
yarn link pyrene
```

and then run from kitchen folder
```bash
yarn watch
```

if you don't want to use your local copy or pyrene any longer, unlink it and do a fresh package install
```bash
yarn unlink pyrene
yarn install
```

## release
```bash
yarn release -n
```
