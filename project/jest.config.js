module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/lib/bindings/Circles.stories.ts',
    '<rootDir>/src/lib/bindings/Ellipses.stories.ts',
    '<rootDir>/src/lib/bindings/Lines.stories.ts',
    '<rootDir>/src/lib/bindings/Paths.stories.ts',
    '<rootDir>/src/lib/bindings/Polylines.stories.ts',
    '<rootDir>/src/lib/bindings/Rectangles.stories.ts',
    '<rootDir>/src/lib/bindings/Text.stories.ts',
  ],
};
