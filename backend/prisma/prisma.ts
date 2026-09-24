import 'dotenv/config'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../src/generated/prisma/client.js'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
    }),
  })

globalForPrisma.prisma = prismaClient
