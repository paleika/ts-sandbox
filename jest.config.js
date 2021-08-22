module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  setupFilesAfterEnv: ["./setup-tests.ts"],
  extensionsToTreatAsEsm: [".[jt]sx?"],
  globals: {
    "ts-jest": {
      "tsconfig": '<rootDir>/tsconfig.json',
      "useESM": true,
    },
  },
  moduleNameMapper: {
    "\\.(css|jpg|png)$": '<rootDir>/src/utils/empty-module.ts',
  },
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest"
  },
}
