# Contributing to ln.col

Thank you for your interest in contributing to ln.col! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** and motivation
- **Proposed solution**
- **Alternative solutions** considered

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Git

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ln.col.git
cd ln.col

# Install dependencies
npm run install:all

# Set up environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### Running Locally

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm start
```

## Coding Standards

### JavaScript/React

- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Keep components focused and reusable
- Write meaningful variable and function names

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add comments for complex logic
- Keep functions small and focused

### File Organization

```
src/
  components/     # React components
    ComponentName.js
    ComponentName.css
  utils/         # Utility functions
  hooks/         # Custom React hooks
  services/      # API services
```

### Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add wallet connection status indicator
fix: resolve transaction signing error
docs: update installation instructions
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for new features
- Update tests for modified code
- Ensure tests pass before submitting PR
- Aim for good test coverage

## Documentation

- Update README.md for major changes
- Document new features
- Add inline comments for complex logic
- Update API documentation
- Include examples where helpful

## Project Structure

```
ln.col/
├── client/              # React frontend
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
│
├── server/              # Express backend
│   ├── index.js         # Server entry point
│   └── package.json
│
├── README.md            # Main documentation
├── QUICKSTART.md        # Quick start guide
├── ARCHITECTURE.md      # Architecture docs
└── CONTRIBUTING.md      # This file
```

## Areas for Contribution

### High Priority

- [ ] Add comprehensive tests
- [ ] Improve error handling
- [ ] Add loading states
- [ ] Implement retry logic
- [ ] Add transaction history

### Medium Priority

- [ ] Add TypeScript support
- [ ] Implement NFT gallery
- [ ] Add batch minting
- [ ] Improve UI/UX
- [ ] Add dark mode

### Low Priority

- [ ] Add more wallet adapters
- [ ] Implement analytics
- [ ] Add social sharing
- [ ] Create admin panel
- [ ] Add multi-language support

## Getting Help

- Open an issue for questions
- Check existing documentation
- Review closed issues for solutions

## Review Process

1. **Automated checks** - Linting, tests, builds
2. **Code review** - Maintainer review
3. **Testing** - Manual testing if needed
4. **Merge** - Squash and merge

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes
- Project documentation

## Questions?

Feel free to open an issue for any questions or concerns.

Thank you for contributing to ln.col! 🎨
