module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript', 'prettier'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-self-assign': 'error',
        'vue/multi-word-component-names': 'off',
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],
        'nonblock-statement-body-position': ['error', 'below'],
        curly: ['error', 'all'],

        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        'no-debugger': 'warn',
    },
};
