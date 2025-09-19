@echo off
echo Building Amazon DHC Onboarding Web App...
echo.

REM Build the application
call npm run build

if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.
echo 📁 Production files are in the 'build' folder
echo 🌐 Ready for deployment to any web hosting service
echo.
echo Deployment options:
echo 1. Upload 'build' folder contents to your web server
echo 2. Use 'npm run serve' to test locally
echo 3. Deploy to Netlify, Vercel, or GitHub Pages
echo.
echo See README-WEB-DEPLOYMENT.md for detailed instructions
echo.
pause
