module.exports = {
	extends: [
		'plugin:@typescript-eslint/recommended', // obligatoire pour que eslint marche avec TS
		'airbnb-base',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['node_modules/', 'build/'],
	rules: {
		'no-console': 'off',
		'max-len': ['error', { code: 150 }],
		'class-methods-use-this': 'off',
		'consistent-return': 'off',
		'import/no-unresolved': ['off', { commonjs: true }],
		'no-tabs': 'off',
		indent: ['error', 'tab'],
		'padded-blocks': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'no-unused-vars': 'off',
		'import/prefer-default-export': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'object-curly-newline': ['error', {
			ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
			ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
			ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
			ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
		}],
	},
};
