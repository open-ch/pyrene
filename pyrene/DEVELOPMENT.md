These are technical details how to start development on pyrene. For more general guidelines, please have a look at [CONTRIBUTING.md](../CONTRIBUTING.md) first.
## Development

For development on pyrene, we recommend to use it together with [kitchensink](../kitchensink), follow the steps there.

### TypeScript + Kitchensink integration
Pyrene is tightly integrated with kitchensink. PropTypes and default values are used to generate the documentation.

Kitchensink uses propTypes and TypeScript types to generate the documentation.

#### Functional TypeScript components
When using functional components in TypeScript, make sure to explicitly set the type of the props. Make also sure you tag a `displayName` to the component for that component to be listed in the Kitchensink :

```
export interface MyComponentProps {
   name: string
}
const MyComponent: React.FC<MyComponentProps>({name = 'John'}: MyComponentProps) => {
   // component logic
}


MyComponent.displayName = 'MyComponent';

export default MyComponent;

```

See the LabelAndValue component for a minimal example.  

### Migrating Components to TypeScript
Migrating a component to TypeScript can be summarized as:
   - Rename the `.jsx` file to `.tsx`
   - Create the `MyComponentProp` interface and copy all properties and comments from PropTypes.
   - Add the props as a component generic type. For example:
      ```MyComponent = React.FC<MyComponentProps> = ({...}) => {}```
   - See section about "Functional TypeScript components" above.
   - Once the component is green, you can safely delete the PropTypes (but not before since the typer will complain if
   the Proptypes and the Props are not matching )

### Icon Font

Updating the icon font:
```
# yarn updateIconfont [css file] [woff file]
npm run updateIconfont -- ~/Downloads/pyrene-iconfont-19/style.css  ~/Downloads/pyrene-iconfont-19/fonts/pyrene-iconfont-19.woff
```
