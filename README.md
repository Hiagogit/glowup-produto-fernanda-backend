# Mapa do Glow Up - Backend API

Backend API em Node.js com TypeScript, Express, Supabase Auth e Resend para envio de emails.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Supabase** - Autenticação e banco de dados
- **Resend** - Serviço de envio de emails
- **Helmet** - Segurança
- **CORS** - Cross-Origin Resource Sharing
- **Express Rate Limit** - Proteção contra força bruta
- **Express Validator** - Validação de dados
- **Morgan** - Logger de requisições

## 📁 Estrutura do Projeto

```
mapadoglowup-backend/
├── src/
│   ├── config/          # Configurações (Supabase, Resend)
│   ├── controllers/     # Controladores de rotas
│   ├── middleware/      # Middlewares (autenticação, etc)
│   ├── routes/          # Definições de rotas
│   ├── utils/           # Utilitários (serviço de email)
│   └── server.ts        # Arquivo principal do servidor
├── .env.example         # Exemplo de variáveis de ambiente
├── package.json
└── tsconfig.json
```

## ⚙️ Configuração

### 1. Instalar Dependências

```bash
cd mapadoglowup-backend
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# Resend Configuration
RESEND_API_KEY=re_sua_api_key

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Email Configuration
FROM_EMAIL=noreply@seudominio.com
SUPPORT_EMAIL=support@seudominio.com
APP_URL=http://localhost:5173
```

### 3. Configurar Supabase

1. Crie um novo projeto no [Supabase](https://supabase.com)
2. Vá em **Settings** → **API**
3. Copie:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

#### Configurar Email no Supabase

1. Vá em **Authentication** → **Email Templates**
2. Configure os templates de email (opcional, pois usamos Resend)
3. Em **Authentication** → **Settings**, configure:
   - Site URL: `http://localhost:5173`
   - Redirect URLs: adicione as URLs do seu frontend

### 4. Configurar Resend

1. Crie uma conta no [Resend](https://resend.com)
2. Adicione e verifique seu domínio
3. Crie uma API Key em **API Keys**
4. Copie a chave para `RESEND_API_KEY`

**Nota:** Para desenvolvimento, você pode usar o domínio de teste do Resend.

### 5. Iniciar o Servidor

#### Desenvolvimento (com hot reload)

```bash
npm run dev
```

#### Produção

```bash
# Build
npm run build

# Start
npm start
```

## 📡 Endpoints da API

### Base URL

```
http://localhost:3001/api
```

### Autenticação

#### POST `/auth/register`

Registra um novo usuário.

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

**Response (201):**
```json
{
  "message": "Usuário criado com sucesso! Verifique seu email para confirmar.",
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com"
  }
}
```

---

#### POST `/auth/login`

Realiza login de um usuário.

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "message": "Login realizado com sucesso",
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_in": 3600
  },
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com",
    "metadata": { "name": "Nome do Usuário" }
  }
}
```

---

#### POST `/auth/password-reset`

Solicita redefinição de senha.

**Body:**
```json
{
  "email": "usuario@exemplo.com"
}
```

**Response (200):**
```json
{
  "message": "Email de redefinição enviado com sucesso"
}
```

---

#### GET `/auth/profile`

Obtém perfil do usuário autenticado. **Requer autenticação.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com",
    "role": "user",
    "name": "Nome do Usuário"
  }
}
```

---

#### PUT `/auth/profile`

Atualiza perfil do usuário. **Requer autenticação.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Body:**
```json
{
  "name": "Novo Nome",
  "metadata": {
    "phone": "123456789"
  }
}
```

**Response (200):**
```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com",
    "metadata": { "name": "Novo Nome", "phone": "123456789" }
  }
}
```

---

#### PUT `/auth/password`

Atualiza senha do usuário. **Requer autenticação.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Body:**
```json
{
  "password": "nova_senha123"
}
```

**Response (200):**
```json
{
  "message": "Senha atualizada com sucesso"
}
```

---

#### POST `/auth/logout`

Realiza logout do usuário. **Requer autenticação.**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

### Health Check

#### GET `/health`

Verifica se a API está funcionando.

**Response (200):**
```json
{
  "status": "ok",
  "message": "API está funcionando!",
  "timestamp": "2026-01-20T21:30:00.000Z"
}
```

## 🔒 Autenticação

A API usa **JWT tokens** fornecidos pelo Supabase. Para rotas protegidas:

1. Faça login via `/auth/login`
2. Use o `access_token` retornado
3. Envie o token no header: `Authorization: Bearer {access_token}`

## 📧 Emails

O backend envia emails automáticos usando Resend:

- **Email de Boas-vindas**: Enviado após registro
- **Email de Redefinição de Senha**: Enviado ao solicitar reset
- **Email de Confirmação**: Para verificar email (configurável)

Templates HTML estão em `src/utils/email.service.ts`.

## 🛡️ Segurança

- **Helmet**: Headers de segurança HTTP
- **CORS**: Configurado para origins permitidas
- **Rate Limiting**: Máx 100 req/15min por IP
- **Validação de Dados**: Express Validator
- **JWT**: Tokens seguros do Supabase

## 🧪 Testando a API

### Com cURL

```bash
# Health check
curl http://localhost:3001/api/health

# Registro
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@exemplo.com","password":"senha123","name":"Teste"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@exemplo.com","password":"senha123"}'

# Perfil (com token)
curl http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer {seu_token}"
```

### Com Postman/Insomnia

Importe a coleção de endpoints acima ou use a interface gráfica.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa linter
- `npm run format` - Formata código com Prettier

## 🚀 Deploy na Vercel

### Passo a Passo

1. **Instalar Vercel CLI** (opcional)
```bash
npm i -g vercel
```

2. **Deploy via GitHub** (Recomendado)
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "Add New Project"
   - Importe o repositório: `glowup-produto-fernanda-backend`
   - Configure as variáveis de ambiente (veja abaixo)
   - Clique em "Deploy"

3. **Deploy via CLI**
```bash
vercel
```

### Variáveis de Ambiente na Vercel

Configure as seguintes variáveis em **Settings** → **Environment Variables**:

```
NODE_ENV=production
PORT=3001
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
RESEND_API_KEY=re_sua_api_key
ALLOWED_ORIGINS=https://seu-frontend.vercel.app
FROM_EMAIL=noreply@seudominio.com
SUPPORT_EMAIL=support@seudominio.com
APP_URL=https://seu-frontend.vercel.app
ANTHROPIC_API_KEY=sua-anthropic-key
GEMINI_API_KEY=sua-gemini-key
```

### Configuração do vercel.json

O projeto já inclui um arquivo `vercel.json` configurado para TypeScript e Express.

### Outras Plataformas

- **Railway**
- **Render**
- **Fly.io**
- **Heroku**
- **DigitalOcean App Platform**

## 📚 Próximos Passos

1. ✅ Configurar Supabase
2. ✅ Configurar Resend
3. ✅ Testar endpoints
4. 🔲 Criar tabelas no Supabase (conforme necessidade)
5. 🔲 Adicionar mais endpoints (ex: dados do mapa)
6. 🔲 Implementar testes automatizados
7. 🔲 Fazer deploy

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ para o Mapa do Glow Up**
