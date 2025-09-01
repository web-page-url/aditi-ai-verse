#!/bin/bash
# Setup script to install git hooks for environment file protection

echo "🔧 Setting up git hooks for environment file protection..."

# Create .git/hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy pre-commit hook
cp .githooks/pre-commit .git/hooks/pre-commit

# Make the hook executable
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed successfully!"
echo "🔒 Your repository is now protected against accidental environment file commits."
echo ""
echo "To test the hook, try:"
echo "  git add .env.local"
echo "  git commit -m 'test'"
echo ""
echo "The hook should prevent the commit and show an error message."
