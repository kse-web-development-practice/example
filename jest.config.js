// eslint-disable-next-line no-undef
module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    // Transform CSS files
    '\\.(css|less|scss|sass)$': 'jest-css-modules-transform',
    // Other transformations if necessary
    '^.+\\.jsx?$': 'babel-jest'
  }
}
