# pyrene
Open Systems Component Library

## Development

For development on pyrene, we recommend to use it together with [kitchensink](../kitchensink), follow the steps there.

## Typescript + Kitchensink integration 
Pyrene is tightly integrated with kitchensink. PropTypes and default values are used to generate the documentation. 

Kitchensink uses propTypes and typescript types to generate the documentation. 

### Functional typescript components
When using functional components in typescript, make sure to explicitely set the type of the props: 
```
interface MyComponentProps {
   name: string
}
const MyComponent: React.FC<MyComponentProps>({name = "John}: MyComponentProps)
```

See the LabelAndValue component for a minimal example.  

## Migrating Components to Typescript
If you wish to migrate a component to TypeScript, there are 2 ways: 
1. Manually: 
   - Create the `MyCompoentProp` interface
   - Add the props as a component generic type. For example: 
      ```MyComponent = React.FC<MyComponentProps> = ({...}) => {}```
   - See section about "Functional typescript components" above. 
2. Using `ts-migrate`
   `ts-migrate` is an airbnb utility to migrate an entire repo to typescript, in one call. It actually works with pyrene, however the linter is NOT happy, at all. Fixing the linting errors is not trivial so the method #1 could actually be faster. 
   If you still wish to use this as a starting point, do: 
   ```
   npm run ts-migrate -- rename .
   npm run ts-migrate -- migrate .
   npm run ts-migrate -- reignore .
   ```
   Then, fix the component in its directory so that the whole component directory is valid. Note that proptypes comments are dropped, so you need to re-add them (from the .jsx file which is left in you diff somewhere). Then remove the in-progress files for all components
   you haven't touched. 
   ```
   git add src/components/MyComponent
   git checkout -- . # reset all other components you haven't touch
   git clean -f # Remove all untracked files
   ```
   Make sure you don't have any `@ts-expect-error ts-migrate` anymore in your code before committing it 

## Release



## Icon Font

Updating the icon font:
```
# yarn updateIconfont [css file] [woff file]
npm run updateIconfont -- ~/Downloads/pyrene-iconfont-19/style.css  ~/Downloads/pyrene-iconfont-19/fonts/pyrene-iconfont-19.woff
```
