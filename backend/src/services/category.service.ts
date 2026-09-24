import { prismaClient } from '../../prisma/prisma'
import { CreateCategoryInput, UpdateCategoryInput } from '../dtos/input/category.input'

export class CategoryService {
  async listCategories(userId: string) {
    return prismaClient.category.findMany({
      where: { userId },
    })
  }

  async getCategory(categoryId: string, userId: string) {
    const category = await prismaClient.category.findFirst({
      where: { id: categoryId, userId },
    })

    if (!category) throw new Error('Categoria não encontrada.')

    return category
  }

  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId: userId,
      },
    })
  }

  async updateCategory(
    categoryId: string,
    userId: string,
    data: UpdateCategoryInput
  ) {
    const category = await prismaClient.category.findFirst({
      where: { id: categoryId, userId },
    })
    if (!category) throw new Error('Categoria não encontrada.')

    return prismaClient.category.update({
      where: { id: categoryId },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
      },
    })
  }

  async deleteCategory(categoryId: string, userId: string) {
    const category = await prismaClient.category.findFirst({
      where: { id: categoryId, userId },
    })
    if (!category) throw new Error('Categoria não encontrada.')

    return prismaClient.category.delete({
      where: { id: categoryId },
    })
  }
}
