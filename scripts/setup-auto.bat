@echo off
REM ================================
REM JurisChat - Setup Automático
REM ================================

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════╗
echo ║   🏛️  JurisChat - Setup Automático   ║
echo ╚════════════════════════════════════════╝
echo.

REM ================================
REM 1. Verificar Node.js
REM ================================
echo [1/6] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não encontrado!
    echo Por favor, instale Node.js 18+ em https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION%
echo.

REM ================================
REM 2. Instalar dependências
REM ================================
echo [2/6] Instalando dependências...
call npm install --silent
if errorlevel 1 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)
echo ✅ Dependências instaladas
echo.

REM ================================
REM 3. Criar .env.local
REM ================================
echo [3/6] Configurando variáveis de ambiente...
if exist .env.local (
    echo ✅ Arquivo .env.local já existe
) else (
    echo ⚠️  Criando arquivo .env.local
    (
        echo # ===== BANCO DE DADOS =====
        echo # Você receberá isso do Supabase
        echo DATABASE_URL="postgresql://postgres:Ciril0-2103@localhost:5432/jurischat"
        echo.
        echo # ===== IA API =====
        echo # Claude API (grátis com crédito"
        echo OPENAI_API_KEY="sk-ant-v0-placeholder"
        echo.
        echo # ===== APLICAÇÃO =====
        echo NEXT_PUBLIC_APP_URL="http://localhost:3000"
        echo NODE_ENV="development"
    ) > .env.local
    echo ✅ Arquivo .env.local criado
)
echo.

REM ================================
REM 4. Gerar Prisma Client
REM ================================
echo [4/6] Gerando Prisma Client...
call npx prisma generate --silent
if errorlevel 1 (
    echo ❌ Erro ao gerar Prisma Client
    pause
    exit /b 1
)
echo ✅ Prisma Client gerado
echo.

REM ================================
REM 5. Instruções Supabase
REM ================================
echo [5/6] Configurando banco de dados Supabase...
echo.
echo 📋 INSTRUÇÕES PARA SUPABASE:
echo.
echo 1. Acesse: https://supabase.com
echo 2. Clique em 'Sign Up'
echo 3. Crie conta com GitHub ou email (gui.pk124@gmail.com)
echo 4. Confirme o email
echo 5. Clique em 'New Project'
echo 6. Preencha:
echo    - Name: jurischat
echo    - Database Password: Ciril0-2103
echo    - Region: South America - São Paulo
echo 7. Espere ~2 minutos
echo 8. Vá em Settings ^> Database ^> Connection String
echo 9. Copie a URI (começa com postgresql://)
echo 10. Cole aqui em .env.local na variável DATABASE_URL
echo.

REM ================================
REM 6. Instruções Claude API
REM ================================
echo [6/6] Configurando Claude API (grátis)...
echo.
echo 📋 INSTRUÇÕES PARA CLAUDE API:
echo.
echo 1. Acesse: https://console.anthropic.com
echo 2. Clique em 'Sign Up'
echo 3. Crie conta com email
echo 4. Confirme o email
echo 5. Vá em 'API Keys'
echo 6. Clique em 'Create Key'
echo 7. Copie a chave (começa com sk-ant-)
echo 8. Cole aqui em .env.local na variável OPENAI_API_KEY
echo.
echo ✅ Setup concluído!
echo.
echo 📝 Próximas ações:
echo.
echo 1. Edite .env.local com os valores do Supabase e Claude
echo 2. Execute as migrations:
echo    npx prisma migrate dev --name init
echo 3. Inicie o servidor:
echo    npm run dev
echo 4. Abra no navegador:
echo    http://localhost:3000
echo.
echo ════════════════════════════════════════
echo Precisa de ajuda? Abra uma issue no GitHub!
echo ════════════════════════════════════════
echo.
pause
