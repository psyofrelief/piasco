module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/singleton.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", { allowJs: true }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@auth|next-auth|@auth/prisma-adapter|@auth/core)/)",
  ],
};
