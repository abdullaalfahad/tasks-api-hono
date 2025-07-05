import antfu from '@antfu/eslint-config';

export default antfu({
  type: 'lib',

  typescript: true,
  vue: false,

  formatter: true,

  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
    trailingComma: 'all',
    arrowParens: 'always',
  },

  jsonc: false,
  yaml: false,

  ignores: [
    '**/dist',
    '**/node_modules',
    '**/fixtures',
    '**/coverage',
    '**/.output',
  ],
});
