module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-console': 'off',
    'max-len': ['error', { code: 150 }],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': ['off', { commonjs: true}]
  },
  globals: {
    Client: 'writable',
  },
};
