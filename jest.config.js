// eslint-disable-next-line no-undef
module.exports = {
  // rootDir: './',
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/Components/**', '!**/stories/**'],
  // testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ['<rootDir>/bower_components/', '<rootDir>/node_modules/'],
  transform: {
    // Transform CSS files
    '\\.(css|less|scss|sass)$': 'jest-css-modules-transform',
    // Other transformations if necessary
    '^.+\\.jsx?$': 'babel-jest'
  }
}
