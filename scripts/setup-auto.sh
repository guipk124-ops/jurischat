#!/bin/bash

# ================================
# JurisChat - Setup Automático
# ================================

set -e  # Exit on error

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   🏛️  JurisChat - Setup Automático   ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ================================
# 1. Verificar Node.js
# ================================
echo "${YELLOW}[1/7]${NC} Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "${RED}❌ Node.js não encontrado!${NC}"
    echo "Por favor, instale Node.js 18+ em https://nodejs.org"
    exit 1
fi
echo "${GREEN}✅ Node.js $(node --version)${NC}"
echo ""

# ================================
# 2. Instalar dependências
# ================================
echo "${YELLOW}[2/7]${NC} Instalando dependências..."
npm install --silent
echo "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# ================================
# 3. Verificar/Criar .env.local
# ================================
echo "${YELLOW}[3/7]${NC} Configurando variáveis de ambiente..."

if [ -f .env.local ]; then
    echo "${GREEN}✅ Arquivo .env.local já existe${NC}"
else
    echo "${YELLOW}⚠️  Criando arquivo .env.local${NC}"
    cat > .env.local << 'EOF'
# ===== BANCO DE DADOS =====
# Você receberá isso do Supabase
DATABASE_URL="postgresql://postgres:Ciril0-2103@localhost:5432/jurischat"

# ===== IA API =====
# Claude API (grátis com crédito)
OPENAI_API_KEY="sk-ant-v0-placeholder"

# ===== APLICAÇÃO =====
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
EOF
    echo "${GREEN}✅ Arquivo .env.local criado${NC}"
fi
echo ""

# ================================
# 4. Gerar Prisma Client
# ================================
echo "${YELLOW}[4/7]${NC} Gerando Prisma Client..."
npx prisma generate --silent
echo "${GREEN}✅ Prisma Client gerado${NC}"
echo ""

# ================================
# 5. Informar sobre Supabase
# ================================
echo "${YELLOW}[5/7]${NC} Configurando banco de dados Supabase..."
echo ""
echo "${YELLOW}📋 INSTRUÇÕES PARA SUPABASE:${NC}"
echo ""
echo "1. Acesse: https://supabase.com"
echo "2. Clique em 'Sign Up'"
echo "3. Crie conta com GitHub ou email (gui.pk124@gmail.com)"
echo "4. Confirme o email"
echo "5. Clique em 'New Project'"
echo "6. Preencha:"
echo "   - Name: jurischat"
echo "   - Database Password: Ciril0-2103"
echo "   - Region: South America - São Paulo"
echo "7. Espere ~2 minutos"
echo "8. Vá em Settings > Database > Connection String"
echo "9. Copie a URI (começa com postgresql://)"
echo "10. Cole aqui em .env.local na variável DATABASE_URL"
echo ""

# ================================
# 6. Informar sobre OpenAI/Claude
# ================================
echo "${YELLOW}[6/7]${NC} Configurando Claude API (grátis)..."
echo ""
echo "${YELLOW}📋 INSTRUÇÕES PARA CLAUDE API:${NC}"
echo ""
echo "1. Acesse: https://console.anthropic.com"
echo "2. Clique em 'Sign Up'"
echo "3. Crie conta com email"
echo "4. Confirme o email"
echo "5. Vá em 'API Keys'"
echo "6. Clique em 'Create Key'"
echo "7. Copie a chave (começa com sk-ant-)"
echo "8. Cole aqui em .env.local na variável OPENAI_API_KEY"
echo ""
echo "${GREEN}✅ Configuração de API concluída${NC}"
echo ""

# ================================
# 7. Próximas ações
# ================================
echo "${YELLOW}[7/7]${NC} Setup concluído!"
echo ""
echo "${GREEN}✅ Próximas ações:${NC}"
echo ""
echo "1. Edite .env.local com os valores do Supabase e Claude"
echo "2. Execute as migrations:"
echo "   ${YELLOW}npx prisma migrate dev --name init${NC}"
echo "3. Inicie o servidor:"
echo "   ${YELLOW}npm run dev${NC}"
echo "4. Abra no navegador:"
echo "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "${GREEN}════════════════════════════════════════${NC}"
echo "${GREEN}Precisa de ajuda? Abra uma issue no GitHub!${NC}"
echo "${GREEN}════════════════════════════════════════${NC}"
echo ""
