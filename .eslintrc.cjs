/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },

    // Base config
    extends: ['eslint:recommended'],

    rules: {
        'no-empty': 'off',
        'no-console': 'error',
    },

    overrides: [
        // React
        {
            files: ['**/*.{ts,tsx}'],
            plugins: ['react', 'jsx-a11y'],
            extends: [
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
            ],
            settings: {
                react: {
                    version: 'detect',
                },
                formComponents: ['Form'],
                linkComponents: [
                    { name: 'Link', linkAttribute: 'to' },
                    { name: 'NavLink', linkAttribute: 'to' },
                ],
                'import/resolver': {
                    typescript: {},
                },
            },
            rules: {
                'react/prop-types': 'off',
                'react/jsx-no-target-blank': 'off',
                'jsx-a11y/click-events-have-key-events': 'off',
                'jsx-a11y/no-static-element-interactions': 'off',
            },
        },

        // Typescript
        {
            files: ['**/*.{ts,tsx}'],
            plugins: ['@typescript-eslint', 'import'],
            parser: '@typescript-eslint/parser',
            settings: {
                'import/internal-regex': '^~/',
                'import/resolver': {
                    node: {
                        extensions: ['.ts', '.tsx'],
                    },
                    typescript: {
                        alwaysTryTypes: true,
                    },
                },
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:import/recommended',
                'plugin:import/typescript',
            ],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/explicit-member-accessibility': 'error',
                'import/no-extraneous-dependencies': [
                    'error',
                    { devDependencies: ['_codux/**/*', 'vite.config.ts'] },
                ],
            },
        },

        // Node
        {
            files: ['.eslintrc.cjs'],
            env: {
                node: true,
            },
        },
    ],
};
