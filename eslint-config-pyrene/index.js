module.exports = {

  "extends": "eslint-config-airbnb",

  "env": {
    "browser": "true",
    "es6": "true"
  },

  "ecmaFeatures": {
    // Disallow for-of loops for IE11
    "forOf": false
  },

  "rules": {
    // disallow trailing commas in object literals
    "comma-dangle": [2, "never"],
    // require function expressions to have a name
    "func-names": 0,
    // this option sets a specific tab width for your code, VariableDeclarator indents are for nice alignment of multi-line var declaration
    "indent": [2, 2, { "SwitchCase": 1, "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
    // disallow trailing whitespace at the end of lines, except empty lines
    "no-trailing-spaces": [2, { "skipBlankLines": true }],

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
    "react/no-multi-comp": [2, "ignoreStateless"]
  }

};
