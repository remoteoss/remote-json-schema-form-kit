const config = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.m?[jt]sx?$': 'babel-jest',
  },
  // overrides the "main" entry point of the json-schema-form-v0-deprecated package
  moduleNameMapper: {
    '^@remoteoss/json-schema-form-v0-deprecated$':
      '<rootDir>/node_modules/@remoteoss/json-schema-form-v0-deprecated/dist/index.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@remoteoss/json-schema-form-v0-deprecated|@remoteoss/json-schema-form)/)',
  ],
}

export default config
