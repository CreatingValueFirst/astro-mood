# Contributing to AstroMood

First off, thank you for considering contributing to AstroMood! It's people like you that make AstroMood such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the TypeScript styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

### 1. Fork the Repository

Fork the project on GitHub and clone your fork locally:

```bash
git clone https://github.com/YOUR-USERNAME/astro-mood.git
cd astro-mood
git remote add upstream https://github.com/CreatingValueFirst/astro-mood.git
```

### 2. Create a Branch

Create a branch for your changes:

```bash
git checkout -b feature/my-new-feature
```

Branch naming conventions:
* `feature/` - New features
* `fix/` - Bug fixes
* `docs/` - Documentation changes
* `refactor/` - Code refactoring
* `test/` - Test additions or modifications

### 3. Set Up Development Environment

```bash
# Install dependencies
cd apps/web
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

### 4. Make Your Changes

* Write clear, concise commit messages
* Follow the existing code style
* Add tests for new features
* Update documentation as needed

### 5. Test Your Changes

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build to ensure no errors
npm run build
```

### 6. Commit Your Changes

We use conventional commits. Your commit messages should follow this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation only changes
* `style`: Code style changes (formatting, etc.)
* `refactor`: Code refactoring
* `test`: Adding or updating tests
* `chore`: Maintenance tasks

**Examples:**
```
feat(dashboard): add monthly mood chart visualization

fix(auth): resolve session refresh issue on route change

docs(readme): update installation instructions
```

### 7. Push to Your Fork

```bash
git push origin feature/my-new-feature
```

### 8. Open a Pull Request

Go to the original repository and create a pull request. Fill out the PR template with all the requested information.

## Styleguides

### TypeScript Styleguide

* Use TypeScript for all new code
* Use meaningful variable and function names
* Add JSDoc comments for complex functions
* Prefer `const` over `let`, avoid `var`
* Use arrow functions for callbacks
* Use async/await over promises
* Prefer functional programming patterns

### React/Next.js Styleguide

* Use functional components with hooks
* Follow the React Hooks rules
* Keep components small and focused
* Extract reusable logic into custom hooks
* Use TypeScript interfaces for props
* Co-locate related files (component, styles, tests)

### CSS/Tailwind Styleguide

* Use Tailwind utility classes
* Follow mobile-first responsive design
* Use semantic color names from the theme
* Keep custom CSS minimal
* Use CSS modules for component-specific styles when needed

### Commit Message Styleguide

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests after the first line

## Project Structure

```
astro-mood/
├── apps/web/               # Next.js application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   └── lib/            # Utilities
├── packages/
│   └── astro-core/         # Astrology engine
└── supabase/               # Database migrations
```

## Key Technologies

* **Next.js 14** - React framework with App Router
* **TypeScript** - Type safety
* **Supabase** - Backend and authentication
* **Tailwind CSS** - Styling
* **shadcn/ui** - UI components
* **astronomy-engine** - Astronomical calculations

## Testing

We use Jest and React Testing Library for testing:

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## Recognition

Contributors will be recognized in our README.md file and release notes.

Thank you for contributing to AstroMood! 🌟
