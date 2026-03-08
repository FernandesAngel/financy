import { prismaClient } from "../../prisma/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        color: data.color,
        icon: data.icon,
        userId,
      },
    });
  }

  async findCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
        userId,
      },
    });
    return category;
  }

  async listCategories(userId: string) {
    return prismaClient.category.findMany({
      where: {
        userId,
      },
    });
  }

  async updateCategory(id: string, data: UpdateCategoryInput, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });
    if (!category) throw new Error("Categoria não existe");
    return prismaClient.category.update({
      where: { id },
      data: {
        title: data.title ?? undefined,
        description: data.description ?? undefined,
        color: data.color ?? undefined,
        icon: data.icon ?? undefined,
      },
    });
  }

  async deleteCategory(id: string, userId: string) {
    const category = await prismaClient.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new Error("Categoria não existe");
    }

    await prismaClient.category.delete({
      where: { id },
    });

    return true;
  }
}
