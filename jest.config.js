module.exports = {
  // Otras configuraciones de Jest...

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
  testMatch: ["**/__test__/**/*.ts?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
};