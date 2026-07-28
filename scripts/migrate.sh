#!/bin/bash

# ================================
# JurisChat - Migração Automática
# ================================

echo "🚀 Iniciando migração do banco de dados..."
echo ""

# Verificar se DATABASE_URL está configurado
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Erro: DATABASE_URL não está configurada"
    echo "Configure .env.local e tente novamente"
    exit 1
fi

echo "📝 DATABASE_URL encontrada"
echo ""

# Gerar Prisma Client
echo "[1/3] Gerando Prisma Client..."
npx prisma generate
echo ""

# Executar migrations
echo "[2/3] Executando migrations..."
npx prisma migrate dev --name init
echo ""

# Verificar conexão
echo "[3/3] Verificando conexão..."
npx prisma db execute --stdin < /dev/null

echo ""
echo "✅ Migração concluída com sucesso!"
echo ""
echo "Próximos passos:"
echo "1. npm run dev"
echo "2. Acesse http://localhost:3000"
echo ""
