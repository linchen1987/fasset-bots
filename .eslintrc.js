module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
    ],
    extends: [
    ],
    rules: {
        'guard-for-in': 'warn',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
        'no-fallthrough': 'error',
    },
    parserOptions: {
        ecmaVersion: 2020,
        project: './tsconfig.json',
    },
}
