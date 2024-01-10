const {
  rules: airbnbStyleRules,
} = require('eslint-config-airbnb-base/rules/style');

const airbnbNoRestrictedSyntax = airbnbStyleRules['no-restricted-syntax'];

const banImportExtension = (extension) => {
  const message = `Unexpected use of file extension (.${extension}) in import`;
  const literalAttributeMatcher = `Literal[value=/\\.${extension}$/]`;

  return [
    {
      // import foo from 'bar.js';
      selector: `ImportDeclaration > ${literalAttributeMatcher}.source`,
      message,
    },
    {
      // const foo = import('bar.js');
      selector: `ImportExpression > ${literalAttributeMatcher}.source`,
      message,
    },
    {
      // type Foo = typeof import('bar.js');
      selector: `TSImportType > TSLiteralType > ${literalAttributeMatcher}`,
      message,
    },
    {
      // const foo = require('foo.js');
      selector: `CallExpression[callee.name = "require"] > ${literalAttributeMatcher}.arguments`,
      message,
    },
  ];
};

module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      webpack: true,
    },
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: 'Please use the corresponding named import instead.',
          },
          {
            name: 'react',
            importNames: ['FC'],
          },
        ],
      },
    ],
    'class-methods-use-this': 'off',
    indent: 'off',
    'max-len': 'off',
    'newline-per-chained-call': 'off',
    'import/extensions': 'off',
    'no-restricted-syntax': [
      ...airbnbNoRestrictedSyntax,
      ...banImportExtension('js'),
    ],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'index',
          'sibling',
          'object',
          'type',
        ],
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-cycle': 'off',
    'import/no-duplicates': [
      'error',
      {
        'prefer-inline': true,
      },
    ],
    'react/prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/self-closing-comp': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function'],
        unnamedComponents: ['arrow-function'],
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
        assert: 'both',
        depth: 25,
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              'React.FC': null,
            },
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            fixStyle: 'inline-type-imports',
          },
        ],
        '@typescript-eslint/no-import-type-side-effects': 'error',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'react-refresh/only-export-components': 'warn',
      },
    },
  ],
};
