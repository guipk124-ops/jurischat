# 🚀 JurisChat - Guia de Setup Automático

## Visão Geral

Este guia vai ajudar você a configurar o JurisChat completamente automatizado em 3 passos!

### ✅ O que será feito:
- Instalar dependências npm
- Gerar Prisma Client
- Criar arquivo `.env.local`
- Fornecer instruções para Supabase e Claude API
- Testar a conexão

---

## 📋 Pré-requisitos

- **Node.js 18+** - [Baixar aqui](https://nodejs.org)
- **Git** - [Baixar aqui](https://git-scm.com)
- **Terminal/CMD** aberto

---

## 🚀 Passo 1: Clone o Repositório

```bash
git clone https://github.com/guipk124-ops/jurischat.git
cd jurischat
```

---

## 🔧 Passo 2: Execute o Script de Setup

### 🐧 **Linux/Mac:**

```bash
chmod +x scripts/setup-auto.sh
./scripts/setup-auto.sh
```

### 🪟 **Windows:**

```bash
scripts\setup-auto.bat
```

---

## 📝 Passo 3: Configure as Variáveis de Ambiente

O script criará um arquivo `.env.local`. Você precisará preencher:

### 3.1 Criar Banco de Dados (Supabase)

**Acesse:** https://supabase.com

1. Clique em **"Sign Up"**
2. Crie conta com GitHub ou email: `gui.pk124@gmail.com`
3. Confirme o email
4. Clique em **"New Project"**
5. Preencha:
   - **Name:** `jurischat`
   - **Database Password:** `Ciril0-2103` (já definida)
   - **Region:** `South America - São Paulo`
6. Clique **"Create new project"** (espere ~2 minutos)

**Copie a Connection String:**

1. Vá em **Settings** → **Database**
2. Procure **"Connection String"**
3. Selecione **"URI"**
4. Copie (começará com `postgresql://`)

**Cole em `.env.local`:**

```env
DATABASE_URL="sua-url-aqui"
```

### 3.2 Criar API Claude (Grátis com Crédito)

**Acesse:** https://console.anthropic.com

1. Clique em **"Sign Up"**
2. Crie conta com email
3. Confirme o email
4. Vá em **"API Keys"**
5. Clique **"Create Key"**
6. Copie a chave (começa com `sk-ant-`)

**Cole em `.env.local`:**

```env
OPENAI_API_KEY="sk-ant-sua-chave-aqui"
```

---

## ▶️ Passo 4: Executar Migrations

Depois de preencher as variáveis de ambiente:

```bash
npx prisma migrate dev --name init
```

Isso vai:
- ✅ Criar as tabelas no banco de dados
- ✅ Gerar o Prisma Client
- ✅ Testar a conexão

---

## 🎬 Passo 5: Iniciar o Servidor

```bash
npm run dev
```

Você verá:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**Abra no navegador:** http://localhost:3000

---

## ✅ Checklist de Testes

Depois de tudo configurado, teste:

### 1. Acessar a página inicial
- [ ] Acesse http://localhost:3000
- [ ] Você vê a página inicial com botões?

### 2. Iniciar um chat
- [ ] Clique em "Iniciar Conversa"
- [ ] Escolha "Direito Trabalhista"
- [ ] O chatbot responde corretamente?

### 3. Enviar mensagem
- [ ] Digite uma mensagem
- [ ] Clique em "Enviar"
- [ ] A IA responde?

### 4. Ver Dashboard
- [ ] Clique em "Ver Meus Casos"
- [ ] Você vê o caso criado?

### 5. Gerar PDF
- [ ] Abra o caso no dashboard
- [ ] Clique em "Baixar PDF"
- [ ] O arquivo é baixado?

---

## 🐛 Troubleshooting

### Erro: "DATABASE_URL não encontrada"
```bash
# Verificar se .env.local existe
ls .env.local  # Linux/Mac
dir .env.local # Windows
```

### Erro: "OPENAI_API_KEY inválida"
- Copiar a chave novamente do console.anthropic.com
- Verificar se começa com `sk-ant-`

### Erro: "Porta 3000 já em uso"
```bash
# Use outra porta
npm run dev -- -p 3001
```

### Erro: "Módulos não encontrados"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Connection refused"
- Verificar se DATABASE_URL está correto
- Verificar se Supabase criou o projeto com sucesso
- Testar a conexão no Prisma Studio:
  ```bash
  npx prisma studio
  ```

---

## 📊 Estrutura de Dados

O script criará as seguintes tabelas:

```
User (usuários)
  ├── id (UUID)
  ├── email
  ├── password
  ├── name
  └── role (CLIENT, LAWYER, ADMIN)

Case (casos jurídicos)
  ├── id (UUID)
  ├── userId (FK)
  ├── legalArea
  ├── title
  ├── status (OPEN, IN_PROGRESS, CLOSED, ARCHIVED)
  ├── priority (LOW, MEDIUM, HIGH, URGENT)
  ├── clientData (JSON)
  └── caseData (JSON)

Chat (mensagens)
  ├── id (UUID)
  ├── caseId (FK)
  ├── userId (FK)
  ├── message
  ├── response
  ├── role (USER, ASSISTANT, SYSTEM)
  └── createdAt

Document (documentos)
  ├── id (UUID)
  ├── caseId (FK)
  ├── filename
  ├── fileUrl
  └── fileType
```

---

## 🔐 Segurança

⚠️ **IMPORTANTE:**

- ❌ Nunca compartilhe sua `.env.local`
- ❌ Nunca faça commit de `.env.local` no Git
- ❌ Nunca compartilhe suas chaves de API
- ✅ Use diferentes senhas em produção
- ✅ Sempre use HTTPS em produção
- ✅ Revise as credenciais antes de deploy

---

## 🚀 Próximos Passos

Depois de tudo funcionando:

1. **Adicionar Autenticação**
   ```bash
   npm install next-auth
   ```

2. **Deploy em Produção**
   - Vercel: Conectar GitHub e fazer deploy
   - Heroku: `heroku create seu-app && git push heroku main`

3. **Adicionar Mais Funcionalidades**
   - Upload de documentos
   - Integração com email
   - Mais áreas jurídicas

---

## 📚 Referências

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Supabase Docs](https://supabase.com/docs)
- [Claude API Docs](https://docs.anthropic.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 💬 Suporte

Tem dúvidas? Abra uma issue no GitHub:
https://github.com/guipk124-ops/jurischat/issues

---

**Desenvolvido com ❤️ para profissionais jurídicos**
