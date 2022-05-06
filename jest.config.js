module.exports = {
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/components/tests/mocks/styleMock.js',
    },
    modulePathIgnorePatterns: ["<rootDir>/cypress/"]
  };