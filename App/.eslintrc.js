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
        'no-self-assign': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        'vue/multi-word-component-names': 'off',
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],
        'nonblock-statement-body-position': ['error', 'below'],
        'no-debugger': 'off',
        curly: ['error', 'all'],
    },
};
