#!/bin/bash

echo "🚀 JurisChat - Setup Script"
echo "============================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js 18+"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

echo ""
echo "📝 Configurando variáveis de ambiente..."

# Copiar arquivo de exemplo se não existir
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Arquivo .env.local criado"
    echo "⚠️  Por favor, edite .env.local com suas credenciais"
else
    echo "✅ Arquivo .env.local já existe"
fi

echo ""
echo "🗄️  Configurando banco de dados..."

# Gerar cliente Prisma
npx prisma generate

# Executar migrações
echo "Executando migrações..."
npx prisma migrate dev --name init

echo ""
echo "✅ Setup concluído!"
echo ""
echo "Para iniciar o servidor de desenvolvimento, execute:"
echo "npm run dev"
echo ""
echo "Acesse http://localhost:3000"
