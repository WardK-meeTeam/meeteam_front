@echo off
npx --no-install jira-prepare-commit-msg "%~1"
exit /b %ERRORLEVEL%

:: Windows용 .cmd는 CRLF(기본) 사용 OK. 단, .husky/*.sh 파일은 반드시 LF로 유지