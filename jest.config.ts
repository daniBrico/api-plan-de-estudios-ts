import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./src/tests/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}

export default config
