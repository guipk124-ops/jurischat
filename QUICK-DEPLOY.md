# 🚀 JurisChat - Deploy em 5 Minutos

## ⚡ Guia Rápido para Ter Seu Link Funcionando

> **Tempo total: ~5 minutos** ⏱️

---

## 📋 Resumo Rápido

Você vai:
1. ✅ Criar banco de dados Supabase (2 min)
2. ✅ Gerar chave Claude API (1 min)
3. ✅ Fazer deploy no Vercel (2 min)
4. ✅ **Receber seu link** 🎉

---

## 🟦 Passo 1: Criar Banco de Dados (Supabase) - 2 minutos

### 1.1 Acesse https://supabase.com/sign-up

![Supabase Sign Up](https://img.shields.io/badge/Clique%20aqui-supabase.com-blue)

### 1.2 Crie conta com GitHub

- Clique em **"Continue with GitHub"**
- Selecione sua conta: **guipk124-ops**
- Autorize

### 1.3 Crie um novo projeto

```
Name:                 jurischat
Database Password:    Ciril0-2103
Region:              South America - São Paulo
```

**Clique "Create new project"** (espere ~2 minutos)

### 1.4 Copie a Connection String

1. Vá em **Settings** → **Database** → **Connection Pooling**
2. Selecione **URI**
3. **Copie tudo** (começa com `postgresql://`)

### ✅ Salve em um lugar seguro:
```
SUPABASE_CONNECTION_STRING = "cole-aqui"
```

---

## 🔑 Passo 2: Gerar Chave Claude API - 1 minuto

### 2.1 Acesse https://console.anthropic.com/sign-up

![Anthropic Sign Up](https://img.shields.io/badge/Clique%20aqui-anthropic.com-blue)

### 2.2 Crie conta com email

- Email: **gui.pk124@gmail.com** ✅
- Confirme o email

### 2.3 Crie uma chave de API

1. Vá em **API Keys**
2. Clique **"Create Key"**
3. **Copie a chave** (começa com `sk-ant-`)

### ✅ Salve em um lugar seguro:
```
CLAUDE_API_KEY = "cole-aqui"
```

---

## 🚀 Passo 3: Deploy no Vercel - 2 minutos

### 3.1 Acesse https://vercel.com/import

![Vercel Import](https://img.shields.io/badge/Clique%20aqui-vercel.com/import-blue)

### 3.2 Importe seu repositório

1. Clique **"Select a Git Provider"** → **GitHub**
2. Autorize
3. Procure por: **jurischat**
4. Clique **"Import"**

### 3.3 Configure as Variáveis de Ambiente

**Procure por "Environment Variables"** e adicione:

```
DATABASE_URL = "sua-supabase-connection-string"
OPENAI_API_KEY = "sua-claude-api-key"
NEXT_PUBLIC_APP_URL = "seu-dominio-vercel.vercel.app"
NODE_ENV = "production"
```

### 3.4 Clique "Deploy"

Espere ~2 minutos enquanto o Vercel faz o build...

### ✅ Pronto! Você recebe seu link:

```
https://jurischat-seu-usuario.vercel.app
```

---

## 🎉 Seu App Está Pronto!

**Acesse:** `https://jurischat-seu-usuario.vercel.app`

### Teste agora:

1. ✅ Clique em **"Iniciar Conversa"**
2. ✅ Escolha uma área jurídica
3. ✅ Digite uma mensagem
4. ✅ Veja a IA responder!

---

## 📚 Guia Passo-a-Passo (com mais detalhes)

### Se ficar com dúvida em algum passo:

```bash
# Linux/Mac - Abra o terminal e rode:
cat SETUP-AUTO.md

# Windows - Ou abra em um editor de texto:
SETUP-AUTO.md
```

---

## ❓ Dúvidas Rápidas

**P: Preciso instalar algo no meu computador?**
R: Não! Tudo é online. Você só copia e cola informações.

**P: É grátis mesmo?**
R: Sim! Vercel + Supabase + Claude (com crédito) = 100% grátis.

**P: Quanto tempo demora?**
R: 5 minutos total se seguir os passos.

**P: Posso alterar a senha depois?**
R: Sim! No painel do Supabase → Settings → Database.

**P: E se der erro?**
R: Veja a seção "Troubleshooting" abaixo.

---

## 🔧 Troubleshooting

### Erro: "DATABASE_URL inválida"
- ❌ Verificar se copiou toda a URL
- ✅ Copiar novamente do Supabase (Settings → Database → Connection Pooling → URI)

### Erro: "OPENAI_API_KEY inválida"
- ❌ Verificar se começa com `sk-ant-`
- ✅ Gerar uma nova chave em console.anthropic.com

### Erro: "Build falhou no Vercel"
- ❌ Verificar se todas as variáveis de ambiente estão preenchidas
- ✅ Ir em Vercel → Settings → Environment Variables
- ✅ Redeploy clicando em "Redeploy"

### Erro: "Database connection refused"
- ❌ Verificar se a senha está correta (Ciril0-2103)
- ✅ Testar no Prisma Studio:
  ```bash
  npx prisma studio
  ```

---

## 🎯 Próximos Passos

Depois que seu app está rodando:

1. **Adicionar Autenticação** (login/registro)
2. **Upload de Documentos** (PDFs, imagens)
3. **Integração com Email** (notificações)
4. **Domínio Customizado** (seu-dominio.com)

---

## 📞 Precisa de Ajuda?

- 📖 Leia: `SETUP-AUTO.md` (guia detalhado)
- 🐛 Abra issue: https://github.com/guipk124-ops/jurischat/issues
- 💬 Me contacte via GitHub

---

## ✅ Checklist Final

- [ ] Supabase criado
- [ ] Connection String copiada
- [ ] Claude API criada
- [ ] API Key copiada
- [ ] Vercel importou o repositório
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy concluído
- [ ] Link funciona!

---

**Desenvolvido com ❤️ para profissionais jurídicos**

**Tempo total: ~5 minutos ⏱️**
