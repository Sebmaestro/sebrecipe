# Get the directory this script lives in
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start backend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ScriptDir\backend'; .\mvnw.cmd spring-boot:run"

# Start frontend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ScriptDir\frontend'; npm run dev"