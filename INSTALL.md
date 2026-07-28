# JurisChat - Guia de Instalação e Configuração

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- PostgreSQL (localmente ou em nuvem)
- OpenAI API Key

## 🚀 Instalação Local

### 1. Clone o repositório

```bash
git clone https://github.com/guipk124-ops/jurischat.git
cd jurischat
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` e preencha:
- `DATABASE_URL`: URL da sua conexão PostgreSQL
- `OPENAI_API_KEY`: Sua chave da API OpenAI
- `NEXT_PUBLIC_APP_URL`: URL da aplicação (http://localhost:3000 para desenvolvimento)

### 4. Configure o banco de dados

```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate dev --name init
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
jurischat/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (chat)/            # Páginas de chat
│   │   ├── (dashboard)/       # Páginas do dashboard
│   │   ├── (home)/            # Página inicial
│   │   ├── api/               # Rotas da API
│   │   │   ├── chat/          # Endpoints de chat
│   │   │   ├── cases/         # Endpoints de casos
│   │   │   └── pdf/           # Geração de PDFs
│   │   └── layout.tsx         # Layout global
│   │
│   ├── components/             # Componentes React
│   │   ├── Chat/              # Componentes de chat
│   │   ├── Dashboard/         # Componentes do dashboard
│   │   └── Common/            # Componentes comuns
│   │
│   ├── lib/                   # Funções utilitárias
│   │   ├── ai.ts             # Integração OpenAI
│   │   ├── pdf.ts            # Geração de PDFs
│   │   ├── database.ts       # Prisma Client
│   │   └── utils.ts          # Funções auxiliares
│   │
│   ├── data/                  # Dados estáticos
│   │   └── legal-templates.ts # Templates jurídicos
│   │
│   ├── types/                 # Tipos TypeScript
│   │   └── index.ts
│   │
│   ├── store/                 # Zustand stores
│   │   └── chatStore.ts
│   │
│   └── styles/                # Estilos CSS
│       └── globals.css
│
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Variáveis de Ambiente

```env
# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/jurischat"

# OpenAI API
OPENAI_API_KEY="sua-chave-api-openai"

# Aplicação
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

## 🌐 Deploy

### Deploy na Vercel (Recomendado)

1. Push seu código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project" e selecione seu repositório
4. Configure as variáveis de ambiente
5. Clique em "Deploy"

### Deploy no Heroku

```bash
# Instale o Heroku CLI
npm install -g heroku

# Faça login
heroku login

# Crie a app
heroku create seu-app-name

# Configure o banco de dados
heroku addons:create heroku-postgresql:hobby-dev

# Configure as variáveis de ambiente
heroku config:set OPENAI_API_KEY="sua-chave"

# Deploy
git push heroku main

# Execute as migrações
heroku run npx prisma migrate deploy
```

## 📚 API Endpoints

### Chat
- `POST /api/chat/message` - Enviar mensagem e receber resposta IA
- `GET /api/chat/history/[caseId]` - Obter histórico de conversa

### Casos
- `POST /api/cases` - Criar novo caso
- `GET /api/cases` - Listar casos do usuário
- `GET /api/cases/[id]` - Obter detalhes do caso
- `PUT /api/cases/[id]` - Atualizar caso
- `DELETE /api/cases/[id]` - Deletar caso

### PDF
- `POST /api/pdf/generate` - Gerar PDF do caso

## 🔐 Autenticação

Atualmente, o sistema usa um ID de usuário armazenado no localStorage.

Para adicionar autenticação real:

1. Instale NextAuth:
   ```bash
   npm install next-auth
   ```

2. Crie `.env.local` com:
   ```env
   NEXTAUTH_SECRET=sua-chave-secreta
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Configure provedores de autenticação

## 🧪 Testes

```bash
# Execute os testes
npm test

# Com cobertura
npm run test:coverage
```

## 📝 Fluxo de Uso

1. **Cliente acessa o site** → Página inicial com informações
2. **Escolhe área jurídica** → Seleciona entre as opções disponíveis
3. **Inicia conversa com IA** → Bot faz perguntas estruturadas
4. **Responde perguntas** → Cliente fornece informações sobre o caso
5. **Sistema armazena dados** → Todas as informações são salvas no banco
6. **Gera relatório PDF** → Cliente pode baixar sumário do caso
7. **Advogado revisa** → No dashboard, advogado acessa o caso pronto

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/minhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add minhaFeature'`)
4. Push para a branch (`git push origin feature/minhaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## 📄 Licença

MIT License - veja LICENSE para detalhes

---

**Desenvolvido com ❤️ para profissionais jurídicos**
