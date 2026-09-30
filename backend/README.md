# Financy — API

API GraphQL do Financy, em Node + TypeScript.

## Stack

- **Apollo Server 5** + **Express 5**
- **type-graphql** (schema code-first, gerado a partir dos decorators)
- **Prisma 7** com **SQLite** (via driver adapter `better-sqlite3`)
- Autenticação por **JWT** com senhas em **bcrypt**

## Pré-requisitos

- Node.js 20+
- pnpm

## Como rodar

```bash
cd backend
pnpm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `JWT_SECRET` | Segredo usado para assinar os tokens. **Gere um valor próprio** — veja abaixo. |
| `DATABASE_URL` | Caminho do banco SQLite. O padrão `file:./prisma/dev.db` funciona sem ajustes. |

Para gerar um segredo:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Depois, prepare o banco e suba o servidor:

```bash
pnpm generate   # gera o Prisma Client em src/generated/prisma
pnpm migrate    # aplica as migrations e cria o dev.db
pnpm seed       # opcional: cria um usuário de exemplo
pnpm dev
```

A API fica em **http://localhost:4000/graphql**, com o Apollo Sandbox disponível no navegador.

Usuário criado pelo `pnpm seed`:

```
e-mail: usuario@financy.com
senha:  pass1234
```

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Sobe o servidor com recarga automática |
| `pnpm generate` | Gera o Prisma Client |
| `pnpm migrate` | Cria e aplica migrations |
| `pnpm seed` | Popula o banco com um usuário de exemplo |
| `pnpm reset` | Apaga o banco e reaplica tudo do zero |

## Autenticação

Todas as operações, exceto `login` e `register`, exigem o header:

```
Authorization: Bearer <token>
```

O token vem no retorno de `login` e de `register`.

## Operações

**Queries** — `getUser`, `listCategories`, `getCategory`, `listTransactions`, `getTransaction`, `dashboard`

**Mutations** — `register`, `login`, `updateUser`, `deleteUser`, `createCategory`, `updateCategory`, `deleteCategory`, `createTransaction`, `updateTransaction`, `deleteTransaction`

O schema completo fica em [`schema.graphql`](./schema.graphql), regerado a cada boot do servidor.

## Estrutura

```
src/
├── dtos/          inputs e outputs do GraphQL
├── graphql/       contexto e decorators
├── middlewares/   IsAuth
├── models/        object types expostos no schema
├── resolvers/     queries e mutations
├── services/      acesso ao banco via Prisma
└── utils/         hash e jwt
prisma/
├── schema.prisma  modelos e enums
├── migrations/
└── seed.ts
```

## Notas

- Todas as consultas são **escopadas pelo usuário logado**: os services filtram por `userId`, então ninguém acessa dado de outra conta, nem passando um id válido de terceiro.
- Apagar uma categoria **não apaga** as transações dela — a relação usa `onDelete: SetNull` e as transações ficam sem categoria.
