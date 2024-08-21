import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-duplicate-imports': 'error',
      'no-template-curly-in-string': 'warn',
      'no-unreachable-loop': 'error',
      'consistent-return': 'warn',
      'default-case': 'warn',
      'default-case-last': 'warn',
      'default-param-last': 'error',
      eqeqeq: ['warn', 'smart'],
      'no-eq-null': 'error',
      'no-empty-function': 'warn',
      'require-await': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
