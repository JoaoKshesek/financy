import 'dotenv/config'
import 'reflect-metadata'
import path from 'node:path'
import http from 'node:http'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { buildSchema } from 'type-graphql'

import { buildContext, GraphqlContext } from './graphql/context'
import { AuthResolver } from './resolvers/auth.resolver'
import { UserResolver } from './resolvers/user.resolver'
import { CategoryResolver } from './resolvers/category.resolver'

const PORT = Number(process.env.PORT) || 4000

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      CategoryResolver
    ],
    emitSchemaFile: path.resolve(process.cwd(), 'schema.graphql'),
    validate: false,
  })

  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer<GraphqlContext>({ schema })
  await server.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, { context: buildContext })
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )

  console.log(`🚀 Servidor pronto em http://localhost:${PORT}/graphql`)
}

bootstrap().catch((error) => {
  console.error('❌ Erro ao iniciar o servidor:', error)
  process.exit(1)
})
