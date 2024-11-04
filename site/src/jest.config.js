module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)' // Transforma o axios e outras dependências ES6 no node_modules
    ],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy' // Para lidar com arquivos CSS
    },
  };
  