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

## Release



## Icon Font

Updating the icon font:
```
# yarn updateIconfont [css file] [woff file]
npm run updateIconfont -- ~/Downloads/pyrene-iconfont-19/style.css  ~/Downloads/pyrene-iconfont-19/fonts/pyrene-iconfont-19.woff
```
