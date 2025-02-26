# ProofLab Frontend Development Guidelines

## Build/Test Commands
- `yarn start` - Run the app in development mode
- `yarn build` - Build for production
- `yarn test` - Run all tests
- `yarn test src/path/to/file.test.js` - Run specific test file
- `yarn update-telemetry` - Update telemetry index
- `yarn deploy` - Deploy site to GitHub Pages

## Code Style Guidelines
- **Imports**: Group imports in order: React, libraries, components, utils/hooks, styles
- **Component Structure**: Use functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions/variables
- **State Management**: Use React hooks (useState, useEffect, useMemo)
- **Error Handling**: Use try/catch in async functions, display error states in UI
- **Data Fetching**: Abstract in custom hooks (e.g., useTelemetry)
- **Formatting**: 2-space indentation, semicolons required
- **CSS**: Use Tailwind classes for styling
- **Types**: Document prop shapes with JSDoc comments
- **Telemetry**: Process data using utility functions for consistent formatting

Remember to run telemetry updates before deployment.