@echo off
REM Gọi PowerShell script để tổng hợp dữ liệu SHOPEE
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0merge-revenue-shopee.ps1"
pause
