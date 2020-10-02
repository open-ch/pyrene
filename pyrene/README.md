# pyrene
Open Systems Component Library

## Development

For development on pyrene, we recommend to use it together with [kitchensink](../kitchensink), follow the steps there.

## Typescript + Kitchensink integration 
Pyrene is tightly integrated with kitchensink. PropTypes and default values are used to generate the documentation. 

### PropTypes declaration
Kitchensink uses propTypes to generate the documentation. So the propTypes must be declared 
and props should be docommented there. 

### Functional typescript components
Because of react-docs, when integrating with typescript, we can't use functional components in a typesafe way (putting default props as default arguments of the function) as is standard practice. 

The solution is to: 
1. Define default props in a custom type: 
   ```
   type StrictLabelAndValueProps = {[key in keyof LabelAndValueProps]-?: NonNullable<LabelAndValueProps[key]>};
   ```
2. Create the default props object
   ```
   const defaultProps: StrictLabelAndValueProps = {
     label: '',
     size: 'small',
     value: '',
     type: 'neutral',
   };
   ```
3. Use the default props in the functional component
   ```
   const {label, size, value, type} = { ...props, ...defaultProps };
   ```
4. Declare the default props as a static attribute of the component (for react-docs): 
   ```
   LabelAndValue.defaultProps = defaultProps
   ```
5. Disable prop usage check for the whole file, since the linter doesn't understand the prop-spread of step 3. 
   ```
   /* eslint-disable react/no-unused-prop-types */
   ```

See the LabelAndValue component for more details. 

## Release



## Icon Font

Updating the icon font:
```
# yarn updateIconfont [css file] [woff file]
npm run updateIconfont -- ~/Downloads/pyrene-iconfont-19/style.css  ~/Downloads/pyrene-iconfont-19/fonts/pyrene-iconfont-19.woff
```
