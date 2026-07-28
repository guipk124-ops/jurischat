#!/bin/bash

echo "🚀 JurisChat - Windows Setup Script"
echo "====================================="
echo ""

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não está instalado. Por favor, instale Node.js 18+
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
echo ""

REM Instalar dependências
echo 📦 Instalando dependências...
call npm install

echo.
echo 📝 Configurando variáveis de ambiente...

REM Copiar arquivo de exemplo se não existir
if not exist .env.local (
    copy .env.example .env.local
    echo ✅ Arquivo .env.local criado
    echo ⚠️  Por favor, edite .env.local com suas credenciais
) else (
    echo ✅ Arquivo .env.local já existe
)

echo.
echo 🗄️  Configurando banco de dados...

REM Gerar cliente Prisma
node_modules\.bin\prisma generate

REM Executar migrações
echo Executando migrações...
node_modules\.bin\prisma migrate dev --name init

echo.
echo ✅ Setup concluído!
echo.
echo Para iniciar o servidor de desenvolvimento, execute:
echo npm run dev
echo.
echo Acesse http://localhost:3000
pause
