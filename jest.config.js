// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['/**/*.{js,jsx,ts,tsx}'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/firebase/'],
  testPathIgnorePatterns: ['<rootDir>/firebase/', '<rootDir>/node_modules/firebase/app/dist/'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/coverage', '<rootDir>/dist'
    ],
    moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/'],
    moduleNameMapper: {
        "^.+.(svg|png|jpg)$": "jest-transform-stub",
        '@/(.*)': '<rootDir>/$1',
        '@modules/(.*)': '<rootDir>/components/$1',
        '@firebase/(.*)': '<rootDir>/firebase/$1',
        '@pages/(.*)': '<rootDir>/pages/$1',
        '@styles/(.*)': '<rootDir>/styles/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js', './.jest/setEnvVars.js'],

}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)