module.exports = {

  "extends": "eslint-config-airbnb",

  "env": {
    "browser": "true",
    "es2017": "true",
    "jest": "true"
  },

  "globals": {
    "shallow": "true",
    "mount": "true",
  },

  "parser": "babel-eslint",

  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },

  "rules": {
    // Do not force destructuring.
    "react/destructuring-assignment": 0,
    "prefer-destructuring": 0,
    // require trailing commas for multiline (arrays, objects, imports, exports & functions), disallowed for same line
    "comma-dangle": [2, "always-multiline"],
    // require function expressions to have a name
    "func-names": 0,
    // this option sets a specific tab width for your code, VariableDeclarator indents are for nice alignment of multi-line var declaration
    "indent": [2, 2, { "SwitchCase": 1, "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
    // disallow trailing whitespace at the end of lines, except empty lines
    "no-trailing-spaces": 2,
    // No warnings about _ prefixed methods
    "no-underscore-dangle": [1, {"allowAfterThis": true}],
    // No warnings about max length
    "max-len": 0,
    // Warn for templates
    "prefer-template": 1,
    // Allow long version
    "object-shorthand": 0,
    "class-methods-use-this": 0,
    "no-pluspls": 0,
    // Require padding on the class level
    "padded-blocks": [1,{"classes": "always"}],
    // Disallow Assignment in return Statement, except if wrapped in parentheses
    "no-return-assign": [2, "except-parens"],
    // Prevent missing displayName in a React component definition
    "react/display-name": 1,
    // Enforce boolean attributes notation in JSX
    "react/jsx-boolean-value": [2, "never"],
    // Enforce or disallow spaces inside of curly braces in JSX attributes
    "react/jsx-curly-spacing": [2, "never"],
    // Do not remove curly braces from children.
    "react/jsx-curly-brace-presence": [2, { props: "never", children: "ignore" }],
    // Prevent duplicate props in JSX
    "react/jsx-no-duplicate-props": 2,
    // Prevent React to be incorrectly marked as unused - covered by no-unused-vars
    "react/jsx-uses-react": 2,
    // Prevent usage of dangerous JSX properties
    "react/no-danger": 2,
    // Prevent multiple component definition per file
    "react/no-multi-comp": [2, { "ignoreStateless": true }],
    // Allow props on the same line
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-max-props-per-line": 0,
    // require to sort props alphabetically in the prop-type declaration
    "react/sort-prop-types": 2,
    // short hand props must be listed after all other props (Component, not prop declaration)
    "react/jsx-sort-props": [2, {"shorthandLast": true, "noSortAlphabetically": true}],
    // do not allow deprecated lifecycle methods according to the react version provided above
    "react/no-deprecated": 2,
    // checks for errors in hooks usage
    "react-hooks/rules-of-hooks": "error",
    // We only have a11ly as it's a required dependency
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/role-has-required-aria-props": 0,
    "jsx-a11y/anchor-is-valid": 0,
    // Our imports work differently in MC
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    // warn on disabled tests
    "jest/no-disabled-tests": "warn",
    // do not allow .only in tests
    "jest/no-focused-tests": "error",
    // do not allow tests with the same name
    "jest/no-identical-title": "error",
    // expect(files).toHaveLength(1); instead of expect(files.length).toBe(1);
    "jest/prefer-to-have-length": "warn",
    // Ensure expect() is called with a single argument
    "jest/valid-expect": "error"
  },

  "overrides": [{
    "files": ["*.spec.jsx"],
    "rules": {
      "react/jsx-props-no-spreading": "off"
    }
  }],

  "plugins": [
    "jest",
    "react",
    "react-hooks"
  ]

};
