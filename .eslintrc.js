module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-console': 'off',
    'max-len': ['error', { code: 150 }],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
  },
  globals: {
    Client: 'writable',
  },
};
