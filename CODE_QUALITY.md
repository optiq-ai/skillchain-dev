# SkillChain - Code Quality and Testing Standards

This document outlines the code quality and testing standards implemented in the SkillChain project.

## Overview

SkillChain follows industry best practices for code quality and testing to ensure a maintainable, reliable, and high-quality codebase. We've implemented the following tools and configurations:

## Code Quality Tools

### ESLint
We use ESLint to enforce code quality rules and catch potential issues early in development.
- Configuration: `.eslintrc.json`
- Extends: eslint:recommended, plugin:react/recommended, plugin:react-hooks/recommended, plugin:jsx-a11y/recommended
- Custom rules for React, imports, and general JavaScript best practices

### Prettier
We use Prettier to ensure consistent code formatting across the project.
- Configuration: `.prettierrc`
- Settings include single quotes, 2-space indentation, and 100 character line length

## Testing Framework

### Jest
We use Jest as our testing framework for unit and integration tests.
- Configuration: `jest.config.js`
- Coverage threshold: 70% for branches, functions, lines, and statements
- Includes setup for React component testing with jsdom environment

## Git Hooks

### Husky
We use Husky to enforce code quality checks before commits and pushes.
- Configuration: `.huskyrc`
- Pre-commit: Runs lint-staged to check and fix code quality issues
- Pre-push: Runs tests to ensure all tests pass before pushing

### lint-staged
We use lint-staged to run linters and formatters only on staged files.
- Configuration: `.lintstagedrc`
- Runs ESLint, Prettier, and Jest on appropriate file types

## Best Practices

For detailed information on our code quality and testing standards, please refer to the comprehensive documentation in `/code_quality_standards.md`.

## Implementation

These standards are enforced through:
1. Configuration files in the repository
2. Automated checks in the CI/CD pipeline
3. Code review process
4. Developer education and documentation

By following these standards, we ensure that SkillChain maintains high code quality, is well-tested, and is easy to maintain and extend.
