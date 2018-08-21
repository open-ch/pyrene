module.exports = {

  "extends": "eslint-config-airbnb",

  "env": {
    "browser": "true",
    "es6": "true"
  },

  "parserOptions": {
    "ecmaFeatures": {
      // Disallow for-of loops for IE11
      "forOf": false
    }
  },

  "parser": "babel-eslint",

  "settings": {
    "react": {
      "pragma": "React",
      "version": "16.4"
    }
  },

  "rules": {
    // require trailing commas for multiline (arrays, objects, imports, exports & functions), disallowed for same line
    "comma-dangle": [2, "always-multiline"],
    // require function expressions to have a name
    "func-names": 0,
    // this option sets a specific tab width for your code, VariableDeclarator indents are for nice alignment of multi-line var declaration
    "indent": [2, 2, { "SwitchCase": 1, "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
    // disallow trailing whitespace at the end of lines, except empty lines
    "no-trailing-spaces": [2, { "skipBlankLines": true }],
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
    // Prevent duplicate props in JSX
    "react/jsx-no-duplicate-props": 2,
    // Prevent React to be incorrectly marked as unused - covered by no-unused-vars
    "react/jsx-uses-react": 2,
    // Prevent usage of dangerous JSX properties
    "react/no-danger": 2,
    // Prevent multiple component definition per file
    "react/no-multi-comp": [2, { "ignoreStateless": false }],
    // Allow props on the same line
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-max-props-per-line": 0,
    // require to sort props alphabetically in the prop-type declaration
    "react/sort-prop-types": 2,
    // short hand props must be listed after all other props (Component, not prop declaration)
    "react/jsx-sort-props": [2, {"shorthandLast": true, "noSortAlphabetically": true}],
    // do not allow deprecated lifecycle methods according to the react version provided above
    "react/no-deprecated": 2,
    // We only have a11ly as it's a required dependency
    "jsx-a11y/no-static-element-interactions": 0,
    // Our imports work differently in MC
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0
  }

};
