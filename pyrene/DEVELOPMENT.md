These are technical details how to start development on pyrene. For more general guidelines, please have a look at [CONTRIBUTING.md](../CONTRIBUTING.md) first.
## Development

For development on pyrene, we recommend to use it together with storybooks, follow the steps in the [FAQ file](../FAQ.md).

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
