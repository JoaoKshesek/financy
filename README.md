# Financy

Aplicação de controle financeiro pessoal: o usuário registra receitas e
despesas, organiza tudo em categorias e acompanha o resumo do mês num
painel.

Cada conta enxerga apenas os próprios dados.

## O que a aplicação faz

- **Conta e sessão** — cadastro, login e edição do perfil, com autenticação por JWT
- **Categorias** — criar, editar e excluir, escolhendo um entre 16 ícones e uma entre 7 cores
- **Transações** — registrar entradas e saídas, com data, valor, categoria e descrição
- **Listagem** — busca por descrição e filtros por tipo, categoria e período, com paginação
- **Dashboard** — saldo total, receitas e despesas do mês, as 5 transações mais recentes e as 5 categorias mais usadas

## Stack

| | |
|---|---|
| **Back-end** | Node, TypeScript, Apollo Server, type-graphql, Prisma, SQLite |
| **Front-end** | React, TypeScript, Vite, Apollo Client, Tailwind CSS, shadcn/ui |

## Estrutura

```
financy/
├── backend/    API GraphQL
└── frontend/   aplicação React
```

## Como rodar

Suba a API primeiro, depois o front:

1. [`backend/README.md`](./backend/README.md) — API em `http://localhost:4000/graphql`
2. [`frontend/README.md`](./frontend/README.md) — aplicação em `http://localhost:5173`

## Requisitos

### Back-end

- [x] O usuário pode criar uma conta e fazer login
- [x] O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [x] Deve ser possível criar uma transação
- [x] Deve ser possível deletar uma transação
- [x] Deve ser possível editar uma transação
- [x] Deve ser possível listar todas as transações
- [x] Deve ser possível criar uma categoria
- [x] Deve ser possível deletar uma categoria
- [x] Deve ser possível editar uma categoria
- [x] Deve ser possível listar todas as categorias

### Front-end

- [x] O usuário pode criar uma conta e fazer login
- [x] O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [x] Deve ser possível criar uma transação
- [x] Deve ser possível deletar uma transação
- [x] Deve ser possível editar uma transação
- [x] Deve ser possível listar todas as transações
- [x] Deve ser possível criar uma categoria
- [x] Deve ser possível deletar uma categoria
- [x] Deve ser possível editar uma categoria
- [x] Deve ser possível listar todas as categorias
- [x] É obrigatória a criação de uma aplicação React usando GraphQL para consultas na API e Vite como bundler
- [x] Siga o mais fielmente possível o layout do Figma

## Como o escopo por usuário funciona

O middleware `IsAuth` valida o token e o decorator `GqlUser` injeta o usuário
no resolver. Todo service filtra por `userId` — inclusive na busca por id,
que usa `findFirst({ id, userId })` em vez de `findUnique({ id })`.

Na prática: pedir uma categoria de outra conta devolve "não encontrada", sem
revelar que o recurso existe.
