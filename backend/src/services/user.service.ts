import { prismaClient } from '../../prisma/prisma'
import { UpdateUserInput } from '../dtos/input/user.input'

export class UserService {
  async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) throw new Error('Usuário não existe')
    return user
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    })
    if (!user) throw new Error('Usuário não existe')

    return prismaClient.user.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
      },
    })
  }

  async deleteUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    })
    if (!user) throw new Error('Usuário não existe')

    await prismaClient.user.delete({
      where: { id },
    })

    return true
  }
}
