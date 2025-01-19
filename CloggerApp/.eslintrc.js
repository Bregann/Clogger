// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo'],
  ignorePatterns: ['/dist/*'],
  rules: {
    // Enforce no semicolons
    semi: ['error', 'never'],
    // Enforce spacing inside brackets (e.g., if ( condition ))
    'space-in-parens': ['error', 'never'],
    // Require space before function parentheses
    'space-before-function-paren': ['error', 'always'],
    // Enforce space after keywords like if, for, while, etc.
    'keyword-spacing': ['error', { before: true, after: true }],
    // Enforce spacing around curly braces
    'object-curly-spacing': ['error', 'always'],
    // Enforce consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'never']
  }
}
