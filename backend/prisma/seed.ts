import { prismaClient as prisma } from './prisma'
import bcrypt from 'bcryptjs'

const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(plainPassword, salt)
}

async function main() {
  console.log('🌱 Iniciando seed...')

  const existingUser = await prisma.user.findUnique({
    where: {
      email: 'usuario@financy.com',
    },
  })

  if (existingUser) {
    console.log('✅ Usuário já existe.')
  } else {
    const hashedPassword = await hashPassword('pass1234')

    const user = await prisma.user.create({
      data: {
        name: 'Usuário',
        email: 'usuario@financy.com',
        password: hashedPassword,
      },
    })

    console.log('✅ Usuário criado com sucesso!')
    console.log('📧 Email: usuario@financy.com')
    console.log('🔑 Senha: pass1234')
    console.log('👤 ID:', user.id)
  }

  console.log('✨ Seed concluído!')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
