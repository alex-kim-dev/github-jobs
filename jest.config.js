module.exports = {
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file.mock.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^@assets(.*)$': '<rootDir>/assets$1',
    '^@components(.*)$': '<rootDir>/components$1',
    '^@services(.*)$': '<rootDir>/services$1',
    '^@store(.*)$': '<rootDir>/store$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
    '^@constants(.*)$': '<rootDir>/utils/constants$1',
    '^@helpers(.*)$': '<rootDir>/utils/helpers$1',
    '^@hooks(.*)$': '<rootDir>/utils/hooks$1',
    '^@views(.*)$': '<rootDir>/views$1',
  },
  rootDir: 'src',
  setupFilesAfterEnv: ['../jest.setup.js'],
  testEnvironment: 'jsdom',
};
