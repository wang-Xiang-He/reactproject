@setlocal enableextensions
@echo off
@cd /d "%~dp0"

REM file directory
set cwd=%~dp0%
md log

REM Uninstall old services
nssm stop FastAPIService
nssm remove FastAPIService confirm

echo %cwd%\ipsearch.py
nssm.exe install FastAPIService "C:\ProgramData\Anaconda3\envs\fastapi\python.exe" "%cwd%\ipsearch.py"

nssm set FastAPIService Start SERVICE_AUTO_START
nssm set FastAPIService DisplayName "FastAPIService"
nssm set FastAPIService AppStdout "%cwd%\stdout.log"
nssm set FastAPIService AppStderr "%cwd%\stderr.log"

REM Start services
nssm start FastAPIService

echo nssmstatus FastAPIService

@pause
