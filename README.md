# 🏛️ JurisChat - Chatbot Jurídico Inteligente

Sistema completo de atendimento jurídico com chatbot IA que coleta informações do cliente e prepara casos prontos para o advogado trabalhar.

## 📋 Caracter��sticas Principais

- ✅ **Chatbot Multi-Área Jurídica** - Direito Trabalhista, Família, Consumidor, Contratos, Civil, Penal, etc.
- ✅ **Coleta Inteligente de Dados** - Formulários dinâmicos baseados na área jurídica
- ✅ **Geração de Relatórios em PDF** - Sumário completo do caso para o advogado
- ✅ **IA Integrada** - OpenAI para respostas naturais e diagnóstico preliminar
- ✅ **Dashboard do Advogado** - Visualize e gerencie todos os casos
- ✅ **Banco de Dados Estruturado** - Prisma ORM com PostgreSQL
- ✅ **Responsivo e Moderno** - Tailwind CSS + Next.js 14

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- OpenAI API Key

### Instalação

```bash
git clone https://github.com/guipk124-ops/jurischat.git
cd jurischat
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run dev
```

Acesse http://localhost:3000

## 🔧 Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **AI**: OpenAI API