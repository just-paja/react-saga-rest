module.exports = {
  projects: [
    {
      displayName: 'lint',
      runner: 'jest-runner-standard',
      testMatch: [
        '<rootDir>/**/*.{js,jsx}'
      ],
      testPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/lib', '<rootDir>/node_modules']
    },
    {
      displayName: 'lib',
      setupFiles: [
        '<rootDir>/jest.setup.js'
      ],
      setupFilesAfterEnv: ['jest-enzyme/lib/index.js'],
      testPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/lib', '<rootDir>/node_modules'],
      collectCoverageFrom: [
        'src/**/*.{js,jsx}'
      ],
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/locales/',
        '/constants/'
      ],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
      }
    }
  ]
}
