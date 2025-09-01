@echo off
REM Setup script to install git hooks for environment file protection

echo 🔧 Setting up git hooks for environment file protection...

REM Create .git/hooks directory if it doesn't exist
if not exist ".git\hooks" mkdir ".git\hooks"

REM Copy pre-commit hook
copy ".githooks\pre-commit" ".git\hooks\pre-commit"

echo ✅ Git hooks installed successfully!
echo 🔒 Your repository is now protected against accidental environment file commits.
echo.
echo To test the hook, try:
echo   git add .env.local
echo   git commit -m "test"
echo.
echo The hook should prevent the commit and show an error message.
pause
