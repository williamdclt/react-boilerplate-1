module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/**/*.story.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.jsx',
    '!app/global-styles.js',
    '!app/**/*/Loadable.{js,jsx}',
    '!app/**/index.{js,jsx}',
    '!app/tests/*',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 98,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
    'react-intl': '<rootDir>/internals/mocks/react-intl.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/internals/testing/test-bundler.js',
  testRegex: 'tests/.*\\.test\\.jsx?$',
};
