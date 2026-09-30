# Financy — Web

Interface do Financy, em React + TypeScript.

## Stack

- **React 19** com **Vite** como bundler
- **Apollo Client 4** para consumir a API GraphQL
- **Tailwind CSS 4** + componentes **shadcn/ui** e **Radix**
- **react-hook-form** + **zod** nos formulários
- **zustand** para a sessão, **react-router** para as rotas

## Pré-requisitos

- Node.js 20+
- pnpm
- A API rodando — veja [`../backend/README.md`](../backend/README.md)

## Como rodar

```bash
cd frontend
pnpm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `VITE_BACKEND_URL` | Endereço do GraphQL. Deixando vazio, cai em `http://localhost:4000/graphql`. |

```bash
pnpm dev
```

A aplicação sobe em **http://localhost:5173**.

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Checagem de tipos + build de produção |
| `pnpm preview` | Serve o build gerado |
| `pnpm lint` | ESLint |

## Rotas

| Rota | Tela |
|---|---|
| `/` | Dashboard |
| `/transacoes` | Listagem de transações, com filtros |
| `/categorias` | Listagem de categorias |
| `/profile` | Perfil do usuário |
| `/login`, `/signup` | Autenticação |

Rotas internas exigem sessão; sem token, a navegação volta para `/login`.

## Estrutura

Os componentes seguem **atomic design**, e cada pasta tem `index.tsx` com a
view e, quando há lógica, um `use.index.ts` com o hook.

```
src/
├── components/
│   ├── atoms/       Input, Select, Tag, Link, LabelButton, IconButton…
│   ├── molecules/   ControlledInput, CategoryCard, StatCard, EmptyState…
│   ├── organisms/   Header, Modal, TransactionsList, TransactionFilters…
│   └── ui/          primitivos do shadcn
├── pages/           uma pasta por tela, no mesmo padrão
├── lib/
│   ├── graphql/     client Apollo, queries e mutations
│   └── utils/       moeda, datas, ícones e cores
├── schemas/         validações zod
└── stores/          sessão (zustand)
```

## Notas

- O estado dos formulários vive nos hooks (`use.index.ts`); as views só consomem.
- Cores e ícones dinâmicos usam mapas estáticos: o Tailwind não gera classes
  montadas em runtime, então `bg-${cor}-light` sumiria no build.
